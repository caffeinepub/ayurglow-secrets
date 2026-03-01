# Specification

## Summary
**Goal:** Remove all authentication/login UI and make the admin pages fully publicly accessible without any identity checks.

**Planned changes:**
- Remove the login button, logout button, and all Internet Identity authentication controls from the Navigation component
- Remove all authentication guards, identity checks, and AccessDeniedScreen redirects from the Admin, Create Blog Post, and Edit Blog Post pages (/admin, /admin/create, /admin/edit/:id)
- Update React Query hooks and mutations in useQueries.ts to use an anonymous actor instead of an authenticated actor for all admin operations (create, update, delete, publish/unpublish, image upload)
- Update the backend Motoko actor to remove caller-based authorization checks on all admin functions so anonymous principals are permitted to perform all blog CRUD and image upload operations

**User-visible outcome:** Anyone can visit /admin and create, edit, delete, or publish blog posts without logging in. No login button or authentication prompt appears anywhere on the site.
