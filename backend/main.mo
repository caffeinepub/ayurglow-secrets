import Map "mo:core/Map";
import List "mo:core/List";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import Migration "migration";

(with migration = Migration.run)
actor {
  type Comment = {
    author : Text;
    content : Text;
    timestamp : Int;
  };

  public type ImageMeta = {
    blob : Storage.ExternalBlob;
    fit : ImageFit;
    size : ImageSize;
  };

  public type InlineImage = {
    image : ImageMeta;
    position : Nat;
  };

  public type BlogPost = {
    id : Text;
    title : Text;
    slug : Text;
    category : Text;
    content : Text;
    excerpt : Text;
    readTime : Nat;
    author : Text;
    createdAt : Int;
    updatedAt : ?Int;
    publishedAt : ?Int;
    publicationDate : ?Int;
    tags : [Text];
    isPublished : Bool;
    featuredImage : ?ImageMeta;
    inlineImages : [InlineImage];
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
    updatedDate : ?Int;
    publishedDate : ?Int;
    publicationDate : ?Int;
    tags : [Text];
    isPublished : Bool;
    featuredImage : ?ImageMeta;
    inlineImages : [InlineImage];
    comments : [Comment];
  };

  public type UserProfile = {
    name : Text;
  };

  public type ImageFit = {
    #original;
    #cover;
    #contain;
  };

  public type ImageSize = {
    #small;
    #medium;
    #large;
  };

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let blogPosts = Map.empty<Text, BlogPost>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  include MixinStorage();

  public query ({ caller }) func canCallerAccessAdminSection() : async Bool {
    AccessControl.isAdmin(accessControlState, caller);
  };

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
    featuredImage : ?ImageMeta,
    inlineImages : [InlineImage],
    isPublished : Bool,
    publishImmediately : Bool,
    publicationDate : ?Int,
  ) : async () {
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
      updatedAt = null;
      publishedAt = if (publishImmediately) { ?Time.now() } else { null };
      publicationDate;
      tags;
      isPublished = publishImmediately;
      featuredImage;
      inlineImages;
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
    featuredImage : ?ImageMeta,
    inlineImages : [InlineImage],
    isPublished : Bool,
    publishImmediately : Bool,
    publicationDate : ?Int,
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
          updatedAt = ?Time.now();
          publishedAt = if (publishImmediately) { ?Time.now() } else { null };
          publicationDate;
          tags;
          isPublished = publishImmediately;
          featuredImage;
          inlineImages;
          comments = existingPost.comments;
        };
        blogPosts.add(id, updatedPost);
        true;
      };
    };
  };

  public shared ({ caller }) func setPublishedState(
    id : Text,
    isPublished : Bool,
    publishedDate : ?Int,
    publicationDate : ?Int,
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
          publicationDate;
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
      updatedDate = post.updatedAt;
      publishedDate = post.publishedAt;
      publicationDate = post.publicationDate;
      comments = post.comments.toArray();
    };
  };

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
