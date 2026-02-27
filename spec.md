# Specification

## Summary
**Goal:** Fix the Candid interface mismatch error that prevents blog post creation and editing from completing successfully.

**Planned changes:**
- Align the backend Candid interface for the create/edit blog post functions with what the frontend sends, resolving the "Expected v3 response body" error.
- Ensure the frontend and backend agree on the blog post data structure without changing the data model.

**User-visible outcome:** A logged-in user can create and edit blog posts without encountering a Candid mismatch error, and newly created posts appear in the admin posts list.
