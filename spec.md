# Specification

## Summary
**Goal:** Fix the admin panel so that all blog posts (including drafts) are correctly fetched, displayed, and editable in the AdminPostsPage.

**Planned changes:**
- Update AdminPostsPage to use a hook that fetches all posts (published and unpublished drafts), not just published ones
- Display all posts in the admin list table with title, category, publish status, and action buttons (edit, delete, toggle publish)
- Add a visual distinction (e.g., "Draft" badge) for unpublished posts in the admin list
- Ensure the edit button navigates to EditBlogPostPage for the selected post
- Ensure the delete button shows a confirmation dialog and removes the post on confirmation
- Ensure the toggle publish button correctly switches a post between published and draft states
- Handle loading and empty states with appropriate messages
- Fix or verify the backend method to return all blog posts regardless of publish status, accessible from the admin panel without requiring authentication just for listing
- Keep CRUD operations (update, delete, toggle publish) protected with admin privileges

**User-visible outcome:** Admins can navigate to the admin panel and see all blog posts (including drafts) listed correctly, and can edit, delete, or toggle the publish status of any post.
