import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

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

const LatestKabaddi = () => {
    const [allNews, setAllNews] = useState<NewsItem[]>([])
    const [filteredNews, setFilteredNews] = useState<NewsItem[]>([])
    const [loading, setLoading] = useState(true)
    const [showMoreNews, setShowMoreNews] = useState(false)
    const [showAllNews, setShowAllNews] = useState(false)
    const navigate = useNavigate()

    const getNews = async () => {
        try {
            const response = await axios.get(
                `https://events.alltheapps.io/v1/integration_web/GetNews`,
            )
            const newsData = response.data.data || []
            setAllNews(newsData)
            const filtered = newsData.filter((item: NewsItem) => {
                const hasCricketCategory =
                    item.category === "Kabaddi" ||
                    (item.category &&
                        item.category.toLowerCase().includes("kabaddi"))

                return hasCricketCategory
            })

            setFilteredNews(filtered)
        } catch (err) {
            console.error("Error fetching news:", err)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            await getNews()
            setLoading(false)
        }
        fetchData()
    }, [])

    const handleCardClick = (id: string) => {
        navigate(`/kabaddi/${id}`)
    }

    const handleViewAll = () => {
        setShowAllNews(true)
    }

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

    // Get the news item name (handle both name and title fields)
    const getItemName = (item: NewsItem) => {
        return item.name || item.title || "Untitled News"
    }

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white">
                <div className="text-center">
                    <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-900"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto px-4 py-3 sm:px-6 md:py-6 lg:px-8 lg:py-6 xl:px-36">
                <div className="mb-6 flex items-center justify-center sm:mb-8 md:mb-10">
                    <div className="flex w-full max-w-4xl items-center justify-center">
                        <div className="flex-grow border-t border-gray-950"></div>
                        <div className="mx-2 flex flex-col items-center px-2 sm:mx-4 sm:px-4">
                            <h1 className="text-xl font-bold text-gray-900 sm:text-2xl md:text-3xl lg:text-4xl">
                                LATEST KABBADI NEWS
                            </h1>
                            <div className="mt-2 h-1 w-12 bg-blue-900 sm:w-16"></div>
                        </div>
                        <div className="flex-grow border-t border-gray-950"></div>
                    </div>
                </div>

                {filteredNews.length === 0 ? (
                    <div className="py-12 text-center">
                        <p className="text-gray-500">
                            No cricket news available at the moment.
                        </p>
                        <button
                            onClick={getNews}
                            className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                        >
                            Refresh
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Main News Grid - Using flex for equal height */}
                        <div className="flex flex-col gap-6 lg:flex-row">
                            {/* Featured News (Left Column - 2/3 width) */}
                            <div className="lg:w-2/3">
                                {filteredNews.length > 0 && (
                                    <div
                                        className="group relative h-64 cursor-pointer overflow-hidden bg-white shadow-lg transition-all duration-300 hover:shadow-xl sm:h-80 md:h-96 lg:h-[500px]"
                                        onClick={() =>
                                            handleCardClick(filteredNews[0]._id)
                                        }
                                    >
                                        <img
                                            src={
                                                filteredNews[0].image &&
                                                filteredNews[0].image.length > 0
                                                    ? filteredNews[0].image[0]
                                                    : "/placeholder.svg?height=500&width=800&query=cricket"
                                            }
                                            alt={getItemName(filteredNews[0])}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            onError={(e) => {
                                                e.currentTarget.src =
                                                    "/placeholder.svg?height=500&width=800&query=cricket"
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white sm:p-6">
                                            <div className="mb-2 flex flex-wrap items-center gap-2">
                                                <span className="inline-block bg-blue-600 px-2 py-1 text-xs font-medium uppercase tracking-wide">
                                                    {filteredNews[0].category}
                                                </span>
                                                <span className="text-xs opacity-90 sm:text-sm">
                                                    {formatDate(
                                                        filteredNews[0]
                                                            .createdAt,
                                                    )}
                                                </span>
                                            </div>
                                            <h2 className="mb-2 text-lg font-bold leading-tight sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                                                {getItemName(filteredNews[0])}
                                            </h2>
                                            <p className="line-clamp-2 text-xs text-gray-200 sm:text-sm md:text-base">
                                                {renderHtml(
                                                    filteredNews[0].description,
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Secondary News (Right Column - 1/3 width) */}
                            <div className="flex flex-col gap-4 sm:gap-6 lg:w-1/3">
                                {filteredNews.length > 1 && (
                                    <div
                                        className="group relative h-48 cursor-pointer overflow-hidden bg-white shadow-lg transition-all duration-300 hover:shadow-xl sm:h-56 md:h-64 lg:h-[234px]"
                                        onClick={() =>
                                            handleCardClick(filteredNews[1]._id)
                                        }
                                    >
                                        <img
                                            src={
                                                filteredNews[1].image &&
                                                filteredNews[1].image.length > 0
                                                    ? filteredNews[1].image[0]
                                                    : "/placeholder.svg?height=242&width=400&query=cricket"
                                            }
                                            alt={getItemName(filteredNews[1])}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            onError={(e) => {
                                                e.currentTarget.src =
                                                    "/placeholder.svg?height=242&width=400&query=cricket"
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                            <div className="mb-2 flex flex-wrap items-center gap-2">
                                                <span className="inline-block bg-blue-600 px-2 py-1 text-xs font-medium uppercase tracking-wide">
                                                    {filteredNews[1].category}
                                                </span>
                                                <span className="text-xs opacity-90">
                                                    {formatDate(
                                                        filteredNews[1]
                                                            .createdAt,
                                                    )}
                                                </span>
                                            </div>
                                            <h3 className="line-clamp-2 text-base font-bold leading-tight sm:text-lg md:text-xl">
                                                {getItemName(filteredNews[1])}
                                            </h3>
                                        </div>
                                    </div>
                                )}

                                {filteredNews.length > 2 && (
                                    <div
                                        className="group relative h-48 cursor-pointer overflow-hidden bg-white shadow-lg transition-all duration-300 hover:shadow-xl sm:h-56 md:h-64 lg:h-[242px]"
                                        onClick={() =>
                                            handleCardClick(filteredNews[2]._id)
                                        }
                                    >
                                        <img
                                            src={
                                                filteredNews[2].image &&
                                                filteredNews[2].image.length > 0
                                                    ? filteredNews[2].image[0]
                                                    : "/placeholder.svg?height=242&width=400&query=cricket"
                                            }
                                            alt={getItemName(filteredNews[2])}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            onError={(e) => {
                                                e.currentTarget.src =
                                                    "/placeholder.svg?height=242&width=400&query=cricket"
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                            <div className="mb-2 flex flex-wrap items-center gap-2">
                                                <span className="inline-block bg-blue-600 px-2 py-1 text-xs font-medium uppercase tracking-wide">
                                                    {filteredNews[2].category}
                                                </span>
                                                <span className="text-xs opacity-90">
                                                    {formatDate(
                                                        filteredNews[2]
                                                            .createdAt,
                                                    )}
                                                </span>
                                            </div>
                                            <h3 className="line-clamp-2 text-base font-bold leading-tight sm:text-lg md:text-xl">
                                                {getItemName(filteredNews[2])}
                                            </h3>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Show all news when View All is clicked */}
                        {showAllNews ? (
                            <div className="mt-8 md:mt-10">
                                <div className="mb-6 flex items-center justify-between">
                                    <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                                        All Cricket News
                                    </h2>
                                    <button
                                        onClick={() => setShowAllNews(false)}
                                        className="text-sm font-medium text-blue-900 hover:text-blue-700"
                                    >
                                        Show Less
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                    {filteredNews.slice(3).map((article) => (
                                        <div
                                            key={article._id}
                                            className="group cursor-pointer overflow-hidden border border-gray-200 bg-white transition-all duration-300 hover:shadow-lg"
                                            onClick={() =>
                                                handleCardClick(article._id)
                                            }
                                        >
                                            <div className="aspect-video overflow-hidden">
                                                <img
                                                    src={
                                                        article.image &&
                                                        article.image.length > 0
                                                            ? article.image[0]
                                                            : "/placeholder.svg?height=200&width=300&query=cricket"
                                                    }
                                                    alt={getItemName(article)}
                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    onError={(e) => {
                                                        e.currentTarget.src =
                                                            "/placeholder.svg?height=200&width=300&query=cricket"
                                                    }}
                                                />
                                            </div>
                                            <div className="p-4">
                                                <div className="mb-2 flex flex-wrap items-center gap-2">
                                                    <span className="inline-block bg-blue-100 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-blue-800">
                                                        {article.category}
                                                    </span>
                                                    <span className="text-xs text-gray-500">
                                                        {formatDate(
                                                            article.createdAt,
                                                        )}
                                                    </span>
                                                </div>
                                                <h4 className="line-clamp-2 text-sm font-semibold leading-tight text-gray-900 group-hover:text-blue-700 sm:text-base">
                                                    {getItemName(article)}
                                                </h4>
                                                <p className="mt-2 line-clamp-3 text-xs text-gray-600 sm:text-sm">
                                                    {renderHtml(
                                                        article.description
                                                            .replace(
                                                                /<[^>]*>/g,
                                                                "",
                                                            )
                                                            .substring(0, 100),
                                                    )}
                                                    ...
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            /* Additional News Items (limited view) */
                            filteredNews.length > 3 && (
                                <div className="mt-8 md:mt-10">
                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
                                        {/* Show first 4 additional news items on larger screens */}
                                        {filteredNews
                                            .slice(3, 7)
                                            .map((article) => (
                                                <div
                                                    key={article._id}
                                                    className="group cursor-pointer overflow-hidden border border-gray-200 bg-white transition-all duration-300 hover:shadow-lg"
                                                    onClick={() =>
                                                        handleCardClick(
                                                            article._id,
                                                        )
                                                    }
                                                >
                                                    <div className="aspect-video overflow-hidden">
                                                        <img
                                                            src={
                                                                article.image &&
                                                                article.image
                                                                    .length > 0
                                                                    ? article
                                                                          .image[0]
                                                                    : "/placeholder.svg?height=200&width=300&query=cricket"
                                                            }
                                                            alt={getItemName(
                                                                article,
                                                            )}
                                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                            onError={(e) => {
                                                                e.currentTarget.src =
                                                                    "/placeholder.svg?height=200&width=300&query=cricket"
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="p-4">
                                                        <div className="mb-2 flex flex-wrap items-center gap-2">
                                                            <span className="inline-block bg-blue-100 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-blue-800">
                                                                {
                                                                    article.category
                                                                }
                                                            </span>
                                                            <span className="text-xs text-gray-500">
                                                                {formatDate(
                                                                    article.createdAt,
                                                                )}
                                                            </span>
                                                        </div>
                                                        <h4 className="line-clamp-2 text-sm font-semibold leading-tight text-gray-900 group-hover:text-blue-700 sm:text-base">
                                                            {getItemName(
                                                                article,
                                                            )}
                                                        </h4>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>

                                    {/* Show more news button for mobile */}
                                    {filteredNews.length > 7 && (
                                        <div className="mt-6 flex justify-center lg:hidden">
                                            <button
                                                onClick={() =>
                                                    setShowMoreNews(
                                                        !showMoreNews,
                                                    )
                                                }
                                                className="flex items-center justify-center gap-2 bg-gray-100 px-6 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
                                            >
                                                {showMoreNews
                                                    ? "Show Less"
                                                    : "Load More News"}
                                                <svg
                                                    className={`h-4 w-4 transition-transform ${showMoreNews ? "rotate-180" : ""}`}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 9l-7 7-7-7"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    )}

                                    {/* Additional news items for mobile when expanded */}
                                    {showMoreNews &&
                                        filteredNews.length > 7 && (
                                            <div className="mt-6 grid grid-cols-1 gap-4 lg:hidden">
                                                {filteredNews
                                                    .slice(7)
                                                    .map((article) => (
                                                        <div
                                                            key={article._id}
                                                            className="flex cursor-pointer gap-3 border border-gray-200 bg-white p-3 transition-shadow hover:shadow-md"
                                                            onClick={() =>
                                                                handleCardClick(
                                                                    article._id,
                                                                )
                                                            }
                                                        >
                                                            <div className="flex-shrink-0">
                                                                <img
                                                                    src={
                                                                        article.image &&
                                                                        article
                                                                            .image
                                                                            .length >
                                                                            0
                                                                            ? article
                                                                                  .image[0]
                                                                            : "/placeholder.svg?height=60&width=60&query=cricket"
                                                                    }
                                                                    alt={getItemName(
                                                                        article,
                                                                    )}
                                                                    className="h-14 w-14 object-cover"
                                                                    onError={(
                                                                        e,
                                                                    ) => {
                                                                        e.currentTarget.src =
                                                                            "/placeholder.svg?height=60&width=60&query=cricket"
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="min-w-0 flex-1">
                                                                <div className="mb-1 flex items-center gap-2">
                                                                    <span className="inline-block bg-blue-100 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-blue-800">
                                                                        {
                                                                            article.category
                                                                        }
                                                                    </span>
                                                                    <span className="text-xs text-gray-500">
                                                                        {formatDate(
                                                                            article.createdAt,
                                                                        )}
                                                                    </span>
                                                                </div>
                                                                <h4 className="line-clamp-2 text-sm font-semibold leading-tight text-gray-900">
                                                                    {getItemName(
                                                                        article,
                                                                    )}
                                                                </h4>
                                                            </div>
                                                        </div>
                                                    ))}
                                            </div>
                                        )}

                                    {/* View All News Button for larger screens */}
                                    {filteredNews.length > 7 && (
                                        <div className="mt-8 flex justify-center">
                                            <button
                                                onClick={handleViewAll}
                                                className="flex items-center justify-center gap-2 bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                                            >
                                                VIEW ALL NEWS
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
                                    )}
                                </div>
                            )
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default LatestKabaddi
