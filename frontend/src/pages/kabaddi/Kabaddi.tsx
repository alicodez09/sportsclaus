"use client"

import Footer from "@/components/footer"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

interface NewsItem {
    _id: string
    name: string
    title?: string
    description: string
    category: string
    type?: string
    image: string[]
    createdAt: string
}

const Kabaddi = () => {
    const navigate = useNavigate()
    const [allNews, setAllNews] = useState<NewsItem[]>([])
    const [filteredNews, setFilteredNews] = useState<NewsItem[]>([])
    const [displayedNews, setDisplayedNews] = useState<NewsItem[]>([])
    const [showCount, setShowCount] = useState(4) // Show only 2 items at a time

    const getNews = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8082/v1/integration_web/GetNews`,
            )
            const newsData = response.data.data || []
            setAllNews(newsData)
            const filtered = newsData.filter((item: NewsItem) => {
                const hasCricketCategory =
                    item.category === "Kabaddi" ||
                    (item.category &&
                        item.category.toLowerCase().includes("Kabaddi"))

                return hasCricketCategory
            })

            setFilteredNews(filtered)
        } catch (err) {
            console.error("Error fetching news:", err)
        }
    }

    useEffect(() => {
        getNews()
    }, [])

    useEffect(() => {
        setDisplayedNews(filteredNews.slice(0, showCount))
    }, [filteredNews, showCount])

    const loadMore = () => {
        setShowCount((prev) => prev + 2) // Load 2 more items
    }

    const formatTimeAgo = (dateString: string) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffInHours = Math.floor(
            (now.getTime() - date.getTime()) / (1000 * 60 * 60),
        )

        if (diffInHours < 1) return "Just now"
        if (diffInHours === 1) return "1 hour ago"
        if (diffInHours < 24) return `${diffInHours} hours ago`

        const diffInDays = Math.floor(diffInHours / 24)
        if (diffInDays === 1) return "1 day ago"
        return `${diffInDays} days ago`
    }

    const stripHtml = (html: string) => {
        const tmp = document.createElement("div")
        tmp.innerHTML = html
        return tmp.textContent || tmp.innerText || ""
    }

    const handleNewsClick = (id: string) => {
        navigate(`/kabaddi/${id}`)
    }

    return (
        <>
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-6 flex items-center justify-center sm:mb-8 md:mb-10">
                        <div className="flex w-full max-w-4xl items-center justify-center">
                            <div className="flex-grow border-t border-gray-950"></div>
                            <div className="mx-2 flex flex-col items-center px-2 sm:mx-4 sm:px-4">
                                <h1 className="text-xl font-bold text-gray-900 sm:text-2xl md:text-3xl lg:text-4xl">
                                    Kabaddi NEWS
                                </h1>
                                <div className="mt-2 h-1 w-12 bg-blue-900 sm:w-16"></div>
                            </div>
                            <div className="flex-grow border-t border-gray-950"></div>
                        </div>
                    </div>

                    {/* News Grid - Only 2 items displayed */}
                    <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
                        {displayedNews.map((item) => (
                            <div
                                key={item._id}
                                className="group relative h-96 w-full cursor-pointer overflow-hidden" // Increased height
                                onClick={() => handleNewsClick(item._id)}
                            >
                                {/* Background Image */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                                    style={{
                                        backgroundImage: `url(${item.image[0] || "/cricket-news-headline.png"})`,
                                    }}
                                />

                                {/* Dark Overlay */}
                                <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-50" />

                                {/* Content */}
                                <div className="absolute inset-0 flex flex-col justify-between p-8 text-white">
                                    {" "}
                                    {/* Increased padding */}
                                    {/* Category and Time */}
                                    <div className="flex items-center justify-between">
                                        <span className="rounded bg-white bg-opacity-20 px-3 py-2 text-sm font-semibold uppercase tracking-wide">
                                            {" "}
                                            {/* Increased size */}
                                            {item.category} NEWS
                                        </span>
                                        <span className="text-sm opacity-90">
                                            {" "}
                                            {/* Increased size */}
                                            {formatTimeAgo(item.createdAt)}
                                        </span>
                                    </div>
                                    {/* Title */}
                                    <div>
                                        <h3 className="mb-4 line-clamp-3 text-2xl font-bold leading-tight">
                                            {" "}
                                            {/* Increased size */}
                                            {item.name}
                                        </h3>
                                        {item.description && (
                                            <p className="line-clamp-3 text-base opacity-90">
                                                {" "}
                                                {/* Increased size */}
                                                {stripHtml(item.description)}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Load More Button */}
                    {showCount < filteredNews.length && (
                        <div className="text-center">
                            <button
                                onClick={loadMore}
                                className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                MORE POSTS
                            </button>
                        </div>
                    )}

                    {/* No more posts message */}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Kabaddi
