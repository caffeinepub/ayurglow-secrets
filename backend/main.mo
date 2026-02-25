import Text "mo:core/Text";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Iter "mo:core/Iter";
import List "mo:core/List";
import Time "mo:core/Time";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import Migration "migration";

(with migration = Migration.run)
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
    publishedDate : Int;
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
    publishedDate : Int;
    tags : [Text];
    isPublished : Bool;
    image : ?Storage.ExternalBlob;
    imageSize : ?Text;
    contentImages : [Storage.ExternalBlob];
    comments : [Comment];
  };

  let blogPosts = Map.empty<Text, BlogPost>();

  include MixinStorage();

  public shared ({ caller }) func createPost(
    id : Text,
    title : Text,
    slug : Text,
    category : Text,
    content : Text,
    excerpt : Text,
    readTime : Nat,
    author : Text,
    publishedDate : Int,
    tags : [Text],
    isPublished : Bool,
    image : ?Storage.ExternalBlob,
    imageSize : ?Text,
    contentImages : [Storage.ExternalBlob],
  ) : async () {
    let newPost : BlogPost = {
      id;
      title;
      slug;
      category;
      content;
      excerpt;
      readTime;
      author;
      publishedDate;
      tags;
      isPublished;
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
    publishedDate : Int,
    tags : [Text],
    isPublished : Bool,
    image : ?Storage.ExternalBlob,
    imageSize : ?Text,
    contentImages : [Storage.ExternalBlob],
  ) : async () {
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
          publishedDate;
          tags;
          isPublished;
          image;
          imageSize;
          contentImages;
          comments = existingPost.comments;
        };
        blogPosts.add(id, updatedPost);
      };
    };
  };

  public shared ({ caller }) func deletePost(id : Text) : async () {
    blogPosts.remove(id);
  };

  func toBlogPostView(post : BlogPost) : BlogPostView {
    {
      post with
      comments = post.comments.toArray();
    };
  };

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

  public shared ({ caller }) func addComment(postId : Text, author : Text, content : Text) : async Bool {
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

  public query ({ caller }) func getAllVisiblePosts() : async [BlogPostView] {
    let posts = blogPosts.values();
    posts.map(func(p) { toBlogPostView(p) }).toArray();
  };
};
