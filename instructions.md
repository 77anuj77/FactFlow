You are a senior full-stack engineer.

Help me design and implement a full stack news platform using:

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Supabase (database + authentication)
- PostgreSQL

First create a clear project architecture and implementation plan.

PROJECT REQUIREMENTS

This website is a modern news platform where users can read news articles categorized by topic.

Main features:

1. Authentication
- Users can sign up
- Users can log in
- Users can log out
- Authentication handled with Supabase Auth

2. News Articles
- Articles have:
  id
  title
  content
  category
  author
  created_at
  image_url

3. Categories
The website should support these categories:

- Sports
- Entertainment
- AI
- Technology
- World News
- Politics
- Business
- Science

Each category should have its own page listing related articles.

4. Homepage
Homepage should display:
- Featured articles
- Latest articles
- Categories navigation

5. Article Page
Each article page should show:
- title
- author
- publish date
- article image
- article content
- category tag

6. Admin / Editor capability
Authenticated users should be able to:
- create articles
- edit articles
- delete articles

7. UI Layout
Use a modern layout with:
- top navigation bar
- category menu
- article cards
- responsive design

8. Database Schema

Create Supabase tables:

users
articles
categories

articles table fields:
id
title
content
category_id
author_id
image_url
created_at

categories table fields:
id
name
slug

9. API Routes

Create API routes for:

- creating article
- updating article
- deleting article
- fetching articles
- fetching category articles

10. Folder Structure

Use scalable folder structure such as:

/app
/components
/lib
/hooks
/types
/api

11. Pages Needed

- Home page
- Login page
- Signup page
- Article page
- Category pages
- Create article page
- Edit article page
- Dashboard page

12. Styling

Use Tailwind CSS and modern card based design.

13. SEO

Include:
- metadata
- dynamic routes for articles
- clean URLs like:

/article/[slug]
/category/[name]

Now do the following:

Step 1 — propose full project architecture
Step 2 — create folder structure
Step 3 — define database schema
Step 4 — implement Supabase connection
Step 5 — implement authentication
Step 6 — implement article CRUD
Step 7 — implement category pages
Step 8 — build homepage layout

Explain each step briefly and generate code where needed.