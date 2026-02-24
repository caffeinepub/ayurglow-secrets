import Map "mo:core/Map";
import List "mo:core/List";
import Text "mo:core/Text";
import Storage "blob-storage/Storage";

module {
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
    image : ?Storage.ExternalBlob;
    comments : List.List<{
      author : Text;
      content : Text;
      timestamp : Int;
    }>;
  };

  type OldActor = {
    blogPosts : Map.Map<Text, OldBlogPost>;
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
    contentImages : [Storage.ExternalBlob];
    comments : List.List<{
      author : Text;
      content : Text;
      timestamp : Int;
    }>;
  };

  type NewActor = {
    blogPosts : Map.Map<Text, NewBlogPost>;
  };

  public func run(old : OldActor) : NewActor {
    let newBlogPosts = old.blogPosts.map<Text, OldBlogPost, NewBlogPost>(
      func(_id, oldPost) {
        {
          oldPost with
          contentImages = [];
        };
      }
    );
    { blogPosts = newBlogPosts };
  };
};
