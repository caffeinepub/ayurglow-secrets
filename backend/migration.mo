import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
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
    createdAt : Int;
    publishedAt : ?Int;
    tags : [Text];
    isPublished : Bool;
    image : ?Storage.ExternalBlob;
    imageSize : ?Text;
    contentImages : [Storage.ExternalBlob];
    comments : List.List<{ author : Text; content : Text; timestamp : Int }>;
  };

  type OldActor = {
    blogPosts : Map.Map<Text, OldBlogPost>;
    userProfiles : Map.Map<Principal, { name : Text }>;
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
    createdAt : Int;
    updatedAt : ?Int;
    publishedAt : ?Int;
    publicationDate : ?Int;
    tags : [Text];
    isPublished : Bool;
    featuredImage : ?{
      blob : Storage.ExternalBlob;
      fit : { #original; #cover; #contain };
      size : { #small; #medium; #large };
    };
    inlineImages : [{
      image : {
        blob : Storage.ExternalBlob;
        fit : { #original; #cover; #contain };
        size : { #small; #medium; #large };
      };
      position : Nat;
    }];
    comments : List.List<{ author : Text; content : Text; timestamp : Int }>;
  };

  type NewActor = {
    blogPosts : Map.Map<Text, NewBlogPost>;
    userProfiles : Map.Map<Principal, { name : Text }>;
  };

  public func run(old : OldActor) : NewActor {
    let newBlogPosts = old.blogPosts.map<Text, OldBlogPost, NewBlogPost>(
      func(_id, oldPost) {
        {
          id = oldPost.id;
          title = oldPost.title;
          slug = oldPost.slug;
          category = oldPost.category;
          content = oldPost.content;
          excerpt = oldPost.excerpt;
          readTime = oldPost.readTime;
          author = oldPost.author;
          createdAt = oldPost.createdAt;
          updatedAt = null;
          publishedAt = oldPost.publishedAt;
          publicationDate = null;
          tags = oldPost.tags;
          isPublished = oldPost.isPublished;
          featuredImage = switch (oldPost.image, oldPost.imageSize) {
            case (?blob, ?size) {
              ?{
                blob;
                fit = #original;
                size = switch (size) {
                  case ("small") { #small };
                  case ("medium") { #medium };
                  case ("large") { #large };
                  case (_) { #medium };
                };
              };
            };
            case (_) { null };
          };
          inlineImages = [];
          comments = oldPost.comments;
        };
      }
    );

    { old with blogPosts = newBlogPosts };
  };
};
