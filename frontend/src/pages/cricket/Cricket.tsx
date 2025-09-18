"use client"
import { useEffect, useState } from "react"
import axios from "axios"

// Define interfaces for our data types
interface NewsItem {
    _id: string
    name: string
    description: string
    category: string
    image: string[]
    createdAt: string
}

interface PlayerBanner {
    _id: string
    name: string
    category: string
    image: string[]
}

interface RankingItem {
    _id: string
    type: string
    player_type: string
    // Add other ranking properties as needed
}

interface LatestNewsItem {
    _id: string
    title: string
    description: string
    category: string
    image: string[]
    createdAt: string
}

const Cricket = () => {
    const [news, setNews] = useState<NewsItem[]>([])
    const [latestNews, setLatestNews] = useState<LatestNewsItem[]>([])
    const [playerBanners, setPlayerBanners] = useState<PlayerBanner[]>([])
    const [ranking, setRanking] = useState<RankingItem[]>([])
    const [activeTab, setActiveTab] = useState("T20") // Default to T20
    const [activePlayerType, setActivePlayerType] = useState("Batsman") // Default to Batsman

    const [loading, setLoading] = useState(true)
    const [currentSlide, setCurrentSlide] = useState(0)

    const getNews = async () => {
        try {
            const response = await axios.get(
                `https://events.alltheapps.io/v1/integration_web/GetNews`,
            )
            setNews(response.data.data)
        } catch (err) {
            console.error(err)
        }
    }

    const getRanking = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8082/api/v1/playerranking/get`,
            )
            setRanking(response.data.data)
        } catch (err) {
            console.error(err)
        }
    }

    const getlatestnews = async () => {
        try {
            const response = await axios.get(
                `https://events.alltheapps.io/v1/integration_web/GetNews`,
            )
            setLatestNews(response.data.data)
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
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            await Promise.all([
                getNews(),
                getPlayersBanner(),
                getlatestnews(),
                getRanking(),
            ])
            setLoading(false)
        }
        fetchData()
    }, [])

    // Auto-advance slides
    useEffect(() => {
        if (latestNews.length > 0) {
            const interval = setInterval(() => {
                setCurrentSlide((prev) =>
                    prev === latestNews.length - 1 ? 0 : prev + 1,
                )
            }, 5000) // Change slide every 5 seconds

            return () => clearInterval(interval)
        }
    }, [latestNews.length])

    const goToSlide = (index: number) => {
        setCurrentSlide(index)
    }

    const goToPrevSlide = () => {
        setCurrentSlide((prev) =>
            prev === 0 ? latestNews.length - 1 : prev - 1,
        )
    }

    const goToNextSlide = () => {
        setCurrentSlide((prev) =>
            prev === latestNews.length - 1 ? 0 : prev + 1,
        )
    }

    // Filter rankings based on selected type and player type
    const filteredRankings = ranking
        .filter(
            (player) =>
                player.type === activeTab &&
                player.player_type === activePlayerType,
        )
        .slice(0, 5) // Get top 5

    const renderHtml = (html: string) => {
        return <span dangerouslySetInnerHTML={{ __html: html }} />
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffTime = Math.abs(now.getTime() - date.getTime())
        const diffHours = Math.ceil(diffTime / (1000 * 60 * 60))

        if (diffHours < 24) {
            return `${diffHours} hours ago`
        } else {
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
            return `${diffDays} days ago`
        }
    }

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white">
                <div className="text-center">
                    <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-900"></div>
                    <p className="text-gray-600">Loading cricket updates...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-12">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-4xl text-center">
                        <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-6xl">
                            Your Ultimate Cricket Destination
                        </h2>
                        <p className="mb-8 text-xl text-gray-700">
                            Stay updated with scores, breaking news, player
                            stats, and in-depth analysis from the world of
                            cricket
                        </p>
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden bg-gradient-to-r from-green-600 via-yellow-700 to-blue-800 py-16 lg:py-24">
                <div className="absolute inset-0 rounded-2xl bg-[url('/cricket-stadium-background.png')] bg-cover bg-center opacity-10"></div>
                <div className="container relative mx-auto rounded-2xl px-4 sm:px-6 lg:px-8"></div>
                <div className="absolute bottom-0 left-0 right-0 h-px rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </section>

            {playerBanners.length > 0 && (
                <section className="relative -mt-8 mb-12">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                            {playerBanners.slice(0, 3).map((banner) => (
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
                                            alt={banner.name || "Player banner"}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            onError={(e) => {
                                                e.currentTarget.src =
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
            <div className="container mx-auto px-4 py-8">
                <div className="mb-6 flex items-center justify-between">
                    <div className="relative">
                        <div className="flex bg-gray-900 px-4 py-1 text-sm font-medium text-white">
                            LATEST NEWS
                        </div>
                    </div>
                </div>

                {news.length === 0 ? (
                    <div className="py-12 text-center">
                        <p className="text-gray-500">
                            No news available at the moment.
                        </p>
                    </div>
                ) : (
                    <div className="flex gap-6">
                        {/* Left side - Main Featured Article */}
                        <div className="flex-1">
                            {news.length > 0 && (
                                <div className="relative h-96 overflow-hidden rounded-lg bg-white shadow-lg">
                                    <img
                                        src={
                                            news[0].image &&
                                            news[0].image.length > 0
                                                ? news[0].image[0]
                                                : "/placeholder.svg?height=400&width=600&query=news"
                                        }
                                        alt={news[0].name}
                                        className="h-full w-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.src =
                                                "/placeholder.svg"
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                        <div className="mb-2 flex items-center gap-2">
                                            <span className="inline-block rounded bg-blue-600 px-2 py-1 text-xs font-medium uppercase tracking-wide">
                                                {news[0].category}
                                            </span>
                                            <span className="text-sm opacity-90">
                                                {formatDate(news[0].createdAt)}
                                            </span>
                                        </div>
                                        <h2 className="mb-3 text-2xl font-bold leading-tight lg:text-3xl">
                                            {news[0].name}
                                        </h2>
                                        <p className="line-clamp-3 text-sm text-gray-200 lg:text-base">
                                            {renderHtml(news[0].description)}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right side - Secondary articles and sidebar */}
                        <div className="w-80 space-y-6">
                            {/* Secondary Featured Articles */}
                            <div className="space-y-4">
                                {news.length > 1 && (
                                    <div className="relative h-48 overflow-hidden rounded-lg bg-white shadow-lg">
                                        <img
                                            src={
                                                news[1].image &&
                                                news[1].image.length > 0
                                                    ? news[1].image[0]
                                                    : "/placeholder.svg?height=200&width=320&query=news"
                                            }
                                            alt={news[1].name}
                                            className="h-full w-full object-cover"
                                            onError={(e) => {
                                                e.currentTarget.src =
                                                    "/placeholder.svg"
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                            <div className="mb-2 flex items-center gap-2">
                                                <span className="inline-block rounded bg-blue-600 px-2 py-1 text-xs font-medium uppercase tracking-wide">
                                                    {news[1].category}
                                                </span>
                                                <span className="text-xs opacity-90">
                                                    {formatDate(
                                                        news[1].createdAt,
                                                    )}
                                                </span>
                                            </div>
                                            <h3 className="line-clamp-2 text-lg font-bold leading-tight">
                                                {news[1].name}
                                            </h3>
                                        </div>
                                    </div>
                                )}

                                {news.length > 2 && (
                                    <div className="relative h-48 overflow-hidden rounded-lg bg-white shadow-lg">
                                        <img
                                            src={
                                                news[2].image &&
                                                news[2].image.length > 0
                                                    ? news[2].image[0]
                                                    : "/placeholder.svg?height=200&width=320&query=news"
                                            }
                                            alt={news[2].name}
                                            className="h-full w-full object-cover"
                                            onError={(e) => {
                                                e.currentTarget.src =
                                                    "/placeholder.svg"
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                            <div className="mb-2 flex items-center gap-2">
                                                <span className="inline-block rounded bg-blue-600 px-2 py-1 text-xs font-medium uppercase tracking-wide">
                                                    {news[2].category}
                                                </span>
                                                <span className="text-xs opacity-90">
                                                    {formatDate(
                                                        news[2].createdAt,
                                                    )}
                                                </span>
                                            </div>
                                            <h3 className="line-clamp-2 text-lg font-bold leading-tight">
                                                {news[2].name}
                                            </h3>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar with Remaining Articles */}
                            {news.length > 3 && (
                                <div className="space-y-3">
                                    {news.slice(3, 8).map((article) => (
                                        <div
                                            key={article._id}
                                            className="flex gap-3 rounded-lg border border-gray-200 bg-white p-3 transition-shadow hover:shadow-md"
                                        >
                                            <div className="flex-shrink-0">
                                                <img
                                                    src={
                                                        article.image &&
                                                        article.image.length > 0
                                                            ? article.image[0]
                                                            : "/placeholder.svg?height=60&width=60&query=news"
                                                    }
                                                    alt={article.name}
                                                    className="h-14 w-14 rounded object-cover"
                                                    onError={(e) => {
                                                        e.currentTarget.src =
                                                            "/placeholder.svg"
                                                    }}
                                                />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div className="mb-1 flex items-center gap-2">
                                                    <span className="inline-block rounded bg-blue-100 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-blue-800">
                                                        {article.category}
                                                    </span>
                                                    <span className="text-xs text-gray-500">
                                                        {formatDate(
                                                            article.createdAt,
                                                        )}
                                                    </span>
                                                </div>
                                                <h4 className="line-clamp-2 text-sm font-semibold leading-tight text-gray-900">
                                                    {article.name}
                                                </h4>
                                            </div>
                                        </div>
                                    ))}

                                    {/* More Latest News Button */}
                                    <div className="border-t border-gray-200 pt-4">
                                        <button className="flex w-full items-center justify-center gap-2 py-2 text-center text-sm font-medium text-blue-900 transition-colors hover:text-blue-700">
                                            MORE LATEST NEWS
                                            <svg
                                                className="h-4 w-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Sidebar with Remaining Articles */}
                {news.length > 8 && (
                    <div className="mt-8">
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
                            <div className="lg:col-span-3">
                                {/* This space can be used for other content */}
                            </div>
                            <div className="lg:col-span-1">
                                <div className="space-y-4">
                                    {news.slice(8).map((article) => (
                                        <div
                                            key={article._id}
                                            className="flex gap-3 rounded-lg border border-gray-200 bg-white p-3 transition-shadow hover:shadow-md"
                                        >
                                            <div className="flex-shrink-0">
                                                <img
                                                    src={
                                                        article.image &&
                                                        article.image.length > 0
                                                            ? article.image[0]
                                                            : "/placeholder.svg?height=80&width=80&query=news"
                                                    }
                                                    alt={article.name}
                                                    className="h-16 w-16 rounded object-cover"
                                                    onError={(e) => {
                                                        e.currentTarget.src =
                                                            "/placeholder.svg"
                                                    }}
                                                />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div className="mb-1 flex items-center gap-2">
                                                    <span className="inline-block rounded bg-blue-100 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-blue-800">
                                                        {article.category}
                                                    </span>
                                                    <span className="text-xs text-gray-500">
                                                        {formatDate(
                                                            article.createdAt,
                                                        )}
                                                    </span>
                                                </div>
                                                <h4 className="line-clamp-2 text-sm font-semibold leading-tight text-gray-900">
                                                    {article.name}
                                                </h4>
                                            </div>
                                        </div>
                                    ))}

                                    {/* More Latest News Button */}
                                    <div className="border-t border-gray-200 pt-4">
                                        <button className="flex w-full items-center justify-center gap-2 py-2 text-center text-sm font-medium text-blue-900 transition-colors hover:text-blue-700">
                                            MORE LATEST NEWS
                                            <svg
                                                className="h-4 w-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {latestNews.length > 0 && (
                <section className="relative bg-gradient-to-r from-blue-800 to-blue-600 py-8">
                    <div className="container mx-auto px-4">
                        <div className="mb-6 flex items-center justify-between">
                            <h3 className="text-2xl font-bold text-white">
                                Breaking News
                            </h3>
                            <div className="flex space-x-2">
                                <button
                                    onClick={goToPrevSlide}
                                    className="rounded-full bg-white/20 p-2 text-white transition-colors hover:bg-white/30"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                                <button
                                    onClick={goToNextSlide}
                                    className="rounded-full bg-white/20 p-2 text-white transition-colors hover:bg-white/30"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl">
                            <div
                                className="flex transition-transform duration-500 ease-in-out"
                                style={{
                                    transform: `translateX(-${currentSlide * 100}%)`,
                                }}
                            >
                                {latestNews.map((item, index) => (
                                    <div
                                        key={item._id}
                                        className="w-full flex-shrink-0"
                                    >
                                        <div className="flex flex-col md:flex-row">
                                            <div className="md:w-1/2">
                                                <img
                                                    src={
                                                        item.image &&
                                                        item.image.length > 0
                                                            ? item.image[0]
                                                            : "/placeholder.svg"
                                                    }
                                                    alt="Latest News"
                                                    className="h-64 w-full object-cover md:h-full"
                                                    onError={(e) => {
                                                        e.currentTarget.src =
                                                            "/placeholder.svg"
                                                    }}
                                                />
                                            </div>
                                            <div className="flex flex-col justify-center p-6 md:w-1/2">
                                                <div className="mb-4">
                                                    <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-600">
                                                        {item.category ||
                                                            "Cricket"}
                                                    </span>
                                                </div>
                                                <h3 className="mb-4 text-2xl font-bold text-gray-900">
                                                    {item.title ||
                                                        "Latest Update"}
                                                </h3>
                                                <p className="mb-6 text-gray-600">
                                                    {item.description ||
                                                        "Stay tuned for the latest cricket updates."}
                                                </p>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-gray-500">
                                                        {formatDate(
                                                            item.createdAt ||
                                                                new Date().toISOString(),
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Slide Indicators */}
                            <div className="absolute bottom-4 left-0 right-0">
                                <div className="flex justify-center space-x-2">
                                    {latestNews.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => goToSlide(index)}
                                            className={`h-3 w-3 rounded-full transition-all ${
                                                index === currentSlide
                                                    ? "w-6 bg-blue-900"
                                                    : "bg-gray-300"
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
            {/* Footer */}
            <footer className="mt-16 border-t border-gray-200 bg-white">
                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                        <div>
                            <h3 className="mb-4 text-lg font-bold text-blue-900">
                                Sportsclaus
                            </h3>
                            <p className="text-gray-600">
                                Your ultimate destination for cricket news,
                                scores, and comprehensive coverage of the sport.
                            </p>
                        </div>
                        <div>
                            <h4 className="mb-4 font-semibold text-gray-900">
                                Quick Links
                            </h4>
                            <ul className="space-y-2 text-gray-600">
                                <li>
                                    <button className="h-auto bg-transparent p-0 font-medium text-gray-600 transition-colors hover:text-blue-900">
                                        Scores
                                    </button>
                                </li>
                                <li>
                                    <button className="h-auto bg-transparent p-0 font-medium text-gray-600 transition-colors hover:text-blue-900">
                                        Latest News
                                    </button>
                                </li>
                                <li>
                                    <button className="h-auto bg-transparent p-0 font-medium text-gray-600 transition-colors hover:text-blue-900">
                                        Player Stats
                                    </button>
                                </li>
                                <li>
                                    <button className="h-auto bg-transparent p-0 font-medium text-gray-600 transition-colors hover:text-blue-900">
                                        Team Rankings
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="mb-4 font-semibold text-gray-900">
                                Tournaments
                            </h4>
                            <ul className="space-y-2 text-gray-600">
                                <li>
                                    <button className="h-auto bg-transparent p-0 font-medium text-gray-600 transition-colors hover:text-blue-900">
                                        IPL
                                    </button>
                                </li>
                                <li>
                                    <button className="h-auto bg-transparent p-0 font-medium text-gray-600 transition-colors hover:text-blue-900">
                                        T20 World Cup
                                    </button>
                                </li>
                                <li>
                                    <button className="h-auto bg-transparent p-0 font-medium text-gray-600 transition-colors hover:text-blue-900">
                                        Test Championship
                                    </button>
                                </li>
                                <li>
                                    <button className="h-auto bg-transparent p-0 font-medium text-gray-600 transition-colors hover:text-blue-900">
                                        ODI Series
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="mb-4 font-semibold text-gray-900">
                                Connect
                            </h4>
                            <ul className="space-y-2 text-gray-600">
                                <li>
                                    <button className="h-auto bg-transparent p-0 font-medium text-gray-600 transition-colors hover:text-blue-900">
                                        Twitter
                                    </button>
                                </li>
                                <li>
                                    <button className="h-auto bg-transparent p-0 font-medium text-gray-600 transition-colors hover:text-blue-900">
                                        Facebook
                                    </button>
                                </li>
                                <li>
                                    <button className="h-auto bg-transparent p-0 font-medium text-gray-600 transition-colors hover:text-blue-900">
                                        Instagram
                                    </button>
                                </li>
                                <li>
                                    <button className="h-auto bg-transparent p-0 font-medium text-gray-600 transition-colors hover:text-blue-900">
                                        YouTube
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Cricket
