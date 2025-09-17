"use client"

import { useState, useEffect } from "react"
import axios from "axios"

const Cricket = () => {
    const [news, setNews] = useState([])
    const [playerBanners, setPlayerBanners] = useState([])
    const [currentBannerIndex, setCurrentBannerIndex] = useState(0)
    const [loading, setLoading] = useState(true)

    const getNews = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8082/api/v1/newsfeed/get`,
            )
            setNews(response.data.data)
        } catch (err) {
            console.error(err)
        }
    }

    const getPlayersBanner = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8082/api/v1/playerbanner/get`,
            )
            setPlayerBanners(response.data.data)
            console.log(response.data.data, "test")
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            await Promise.all([getNews(), getPlayersBanner()])
            setLoading(false)
        }
        fetchData()
    }, [])

    // Auto-rotate banners
    useEffect(() => {
        if (playerBanners.length > 1) {
            const interval = setInterval(() => {
                setCurrentBannerIndex((prevIndex) =>
                    prevIndex === playerBanners.length - 1 ? 0 : prevIndex + 1,
                )
            }, 5000) // Change banner every 5 seconds

            return () => clearInterval(interval)
        }
    }, [playerBanners.length])

    const formatRelativeTime = (dateString: any) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffInSeconds = Math.floor(
            (now.getTime() - date.getTime()) / 1000,
        )

        if (diffInSeconds < 60) return "Just now"
        if (diffInSeconds < 3600)
            return `${Math.floor(diffInSeconds / 60)} minutes ago`
        if (diffInSeconds < 86400)
            return `${Math.floor(diffInSeconds / 3600)} hours ago`
        if (diffInSeconds < 2592000)
            return `${Math.floor(diffInSeconds / 86400)} days ago`

        return date.toLocaleDateString()
    }

    const createMarkup = (htmlContent: any) => {
        return { __html: htmlContent }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 py-16 lg:py-24">
                <div className="absolute inset-0 bg-[url('/cricket-stadium-background.png')] bg-cover bg-center opacity-10"></div>
                <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl text-center">
                        <h1 className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
                            <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                                Cricket
                            </span>{" "}
                            Central
                        </h1>
                        <p className="mb-8 text-lg leading-relaxed text-blue-100 sm:text-xl lg:text-2xl">
                            Your ultimate destination for live scores, breaking
                            news, player stats, and comprehensive cricket
                            coverage from around the globe
                        </p>
                        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                            <button className="rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 px-8 py-4 font-semibold text-gray-900 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
                                Latest Scores
                            </button>
                            <button className="rounded-full border-2 border-white/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20">
                                Watch Highlights
                            </button>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </section>

            {playerBanners.length > 0 && (
                <section className="relative -mt-8 mb-12">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {playerBanners
                                .slice(0, 3)
                                .map((banner: any, index: number) => (
                                    <div
                                        key={banner._id}
                                        className="group relative overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                                    >
                                        <div className="aspect-[4/3] overflow-hidden">
                                            <img
                                                src={
                                                    banner.image &&
                                                    banner.image.length > 0
                                                        ? banner.image[0]
                                                        : "/placeholder.svg?height=300&width=400&query=cricket%20player"
                                                }
                                                alt={
                                                    banner.name ||
                                                    "Player banner"
                                                }
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                onError={(e: any) => {
                                                    e.target.src =
                                                        "/cricket-player.png"
                                                }}
                                            />
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                            <h3 className="mb-2 text-xl font-bold lg:text-2xl">
                                                {banner.name}
                                            </h3>
                                            <p className="text-sm text-gray-200 lg:text-base">
                                                {banner.category ||
                                                    "Cricket Player"}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </section>
            )}

            <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <section className="mb-16">
                    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">
                                Latest Cricket News
                            </h2>
                            <p className="mt-2 text-gray-600">
                                Stay updated with the latest happenings in
                                cricket
                            </p>
                        </div>
                        <button className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl sm:px-8">
                            View All News
                        </button>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-16">
                            <div className="relative">
                                <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
                                <div className="absolute inset-0 h-16 w-16 animate-pulse rounded-full border-4 border-blue-100"></div>
                            </div>
                        </div>
                    ) : news.length === 0 ? (
                        <div className="rounded-2xl bg-gradient-to-r from-red-50 to-pink-50 p-8 text-center shadow-lg">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                                <svg
                                    className="h-8 w-8 text-red-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-xl font-semibold text-red-800">
                                No News Available
                            </h3>
                            <p className="mb-4 text-red-600">
                                We couldn't load the latest cricket news at the
                                moment.
                            </p>
                            <button
                                onClick={() => window.location.reload()}
                                className="rounded-full bg-red-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-red-700"
                            >
                                Try Again
                            </button>
                        </div>
                    ) : (
                        <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
                            {news.map((article: any) => (
                                <article
                                    key={article._id}
                                    className="group overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                                >
                                    <div className="aspect-[16/10] overflow-hidden">
                                        <img
                                            src={
                                                article.image &&
                                                article.image.length > 0
                                                    ? article.image[0]
                                                    : "/placeholder.svg?height=240&width=400&query=cricket%20news"
                                            }
                                            alt={article.title || article.name}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            onError={(e: any) => {
                                                e.target.src =
                                                    "/cricket-news-headline.png"
                                            }}
                                        />
                                    </div>
                                    <div className="p-6">
                                        <div className="mb-4 flex flex-wrap items-center gap-3">
                                            <span className="rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 px-3 py-1 text-xs font-semibold text-white">
                                                {article.category || "Cricket"}
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                {article.readTime ||
                                                    "5 min read"}
                                            </span>
                                        </div>
                                        <h3 className="mb-3 text-xl font-bold leading-tight text-gray-900 transition-colors duration-300 group-hover:text-blue-600">
                                            {article.title || article.name}
                                        </h3>
                                        <div className="mb-4 line-clamp-3 text-gray-600">
                                            <div
                                                dangerouslySetInnerHTML={createMarkup(
                                                    article.description,
                                                )}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                                            <span className="text-sm font-medium text-gray-500">
                                                {article.createdAt
                                                    ? formatRelativeTime(
                                                          article.createdAt,
                                                      )
                                                    : "Recently"}
                                            </span>
                                            <button className="text-sm font-semibold text-blue-600 transition-colors duration-300 hover:text-blue-800">
                                                Read More →
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </section>
            </div>

            <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 text-white">
                <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        <div className="lg:col-span-2">
                            <h3 className="mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-2xl font-bold text-transparent">
                                Sportsclaus
                            </h3>
                            <p className="mb-6 text-lg leading-relaxed text-gray-300">
                                Your ultimate destination for cricket news, live
                                scores, and comprehensive coverage of the sport
                                that unites billions of fans worldwide.
                            </p>
                            <div className="flex gap-4">
                                {[
                                    "Twitter",
                                    "Facebook",
                                    "Instagram",
                                    "YouTube",
                                ].map((social) => (
                                    <button
                                        key={social}
                                        className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white/20"
                                    >
                                        <span className="sr-only">
                                            {social}
                                        </span>
                                        <div className="h-5 w-5 rounded bg-white/80"></div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="mb-6 text-lg font-semibold text-white">
                                Quick Links
                            </h4>
                            <ul className="space-y-3">
                                {[
                                    "Live Scores",
                                    "Latest News",
                                    "Player Stats",
                                    "Team Rankings",
                                    "Match Schedule",
                                ].map((link) => (
                                    <li key={link}>
                                        <button className="transform text-gray-300 transition-colors duration-300 hover:translate-x-1 hover:text-yellow-400">
                                            {link}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="mb-6 text-lg font-semibold text-white">
                                Connect With Us
                            </h4>
                            <div className="space-y-4">
                                <div className="rounded-xl bg-white/5 p-4 backdrop-blur-sm">
                                    <img
                                        src="/sportsclaus-logo.jpg"
                                        alt="Sportsclaus Logo"
                                        className="mx-auto h-20 w-20 rounded-full object-cover ring-4 ring-white/20"
                                    />
                                </div>
                                <p className="text-center text-sm text-gray-400">
                                    Follow us for real-time updates
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 border-t border-white/10 pt-8 text-center">
                        <p className="text-gray-400">
                            © 2024 Sportsclaus. All rights reserved. | Bringing
                            you closer to cricket.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Cricket
