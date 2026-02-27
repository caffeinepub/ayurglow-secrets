# Specification

## Summary
**Goal:** Allow any authenticated user to create and edit blog posts without requiring admin privileges.

**Planned changes:**
- Remove the admin-only authorization check from the backend `createBlogPost` and `updateBlogPost` functions so any authenticated user can call them.
- Replace or remove the admin route guard on the frontend `CreateBlogPostPage` and `EditBlogPostPage` so any logged-in user can access these pages.

**User-visible outcome:** Any logged-in (non-admin) user can navigate to the Create and Edit blog post pages and successfully publish or update blog posts without receiving an "Access Denied" error.
