"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const categories = [
  { name: "Home", slug: "" },
  { name: "ePaper", slug: "epaper" },
  { name: "India", slug: "india" },
  { name: "Cities", slug: "cities" },
  { name: "UPSC", slug: "upsc" },
  { name: "Premium", slug: "premium" },
  { name: "Entertainment", slug: "entertainment" },
  { name: "Politics", slug: "politics" },
  { name: "Sports", slug: "sports" },
  { name: "World", slug: "world" },
  { name: "Explained", slug: "explained" },
  { name: "Opinion", slug: "opinion" },
  { name: "Business", slug: "business" },
  { name: "Lifestyle", slug: "lifestyle" },
  { name: "Tech", slug: "tech" },
];

export function Navbar() {
  const router = useRouter();
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  const visibleCategories = categories.slice(0, 8);
  const dropdownCategories = categories.slice(8);
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-[#1c1c1c]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[96rem] items-center justify-between px-4 py-3 md:py-4">
        {/* LEFT SECTION: Logo & Header Auth */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
            <div className="flex h-10 w-12 shrink-0 items-center justify-center">
              {/* Scalable SVG recreation of the FactFlow brand mark to remove any background / Gemini logos */}
              <svg viewBox="0 0 100 80" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Dark grey bottom curve (the 'U' shape base) */}
                <path d="M25 65 C 30 85, 60 85, 70 60" stroke="#4b5563" strokeWidth="11" strokeLinecap="round" />
                {/* Emerald green ascending swoosh */}
                <path d="M15 70 C 15 35, 45 45, 80 15" stroke="#34d399" strokeWidth="10" strokeLinecap="round" />
                {/* Emerald arrow head */}
                <polygon points="70,5 92,2 83,28" fill="#34d399" />
              </svg>
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[26px] font-black tracking-tighter text-white leading-none">
                Fact<span className="text-emerald-400">Flow</span>
              </span>
              <span className="mt-1 text-[8px] font-bold uppercase tracking-[0.1em] sm:tracking-[0.15em] text-zinc-300 leading-none">
                Accurate Data Streamlined
              </span>
            </div>
          </Link>

          {/* Navigation layout reorganized as requested */}
        </div>

        {/* RIGHT SECTION: Categories (Truncated to 8) & Search/Icons */}
        <div className="flex items-center gap-6">
          <nav className="hidden items-center gap-1 text-sm font-medium text-zinc-400 xl:flex">
            {visibleCategories.map((cat) => (
              <Link
                key={cat.slug || 'home'}
                href={cat.slug === "" ? "/" : `/category/${cat.slug}`}
                className="rounded-full px-4 py-1.5 transition-colors hover:bg-zinc-800 hover:text-white"
              >
                {cat.name}
              </Link>
            ))}

            {/* ...More Dropdown */}
            {dropdownCategories.length > 0 && (
              <div
                className="relative"
                onMouseEnter={() => setIsMoreOpen(true)}
                onMouseLeave={() => setIsMoreOpen(false)}
              >
                <button
                  className="flex items-center gap-1 rounded-full px-4 py-1.5 transition-colors hover:bg-zinc-800 hover:text-white focus:outline-none"
                  aria-expanded={isMoreOpen}
                >
                  More
                  <svg className={`h-4 w-4 transition-transform ${isMoreOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isMoreOpen && (
                  <div className="absolute right-0 top-full pt-2 w-48 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="rounded-xl border border-zinc-800 bg-[#1c1c1c] shadow-xl overflow-hidden py-1">
                      {dropdownCategories.map((cat) => (
                        <Link
                          key={cat.slug}
                          href={`/category/${cat.slug}`}
                          className="block px-4 py-2.5 text-sm text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </nav>

          {/* Right side: Search & Profile */}
          <div className="flex items-center gap-4 pl-6">
            <form onSubmit={handleSearch} className="hidden sm:flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/50 px-3 py-1.5 text-sm text-zinc-400 hover:bg-zinc-800/80 focus-within:bg-zinc-800 focus-within:border-zinc-500 transition w-48 lg:w-64">
              <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none placeholder:text-zinc-500 text-zinc-200"
              />
              <kbd className="hidden shrink-0 rounded bg-zinc-800 px-1 py-0.5 text-xs text-zinc-500 lg:inline-block">⌘K</kbd>
            </form>

            {/* User Profile Section */}
            <div className="flex items-center border-l border-zinc-800 pl-4 ml-2">
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  onBlur={() => setTimeout(() => setIsProfileOpen(false), 200)}
                  className="h-10 w-10 flex shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-emerald-500 bg-black transition hover:border-emerald-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/50"
                >
                  <svg className="h-6 w-6 text-zinc-600 mt-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="rounded-xl border border-zinc-800 bg-[#242424] shadow-2xl overflow-hidden py-1">
                      <div className="px-4 py-3 border-b border-zinc-800">
                        <p className="text-sm font-medium text-white">Guest User</p>
                        <p className="text-xs text-zinc-400 truncate">Log in for full access</p>
                      </div>

                      <div className="py-1">
                        <Link
                          href="/profile"
                          className="flex items-center px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors border-b border-zinc-800 mb-1"
                        >
                          <svg className="mr-3 h-4 w-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          Profile Settings
                        </Link>
                        <Link
                          href="/login"
                          className="flex items-center px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                        >
                          <svg className="mr-3 h-4 w-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                          </svg>
                          Log in
                        </Link>
                        <Link
                          href="/signup"
                          className="flex items-center px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                        >
                          <svg className="mr-3 h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                          </svg>
                          Sign up
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-zinc-800 bg-[#1c1c1c]/95 md:hidden">
        <div className="mx-auto flex gap-2 overflow-x-auto px-4 py-3 text-sm font-medium text-zinc-300 scrollbar-hide">
          {categories.map((cat) => (
            <Link
              key={cat.slug || 'home'}
              href={cat.slug === "" ? "/" : `/category/${cat.slug}`}
              className="whitespace-nowrap rounded-full border border-zinc-800 bg-zinc-900 px-4 py-1.5 transition-colors hover:bg-zinc-800 hover:text-white"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
