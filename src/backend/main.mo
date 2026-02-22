import Text "mo:core/Text";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Iter "mo:core/Iter";

actor {
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
  };

  let blogPosts = Map.empty<Text, BlogPost>();

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
  ) : async () {
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
    };
    blogPosts.add(id, updatedPost);
  };

  public shared ({ caller }) func deletePost(id : Text) : async () {
    blogPosts.remove(id);
  };

  public query ({ caller }) func getPost(id : Text) : async ?BlogPost {
    blogPosts.get(id);
  };

  public query ({ caller }) func getAllPosts() : async [BlogPost] {
    blogPosts.values().toArray();
  };

  public query ({ caller }) func getPublishedPosts() : async [BlogPost] {
    let iter = blogPosts.values().filter(
      func(post) { post.isPublished }
    );
    iter.toArray();
  };
};
