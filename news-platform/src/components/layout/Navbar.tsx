import Link from "next/link";

const categories = [
  { name: "Sports", slug: "sports" },
  { name: "Entertainment", slug: "entertainment" },
  { name: "AI", slug: "ai" },
  { name: "Technology", slug: "technology" },
  { name: "World News", slug: "world-news" },
  { name: "Politics", slug: "politics" },
  { name: "Business", slug: "business" },
  { name: "Science", slug: "science" },
];

export function Navbar() {
  return (
    <header className="border-b border-zinc-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:py-4">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          News Platform
        </Link>
        <nav className="hidden gap-4 text-sm text-zinc-700 md:flex">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="rounded-full px-3 py-1 hover:bg-zinc-100"
            >
              {cat.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 text-sm">
          <Link
            href="/login"
            className="rounded-full px-3 py-1 text-zinc-700 hover:bg-zinc-100"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="hidden rounded-full bg-black px-3 py-1 text-white hover:bg-zinc-800 md:inline-flex"
          >
            Sign up
          </Link>
        </div>
      </div>
      <div className="border-t border-zinc-200 bg-zinc-50/80 md:hidden">
        <div className="mx-auto flex max-w-6xl gap-3 overflow-x-auto px-4 py-2 text-xs text-zinc-700">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="whitespace-nowrap rounded-full bg-white px-3 py-1 shadow-sm"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

