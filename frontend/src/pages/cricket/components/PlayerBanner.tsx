import axios from "axios"
import { useEffect, useState } from "react"

interface PlayerBanner {
    _id: string
    name: string
    category: string
    image: string[]
}

const PlayerBanner = () => {
    const [playerBanners, setPlayerBanners] = useState<PlayerBanner[]>([])
    const getPlayersBanner = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8082/v1/integration_web/GetPlayerBanner`,
            )
            const banners = response.data.data || []

            // Filter banners to only show those with category "Cricket"
            const cricketBanners = banners.filter(
                (banner: PlayerBanner) =>
                    banner.category === "Cricket" ||
                    (banner.category &&
                        banner.category.toLowerCase().includes("cricket")),
            )
            setPlayerBanners(cricketBanners)
        } catch (err) {
            console.error(err)
        }
    }
    useEffect(() => {
        getPlayersBanner()
    }, [])

    return (
        <>
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-8 md:py-12 lg:py-16 xl:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl text-center">
                        <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                            Your Ultimate Cricket Destination
                        </h2>
                        <p className="mb-8 text-lg text-gray-700 sm:text-xl md:text-2xl">
                            Stay updated with scores, breaking news, player
                            stats, and in-depth analysis from the world of
                            cricket
                        </p>
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden bg-gradient-to-r from-green-600 via-yellow-700 to-blue-800 py-12 md:py-16 lg:py-20 xl:py-24">
                <div className="absolute inset-0 rounded-2xl bg-[url('/cricket-stadium-background.png')] bg-cover bg-center opacity-10"></div>
                <div className="container relative mx-auto rounded-2xl px-4 sm:px-6 lg:px-8">
                    <div className="py-8 text-center md:py-12">
                        <p className="mt-4 text-lg text-white/90 sm:text-xl md:text-2xl">
                            Discover the stars of the game
                        </p>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-px rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </section>

            {/* Player Cards Section */}
            {playerBanners.length > 0 && (
                <section className="relative -mt-8 mb-12 md:-mt-12 md:mb-16 lg:-mt-16 lg:mb-20 xl:-mt-20 xl:mb-24">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:gap-8">
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
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            onError={(e) => {
                                                e.currentTarget.src =
                                                    "/cricket-player.png"
                                            }}
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white sm:p-5 md:p-6">
                                        <span className="text-xs font-semibold text-yellow-400 sm:text-sm md:text-base">
                                            {banner.category ||
                                                "Cricket Player"}
                                        </span>
                                        <h3 className="mt-1 text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl">
                                            {banner.name}
                                        </h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    )
}

export default PlayerBanner
