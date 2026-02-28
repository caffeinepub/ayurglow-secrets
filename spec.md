# Specification

## Summary
**Goal:** Add inline image insertion in blog post editor, remove admin authentication gate, and fix missing blog post on admin page.

**Planned changes:**
- Add an "Insert Image" toolbar button in the content editor area of both CreateBlogPostPage and EditBlogPostPage, allowing users to upload an image and insert an inline image placeholder at the current cursor position in the textarea
- Extend BlogPostDetailPage rendering logic to display inline images at their inserted positions
- Remove or bypass the AdminRoute guard so that admin pages (/admin, /admin/posts) are accessible without Internet Identity login
- Fix the bug on AdminPostsPage where some posts (e.g., "Best Ayurvedic Herbs for Glowing Skin") are not shown by ensuring the backend query and frontend fetch return all posts regardless of publish/draft state

**User-visible outcome:** Admins can insert images inline within blog post content while writing or editing posts, access the admin panel without logging in, and see all blog posts (including drafts) listed on the admin page.
