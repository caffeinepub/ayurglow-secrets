import Map "mo:core/Map";
import Iter "mo:core/Iter";
import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  type Comment = {
    author : Text;
    content : Text;
    timestamp : Int;
  };

  type BlogPost = {
    id : Text;
    title : Text;
    slug : Text;
    category : Text;
    content : Text;
    excerpt : Text;
    readTime : Nat;
    author : Text;
    createdAt : Int;
    publishedAt : ?Int;
    tags : [Text];
    isPublished : Bool;
    image : ?Storage.ExternalBlob;
    imageSize : ?Text;
    contentImages : [Storage.ExternalBlob];
    comments : List.List<Comment>;
  };

  public type BlogPostView = {
    id : Text;
    title : Text;
    slug : Text;
    category : Text;
    content : Text;
    excerpt : Text;
    readTime : Nat;
    author : Text;
    createdDate : Int;
    publishedDate : ?Int;
    tags : [Text];
    isPublished : Bool;
    image : ?Storage.ExternalBlob;
    imageSize : ?Text;
    contentImages : [Storage.ExternalBlob];
    comments : [Comment];
  };

  public type UserProfile = {
    name : Text;
  };

  // Persistent state variables must be at top-level actor scope
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let blogPosts = Map.empty<Text, BlogPost>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  include MixinStorage();

  // Core Auth Queries (for frontend)
  public query ({ caller }) func canCallerAccessAdminSection() : async Bool {
    AccessControl.isAdmin(accessControlState, caller);
  };

  // User profile management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Create/Update Post (any user allowed)
  public shared ({ caller }) func createPost(
    id : Text,
    title : Text,
    slug : Text,
    category : Text,
    content : Text,
    excerpt : Text,
    readTime : Nat,
    author : Text,
    tags : [Text],
    image : ?Storage.ExternalBlob,
    imageSize : ?Text,
    contentImages : [Storage.ExternalBlob],
    isPublished : Bool,
    publishedAt : ?Int,
  ) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create posts");
    };
    let newPost : BlogPost = {
      id;
      title;
      slug;
      category;
      content;
      excerpt;
      readTime;
      author;
      createdAt = Time.now();
      publishedAt = switch (isPublished, publishedAt) {
        case (true, null) { ?Time.now() };
        case (true, ?val) { ?val };
        case (false, _) { null };
      };
      tags;
      isPublished;
      image;
      imageSize;
      contentImages;
      comments = List.empty<Comment>();
    };
    blogPosts.add(id, newPost);
    id;
  };

  public shared ({ caller }) func updatePost(
    id : Text,
    title : Text,
    slug : Text,
    category : Text,
    content : Text,
    excerpt : Text,
    readTime : Nat,
    author : Text,
    tags : [Text],
    image : ?Storage.ExternalBlob,
    imageSize : ?Text,
    contentImages : [Storage.ExternalBlob],
    isPublished : Bool,
    publishedAt : ?Int,
  ) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update posts");
    };
    switch (blogPosts.get(id)) {
      case (null) { false };
      case (?existingPost) {
        let updatedPost : BlogPost = {
          id;
          title;
          slug;
          category;
          content;
          excerpt;
          readTime;
          author;
          createdAt = existingPost.createdAt;
          publishedAt = switch (isPublished, publishedAt) {
            case (true, null) { ?Time.now() };
            case (true, ?val) { ?val };
            case (false, _) { null };
          };
          tags;
          isPublished;
          image;
          imageSize;
          contentImages;
          comments = existingPost.comments;
        };
        blogPosts.add(id, updatedPost);
        true;
      };
    };
  };

  // Publish/Unpublish (admin only)
  public shared ({ caller }) func setPublishedState(
    id : Text,
    isPublished : Bool,
    publishedDate : ?Int,
  ) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can change publishing state");
    };
    switch (blogPosts.get(id)) {
      case (null) { false };
      case (?post) {
        let updatedPost : BlogPost = {
          post with
          isPublished;
          publishedAt = switch (isPublished, publishedDate) {
            case (true, null) { ?Time.now() };
            case (true, ?date) { ?date };
            case (false, _) { null };
          };
        };
        blogPosts.add(id, updatedPost);
        true;
      };
    };
  };

  public shared ({ caller }) func deletePost(id : Text) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete posts");
    };
    switch (blogPosts.get(id)) {
      case (null) { false };
      case (_post) {
        blogPosts.remove(id);
        true;
      };
    };
  };

  func toBlogPostView(post : BlogPost) : BlogPostView {
    {
      post with
      createdDate = post.createdAt;
      publishedDate = post.publishedAt;
      comments = post.comments.toArray();
    };
  };

  // Read Only Queries
  // Admins can view any post; non-admins can only view published posts
  public query ({ caller }) func getPost(id : Text) : async ?BlogPostView {
    switch (blogPosts.get(id)) {
      case (null) { null };
      case (?post) {
        if (post.isPublished or AccessControl.isAdmin(accessControlState, caller)) {
          ?toBlogPostView(post);
        } else {
          null;
        };
      };
    };
  };

  public query func getPublishedPosts() : async [BlogPostView] {
    let iter = blogPosts.values().filter(
      func(post) { post.isPublished }
    );
    iter.map(func(p) { toBlogPostView(p) }).toArray();
  };

  public query ({ caller }) func getAllVisiblePosts() : async [BlogPostView] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all posts");
    };
    blogPosts.values().map(func(p) { toBlogPostView(p) }).toArray();
  };

  // Comments
  public shared ({ caller }) func addComment(postId : Text, author : Text, content : Text) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add comments");
    };
    let comment : Comment = {
      author;
      content;
      timestamp = Time.now();
    };

    switch (blogPosts.get(postId)) {
      case (null) { false };
      case (?post) {
        post.comments.add(comment);
        blogPosts.add(postId, post);
        true;
      };
    };
  };

  public query func getComments(postId : Text) : async [Comment] {
    switch (blogPosts.get(postId)) {
      case (null) { [] };
      case (?post) { post.comments.toArray() };
    };
  };
};
