import Map "mo:core/Map";
import Text "mo:core/Text";
import List "mo:core/List";
import Storage "blob-storage/Storage";

module {
  // Old types
  type OldBlogPost = {
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
    imageUrl : ?Text;
  };

  type OldActor = {
    blogPosts : Map.Map<Text, OldBlogPost>;
  };

  // New types
  type Comment = {
    author : Text;
    content : Text;
    timestamp : Int;
  };

  type NewBlogPost = {
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
    comments : List.List<Comment>;
  };

  type NewActor = {
    blogPosts : Map.Map<Text, NewBlogPost>;
  };

  public func run(old : OldActor) : NewActor {
    let newBlogPosts = old.blogPosts.map<Text, OldBlogPost, NewBlogPost>(
      func(_id, oldPost) {
        {
          oldPost with
          image = null;
          comments = List.empty<Comment>();
        };
      }
    );
    { blogPosts = newBlogPosts };
  };
};
