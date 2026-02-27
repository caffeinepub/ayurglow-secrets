# Specification

## Summary
**Goal:** Fix the admin blog post save and publish functionality so that posts are correctly persisted and published in the backend.

**Planned changes:**
- Fix backend blog post creation to correctly persist posts in canister stable storage and return a valid post ID
- Fix backend publish/unpublish logic to correctly update the published flag in stable storage
- Fix the CreateBlogPostPage form submission to properly call the backend createPost mutation, handle errors, and redirect on success
- Fix the AdminPostsPage publish button and CreateBlogPostPage publish checkbox to correctly invoke publish/unpublish mutations and reflect updated state in the UI without a full page reload

**User-visible outcome:** Admins can create blog posts that are saved correctly, and can publish or unpublish posts with the UI reflecting the updated state immediately.
