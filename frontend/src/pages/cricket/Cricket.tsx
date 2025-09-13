"use client"

import {
    Search,
    Clock,
    TrendingUp,
    Users,
    Calendar,
    MapPin,
} from "lucide-react"
import cricket_celebration from "./cricket-match-celebration.jpg"
import cricket_stadium_crowd from "./cricket-stadium-crowd.png"
import young_cricket_player_batting from "./young-cricket-player-batting.jpg"

const Cricket = () => {
    const featuredNews = [
        {
            id: 1,
            title: "India Dominates Australia in Historic Test Victory",
            excerpt:
                "A masterful bowling performance led India to a commanding 8-wicket victory in the first Test match at Melbourne Cricket Ground.",
            image: cricket_celebration,
            category: "Test Cricket",
            readTime: "5 min read",
            publishedAt: "2 hours ago",
        },
        {
            id: 2,
            title: "T20 World Cup 2024: Schedule and Key Players to Watch",
            excerpt:
                "Complete guide to the upcoming T20 World Cup with match schedules, venue details, and star players from each team.",
            image: cricket_stadium_crowd,
            category: "T20 World Cup",
            readTime: "8 min read",
            publishedAt: "4 hours ago",
        },
        {
            id: 3,
            title: "Rising Stars: Young Talents Making Their Mark",
            excerpt:
                "Meet the next generation of cricket superstars who are already making waves in international cricket.",
            image: young_cricket_player_batting,
            category: "Player Focus",
            readTime: "6 min read",
            publishedAt: "6 hours ago",
        },
    ]

    const liveScores = [
        {
            team1: "England",
            team2: "Pakistan",
            score1: "198/8",
            score2: "201/3",
            overs1: "50.0",
            overs2: "48.2",
            status: "PK Won",
            format: "ODI",
        },
        {
            team1: "South Africa",
            team2: "New Zealand",
            score1: "198/8",
            score2: "201/3",
            overs1: "20.0",
            overs2: "18.2",
            status: "NZ Won",
            format: "T20",
        },
    ]
    const upcommingScores = [
        {
            team1: "India",
            team2: "Pakistan",
            score1: "0.0",
            score2: "0.0",
            overs1: "50.0",
            overs2: "50.0",
            status: "PK Won",
            format: "ODI",
        },
        {
            team1: "Australia",
            team2: "New Zealand",
            score1: "0.0",
            score2: "0.0",
            overs1: "20.0",
            overs2: "20.0",
            status: "NZ Won",
            format: "T20",
        },
    ]

    const quickStats = [
        { label: "Matches Today", value: "12", icon: Calendar },
        { label: "Live Games", value: "3", icon: TrendingUp },
        { label: "Active Players", value: "2.4K", icon: Users },
        { label: "Countries", value: "50", icon: MapPin },
    ]

    return (
        <div className="min-h-screen bg-white">
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
                        <div className="flex flex-wrap justify-center gap-4">
                            <button className="rounded-md bg-blue-900 px-6 py-3 text-lg font-medium text-white hover:bg-blue-800">
                                View Scores
                            </button>
                            <button className="rounded-md border border-blue-900 px-6 py-3 text-lg font-medium text-blue-900 hover:bg-blue-900 hover:text-white">
                                Latest News
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Stats */}
            <section className="bg-white py-8">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                        {quickStats.map((stat, index) => (
                            <div
                                key={index}
                                className="rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md"
                            >
                                <stat.icon className="mx-auto mb-2 h-8 w-8 text-blue-900" />
                                <div className="text-2xl font-bold text-gray-900">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-gray-600">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Featured News */}
                        <section className="mb-12">
                            <div className="mb-6 flex items-center justify-between">
                                <h3 className="text-2xl font-bold text-gray-900">
                                    Latest Cricket News
                                </h3>
                                <button className="rounded-md border border-blue-900 px-4 py-2 font-medium text-blue-900 hover:bg-blue-900 hover:text-white">
                                    View All News
                                </button>
                            </div>

                            <div className="space-y-6">
                                {featuredNews.map((article) => (
                                    <div
                                        key={article.id}
                                        className="overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-lg"
                                    >
                                        <div className="md:flex">
                                            <div className="md:w-1/3">
                                                <img
                                                    src={
                                                        article.image ||
                                                        "/placeholder.svg"
                                                    }
                                                    alt={article.title}
                                                    className="h-48 w-full object-cover md:h-full"
                                                />
                                            </div>
                                            <div className="p-6 md:w-2/3">
                                                <div className="mb-3 flex items-center gap-2">
                                                    <span className="rounded bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-900">
                                                        {article.category}
                                                    </span>
                                                    {/* <div className="flex items-center text-sm text-gray-500">
                                                        <Clock className="mr-1 h-4 w-4" />
                                                        {article.readTime}
                                                    </div> */}
                                                </div>
                                                <h4 className="mb-2 text-xl font-semibold text-gray-900">
                                                    {article.title}
                                                </h4>
                                                <p className="mb-4 text-gray-600">
                                                    {article.excerpt}
                                                </p>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-gray-500">
                                                        {article.publishedAt}
                                                    </span>
                                                    <button className="rounded-md p-2 font-medium text-blue-900 hover:bg-blue-50 hover:text-blue-800">
                                                        Read More
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                            <div className="border-b border-gray-200 px-6 py-4">
                                <div className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                                    <div className="h-2 w-2 animate-pulse rounded-full bg-red-500"></div>
                                    Scores Updates
                                </div>
                            </div>
                            <div className="space-y-4 p-6">
                                {liveScores.map((match, index) => (
                                    <div
                                        key={index}
                                        className="rounded-lg border border-gray-200 bg-gray-50 p-4"
                                    >
                                        <div className="mb-2 flex items-center justify-between">
                                            <span
                                                className={`rounded px-2.5 py-0.5 text-xs font-medium ${
                                                    match.status === "Live"
                                                        ? "bg-red-100 text-red-800"
                                                        : "bg-gray-100 text-gray-800"
                                                }`}
                                            >
                                                {match.format} • {match.status}
                                            </span>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium text-gray-900">
                                                    {match.team1}
                                                </span>
                                                <span className="text-sm text-gray-900">
                                                    {match.score1} (
                                                    {match.overs1})
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium text-gray-900">
                                                    {match.team2}
                                                </span>
                                                <span className="text-sm text-gray-900">
                                                    {match.score2} (
                                                    {match.overs2})
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <button className="w-full rounded-md bg-blue-900 px-4 py-2 font-medium text-white hover:bg-blue-800">
                                    View All Matches
                                </button>
                            </div>
                        </div>
                        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                            <div className="border-b border-gray-200 px-6 py-4">
                                <div className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                                    <div className="h-2 w-2 animate-pulse rounded-full bg-red-500"></div>
                                    Upcomming Matches
                                </div>
                            </div>
                            <div className="space-y-4 p-6">
                                {upcommingScores.map((match, index) => (
                                    <div
                                        key={index}
                                        className="rounded-lg border border-gray-200 bg-gray-50 p-4"
                                    >
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium text-gray-900">
                                                    {match.team1}
                                                </span>
                                                <span className="text-sm text-gray-900">
                                                    {match.score1} (
                                                    {match.overs1})
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium text-gray-900">
                                                    {match.team2}
                                                </span>
                                                <span className="text-sm text-gray-900">
                                                    {match.score2} (
                                                    {match.overs2})
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <button className="w-full rounded-md bg-blue-900 px-4 py-2 font-medium text-white hover:bg-blue-800">
                                    View All Matches
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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
                                    <button className="h-auto bg-transparent p-0 font-medium text-gray-600 hover:text-blue-900">
                                        Scores
                                    </button>
                                </li>
                                <li>
                                    <button className="h-auto bg-transparent p-0 font-medium text-gray-600 hover:text-blue-900">
                                        Latest News
                                    </button>
                                </li>
                                <li>
                                    <button className="h-auto bg-transparent p-0 font-medium text-gray-600 hover:text-blue-900">
                                        Player Stats
                                    </button>
                                </li>
                                <li>
                                    <button className="h-auto bg-transparent p-0 font-medium text-gray-600 hover:text-blue-900">
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
                                    <button className="h-auto bg-transparent p-0 font-medium text-gray-600 hover:text-blue-900">
                                        IPL
                                    </button>
                                </li>
                                <li>
                                    <button className="h-auto bg-transparent p-0 font-medium text-gray-600 hover:text-blue-900">
                                        T20 World Cup
                                    </button>
                                </li>
                                <li>
                                    <button className="h-auto bg-transparent p-0 font-medium text-gray-600 hover:text-blue-900">
                                        Test Championship
                                    </button>
                                </li>
                                <li>
                                    <button className="h-auto bg-transparent p-0 font-medium text-gray-600 hover:text-blue-900">
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
                                    <button className="h-auto bg-transparent p-0 font-medium text-gray-600 hover:text-blue-900">
                                        Twitter
                                    </button>
                                </li>
                                <li>
                                    <button className="h-auto bg-transparent p-0 font-medium text-gray-600 hover:text-blue-900">
                                        Facebook
                                    </button>
                                </li>
                                <li>
                                    <button className="h-auto bg-transparent p-0 font-medium text-gray-600 hover:text-blue-900">
                                        Instagram
                                    </button>
                                </li>
                                <li>
                                    <button className="h-auto bg-transparent p-0 font-medium text-gray-600 hover:text-blue-900">
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
