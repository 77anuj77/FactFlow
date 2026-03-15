# 📰 FactFlow

**FactFlow** is a modern AI-ready news aggregation platform built with **Next.js and Supabase**.
It collects news from multiple RSS sources and combines them with database articles to deliver a unified news experience.

---

## 🚀 Features

* 🔐 User Authentication
* 📰 News articles stored in database
* 🌍 RSS news aggregation from external sources
* 🏷 Category filtering (Sports, AI, Technology, Entertainment, etc.)
* 🔍 Search functionality
* ⚡ Fast API built with Next.js
* ☁️ Cloud database with Supabase

---

## 🧱 Tech Stack

Frontend & Backend

* Next.js
* React
* TypeScript

Database & Auth

* Supabase (PostgreSQL)

Other Tools

* RSS feeds for live news
* GitHub for version control
* Vercel (recommended for deployment)

---

## 📂 Project Structure

## 📂 Project Structure

```text
src/
│
├── app/
│   ├── api/
│   │   └── articles/
│   │       └── route.ts
│   └── page.tsx
│
├── lib/
│   └── rss.ts
│
└── components/
---

## ⚙️ Environment Variables

Create a `.env.local` file in the root of the project.

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_public_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

These keys can be obtained from your Supabase dashboard.

---

## 🗄 Database Setup

Create the following tables in Supabase.

### Articles

| Column     | Type      |
| ---------- | --------- |
| id         | uuid      |
| title      | text      |
| content    | text      |
| image_url  | text      |
| created_at | timestamp |

### Categories

| Column | Type |
| ------ | ---- |
| id     | uuid |
| name   | text |
| slug   | text |

---

## 📡 API Endpoints

### Get Articles

```
GET /api/articles
```

Optional query parameters:

```
?category=technology
?search=ai
```

### Create Article

```
POST /api/articles
```

---

## 📰 RSS Integration

FactFlow fetches news from external RSS feeds and merges them with database articles.

This allows the platform to display:

* Internal articles
* External news sources
* Real-time updates

---

## 🛠 Installation

Clone the repository:

```
git clone https://github.com/YOUR_USERNAME/FactFlow.git
```

Install dependencies:

```
npm install
```

Run the development server:

```
npm run dev
```

Open:

```
http://localhost:3000
```

---

## 📦 Deployment

The project can be deployed easily using **Vercel**.

Steps:

1. Push the repository to GitHub
2. Import the project into Vercel
3. Add environment variables
4. Deploy

---

## 🧠 Future Improvements

* AI news summarization
* Comment system
* Bookmark articles
* User dashboard
* Trending news detection

##
