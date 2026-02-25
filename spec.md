# Specification

## Summary
**Goal:** Add an image size selector to the Create and Edit Blog Post admin forms so authors can control how featured and content images are displayed in the blog post detail view.

**Planned changes:**
- Add an image size selector (Small 25%, Medium 50%, Large 75%, Full Width 100%, or Custom) alongside the featured image and content image upload fields in CreateBlogPostPage and EditBlogPostPage.
- Allow a custom option with explicit pixel or percentage width/height input.
- Extend the backend blog post data model with optional `featuredImageSize` and `contentImageSize` text fields.
- Update create and update endpoints to accept and store image size values; update query endpoints to return them.
- Render images in BlogPostDetailPage using the stored size setting; default to Full Width for existing posts without a size value.

**User-visible outcome:** Blog post authors can choose how large featured and content images appear in the post detail view, with the selected size persisted and applied on every visit. Existing posts continue to display images at full width as before.
