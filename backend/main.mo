import Map "mo:core/Map";
import Int "mo:core/Int";
import Iter "mo:core/Iter";
import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

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

  type BlogPostView = {
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

  let blogPosts = Map.empty<Text, BlogPost>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  include MixinStorage();

  // Core Auth Queries (for frontend)
  public query ({ caller }) func canCallerAccessAdminSection() : async Bool {
    AccessControl.hasPermission(accessControlState, caller, #admin);
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

  // Blog post management (admin-only write operations)
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
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create posts");
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
      publishedAt = null;
      tags;
      isPublished = false;
      image;
      imageSize;
      contentImages;
      comments = List.empty<Comment>();
    };
    blogPosts.add(id, newPost);
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
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update posts");
    };
    switch (blogPosts.get(id)) {
      case (null) { () };
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
          publishedAt = existingPost.publishedAt;
          tags;
          isPublished = existingPost.isPublished;
          image;
          imageSize;
          contentImages;
          comments = existingPost.comments;
        };
        blogPosts.add(id, updatedPost);
      };
    };
  };

  public shared ({ caller }) func publishPost(
    id : Text,
    publishedDate : ?Int,
  ) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can publish posts");
    };
    switch (blogPosts.get(id)) {
      case (null) { false };
      case (?post) {
        let updatedPost : BlogPost = {
          post with
          isPublished = true;
          publishedAt = switch (publishedDate) {
            case (?date) { ?date };
            case (null) { ?Time.now() };
          };
        };
        blogPosts.add(id, updatedPost);
        true;
      };
    };
  };

  public shared ({ caller }) func unpublishPost(id : Text) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can unpublish posts");
    };
    switch (blogPosts.get(id)) {
      case (null) { false };
      case (?post) {
        let updatedPost : BlogPost = {
          post with
          isPublished = false;
          publishedAt = null;
        };
        blogPosts.add(id, updatedPost);
        true;
      };
    };
  };

  public shared ({ caller }) func deletePost(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete posts");
    };
    blogPosts.remove(id);
  };

  func toBlogPostView(post : BlogPost) : BlogPostView {
    {
      post with
      createdDate = post.createdAt;
      publishedDate = post.publishedAt;
      comments = post.comments.toArray();
    };
  };

  // Public read operations (no auth required for published content)
  public query ({ caller }) func getPost(id : Text) : async ?BlogPostView {
    switch (blogPosts.get(id)) {
      case (null) { null };
      case (?post) { ?toBlogPostView(post) };
    };
  };

  public query ({ caller }) func getPublishedPosts() : async [BlogPostView] {
    let iter = blogPosts.values().filter(
      func(post) { post.isPublished }
    );
    iter.map(func(p) { toBlogPostView(p) }).toArray();
  };

  // Admin-only: view all posts including unpublished
  public query ({ caller }) func getAllVisiblePosts() : async [BlogPostView] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all posts");
    };
    let posts = blogPosts.values();
    posts.map(func(p) { toBlogPostView(p) }).toArray();
  };

  // Comments: require registered user to add, public to read
  public shared ({ caller }) func addComment(postId : Text, author : Text, content : Text) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only registered users can add comments");
    };
    switch (blogPosts.get(postId)) {
      case (null) { false };
      case (?post) {
        let comment : Comment = {
          author;
          content;
          timestamp = Time.now();
        };
        post.comments.add(comment);
        blogPosts.add(postId, post);
        true;
      };
    };
  };

  public query ({ caller }) func getComments(postId : Text) : async [Comment] {
    switch (blogPosts.get(postId)) {
      case (null) { [] };
      case (?post) { post.comments.toArray() };
    };
  };
};
