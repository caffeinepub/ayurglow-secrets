# Specification

## Summary
**Goal:** Fully rebuild the AyurGlow Secrets website with a blue/green theme, complete category system, enhanced blog features, and polished UI across all pages.

**Planned changes:**
- Redesign entire frontend with an emerald/forest green + teal/ocean blue color palette, replacing all purple, orange, and off-brand accents across navigation, buttons, cards, hero sections, and footer
- Display the AyurGlow Secrets logo (using existing `generated/ayurglow-logo.dim_400x120.png`) in the navigation bar and footer
- Rebuild the Homepage with: Hero section ("Welcome to AyurGlow Secrets" title, tagline, intro, CTA), "What We Offer" four-tile section, "Why AyurGlow Secrets?" benefits section, featured blog posts section, and recent posts section
- Rebuild the About Us page with the full Ayurvedic mission statement, belief paragraph, and blue/green styling
- Add Weight Management category landing page (`/weight-management`) with subcategory pages: Ayurvedic Herbs & Teas for Weight Loss, Ayurvedic Diet & Metabolism, Yoga & Lifestyle for Weight Management
- Add Lifestyle category landing page (`/lifestyle`) with subcategory pages: Daily Ayurvedic Routine (Dinacharya), Stress Management & Mental Wellness, Ayurvedic Nutrition & Seasonal Eating
- Ensure all six category pages (Health Remedies, Skin Care, Hair Care, Weight Management, Lifestyle) are accessible from navigation and all subcategory cards link to functional remedy detail pages with no broken links
- Upgrade blog post create/edit forms with: featured image upload at the top with size/fit options, inline "Insert Image" button for embedding images between paragraphs with size/fit options, publication date picker, and "Publish Immediately" toggle
- Ensure blog post detail pages render featured and inline images correctly with proper CSS sizing based on stored size/fit options
- Add a "Share Your Comment" section with name, email (optional), comment form and approved comment list on every blog post detail page, styled in blue/green
- Rebuild the footer with a "Connect With Us" section showing Instagram, Facebook, YouTube, and Twitter/X icons; include site logo, quick links, category links, legal links, copyright; remove all "Built with Caffeine.ai" attribution
- Update backend BlogPost model to include a `publicationDate` field; set `isPublished=true` and record publication date when `publishImmediately=true`, save as draft when `publishImmediately=false`; display publication date on post cards and detail pages
- Pre-populate the blog with 10 SEO draft posts: Ayurvedic Remedies to Stop Hair Fall Naturally, Best Ayurvedic Herbs for Glowing Skin, How to Reduce Hair Fall Due to Stress, Triphala Benefits for Skin Hair & Digestion, Home Remedies for Pimples Using Ayurveda, Ayurvedic Diet for Healthy Hair Growth, Aloe Vera Benefits for Skin and Hair, Causes of Hair Fall in Women and Ayurvedic Solutions, Daily Ayurvedic Routine for Healthy Body & Mind, Best Ayurvedic Oils for Hair Growth and Thickness
- Update main navigation dropdown to include all categories (Health Remedies, Skin Care, Hair Care, Weight Management, Lifestyle) with blue/green hover states, working on both desktop and mobile

**User-visible outcome:** Visitors see a fully redesigned AyurGlow Secrets site in blue/green with a logo, complete category and subcategory navigation, functional remedy pages, an enhanced blog with image uploads and scheduling, a comment section on posts, and a branded footer with social media links — with no broken links or off-brand colors anywhere.
