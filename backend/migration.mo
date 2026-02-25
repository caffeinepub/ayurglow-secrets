import Map "mo:core/Map";
import Text "mo:core/Text";
import List "mo:core/List";
import Storage "blob-storage/Storage";

module {
  type OldComment = {
    author : Text;
    content : Text;
    timestamp : Int;
  };

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
    contentImages : [Storage.ExternalBlob];
    comments : List.List<OldComment>;
  };

  type OldActor = {
    blogPosts : Map.Map<Text, OldBlogPost>;
  };

  type NewComment = {
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
    imageSize : ?Text;
    contentImages : [Storage.ExternalBlob];
    comments : List.List<NewComment>;
  };

  type NewActor = {
    blogPosts : Map.Map<Text, NewBlogPost>;
  };

  public func run(old : OldActor) : NewActor {
    let newBlogPosts = old.blogPosts.map<Text, OldBlogPost, NewBlogPost>(
      func(_id, oldPost) {
        { oldPost with imageSize = null };
      }
    );
    { blogPosts = newBlogPosts };
  };
};
