"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const router = useRouter();
    const [name, setName] = useState("Guest User");
    const [email, setEmail] = useState("guest@example.com");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const url = URL.createObjectURL(e.target.files[0]);
            setAvatarUrl(url);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setSuccessMessage("");

        setTimeout(() => {
            setIsSaving(false);
            setSuccessMessage("Profile updated successfully!");

            setTimeout(() => setSuccessMessage(""), 3000);
        }, 1000);
    };

    return (
        <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
                    Profile Settings
                </h1>
                <p className="text-zinc-400">
                    Manage your account details and public profile information.
                </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-[#1c1c1c] p-6 sm:p-8 shadow-xl">
                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* Avatar Upload Section */}
                    <div className="flex flex-col sm:flex-row items-center gap-6 pb-8 border-b border-zinc-800/80">
                        <div className="relative group h-24 w-24 shrink-0">
                            <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full border-4 border-emerald-500 bg-black shadow-lg">
                                {avatarUrl ? (
                                    <img
                                        src={avatarUrl}
                                        alt="Profile"
                                        className="h-full w-full object-cover transition-opacity group-hover:opacity-50"
                                    />
                                ) : (
                                    <svg className="h-14 w-14 text-zinc-600 mt-2 transition-opacity group-hover:opacity-50" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                    </svg>
                                )}
                            </div>
                            <label
                                htmlFor="avatar-upload"
                                className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100"
                            >
                                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 16V8a2 2 0 012-2h1m5 0h1a2 2 0 012 2v8a2 2 0 01-2 2h-1m-5 0H5a2 2 0 01-2-2z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11l-3-3m0 0l-3 3m3-3v8" />
                                </svg>
                            </label>
                            <input
                                id="avatar-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleAvatarChange}
                            />
                        </div>

                        <div className="text-center sm:text-left">
                            <h3 className="text-lg font-medium text-white">Profile picture</h3>
                            <p className="mt-1 text-sm text-zinc-400">
                                JPG, GIF or PNG. 1MB max.
                            </p>
                            <div className="mt-3 flex justify-center sm:justify-start gap-3">
                                <label
                                    htmlFor="avatar-upload"
                                    className="cursor-pointer rounded-full bg-zinc-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-[#1c1c1c]"
                                >
                                    Change
                                </label>
                                <button
                                    type="button"
                                    onClick={() => setAvatarUrl("")}
                                    className="rounded-full px-4 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10 focus:outline-none"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* User Details */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <label htmlFor="name" className="block text-sm font-medium text-zinc-300">
                                Display Name
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="block w-full rounded-xl border border-zinc-700 bg-zinc-900/50 px-4 py-3 text-white placeholder-zinc-500 focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm transition-colors"
                                    placeholder="Jane Doe"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="email" className="block text-sm font-medium text-zinc-300">
                                Email Address
                            </label>
                            <div className="mt-2">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled
                                    className="block w-full rounded-xl border border-zinc-800 bg-zinc-900/30 px-4 py-3 text-zinc-500 sm:text-sm cursor-not-allowed"
                                />
                                <p className="mt-2 text-xs text-zinc-500">
                                    Email addresses cannot be changed here. Contact support to update your email.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-end gap-4 pt-4 border-t border-zinc-800/80">
                        {successMessage && (
                            <span className="text-sm text-emerald-400 animate-in fade-in">
                                {successMessage}
                            </span>
                        )}
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="rounded-full px-6 py-2.5 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors focus:outline-none"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="rounded-full bg-emerald-500 px-8 py-2.5 text-sm font-semibold text-[#1c1c1c] shadow-sm hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isSaving ? "Saving..." : "Save changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
