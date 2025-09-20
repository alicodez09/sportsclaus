import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"

interface NewsItem {
    _id: string
    name: string
    description: string
    category: string
    image: string[]
    videos: string[]
    createdAt: string
    updatedAt: string
}

const KabaddiDetails = () => {
    const { id } = useParams<{ id: string }>()
    const [newsItem, setNewsItem] = useState<NewsItem | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const getNewsDetails = async () => {
        try {
            setLoading(true)
            const response = await axios.get(
                `https://events.alltheapps.io/v1/integration_web/GetSingleNews/${id}`,
            )
            setNewsItem(response.data.data)
        } catch (err) {
            console.error(err)
            setError("Failed to load news details. Please try again later.")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (id) {
            getNewsDetails()
        }
    }, [id])

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
                    <p className="text-gray-600">Loading news details...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="mx-auto max-w-md p-6 text-center">
                    <div className="mx-auto mb-4 h-12 w-12 text-red-500">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                    </div>
                    <p className="mb-4 text-gray-800">{error}</p>
                    <button
                        onClick={getNewsDetails}
                        className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        )
    }

    if (!newsItem) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="text-center">
                    <p className="text-gray-600">News article not found.</p>
                    <Link
                        to="/kabaddi"
                        className="mt-4 inline-block rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                    >
                        Back to News
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="min-h-screen bg-gray-50">
                {/* Breadcrumb Navigation */}
                <nav className="border-b border-gray-200 bg-white">
                    <div className="container mx-auto px-4 py-3">
                        <div className="flex items-center space-x-2 text-sm">
                            <Link
                                to="/"
                                className="text-blue-600 hover:text-blue-800"
                            >
                                Home
                            </Link>
                            <span className="text-gray-400">/</span>
                            <Link
                                to="/kabaddi"
                                className="text-blue-600 hover:text-blue-800"
                            >
                                Kabaddi News
                            </Link>
                            <span className="text-gray-400">/</span>
                            <span className="truncate text-gray-600">
                                {newsItem.name}
                            </span>
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <div className="container mx-auto max-w-7xl px-4 py-8">
                    <article className="overflow-hidden rounded-xl bg-white shadow-md">
                        {/* Article Header */}
                        <header className="border-b border-gray-100 p-6">
                            <div className="mb-4 flex flex-wrap items-center gap-2">
                                <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium uppercase tracking-wide text-blue-800">
                                    {newsItem.category}
                                </span>
                                <span className="text-xs text-gray-500">
                                    {formatDate(newsItem.createdAt)}
                                </span>
                                {newsItem.updatedAt !== newsItem.createdAt && (
                                    <span className="text-xs text-gray-500">
                                        Updated:{" "}
                                        {formatDate(newsItem.updatedAt)}
                                    </span>
                                )}
                            </div>
                            <h1 className="text-2xl font-bold leading-tight text-gray-900 md:text-3xl lg:text-4xl">
                                {newsItem.name}
                            </h1>
                        </header>

                        {/* Featured Image */}
                        {newsItem.image && newsItem.image.length > 0 && (
                            <div className="aspect-video w-full overflow-hidden md:aspect-[16/9]">
                                <img
                                    src={newsItem.image[0]}
                                    alt={newsItem.name}
                                    className="h-full w-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src =
                                            "https://via.placeholder.com/800x450?text=Image+Not+Found"
                                    }}
                                />
                            </div>
                        )}

                        {/* Article Content */}
                        <div className="p-6">
                            <div
                                className="prose prose-lg max-w-none text-black"
                                dangerouslySetInnerHTML={{
                                    __html: newsItem.description,
                                }}
                            />

                            {/* Video Section if videos exist */}
                            {newsItem.videos && newsItem.videos.length > 0 && (
                                <div className="mt-8">
                                    <h2 className="mb-4 text-xl font-semibold">
                                        Related Videos
                                    </h2>
                                    <div className="grid grid-cols-1 gap-4">
                                        {newsItem.videos.map((video, index) => (
                                            <div
                                                key={index}
                                                className="flex aspect-video items-center justify-center rounded-lg bg-gray-200"
                                            >
                                                <p className="text-gray-500">
                                                    Video content would be
                                                    embedded here
                                                </p>
                                                {/* In a real implementation, you would embed the video player */}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Article Footer */}
                        <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 p-6">
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-600">
                                    Share this article:
                                </span>
                                <div className="flex space-x-2">
                                    <button className="rounded-full bg-gray-100 p-2 transition-colors hover:bg-gray-200">
                                        <svg
                                            className="h-5 w-5 text-gray-600"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
                                        </svg>
                                    </button>
                                    <button className="rounded-full bg-gray-100 p-2 transition-colors hover:bg-gray-200">
                                        <svg
                                            className="h-5 w-5 text-gray-600"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                        </svg>
                                    </button>
                                    <button className="rounded-full bg-gray-100 p-2 transition-colors hover:bg-gray-200">
                                        <svg
                                            className="h-5 w-5 text-gray-600"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <Link
                                to="/kabaddi"
                                className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                            >
                                <svg
                                    className="mr-2 h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                    />
                                </svg>
                                Back to News
                            </Link>
                        </footer>
                    </article>
                </div>
            </div>

            {/* Custom Styles for HTML Content */}
            <style>{`
                .prose h2, .prose h3, .prose h4 {
                    font-weight: 700;
                    margin-top: 1.5em;
                    margin-bottom: 0.5em;
                    color: #1f2937;
                }
                .prose h2 {
                    font-size: 1.5em;
                }
                .prose h3 {
                    font-size: 1.25em;
                }
                .prose p {
                    margin-bottom: 1em;
                    line-height: 1.7;
                }
                .prose b, .prose strong {
                    font-weight: 700;
                }
                .prose i, .prose em {
                    font-style: italic;
                }
                .prose u {
                    text-decoration: underline;
                }
                .prose div {
                    margin-bottom: 1em;
                }
            `}</style>
        </>
    )
}

export default KabaddiDetails
