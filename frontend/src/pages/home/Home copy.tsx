import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Eye, Heart } from "lucide-react"
import { motion, useAnimation } from "framer-motion"
import shoppingMall from "./shopping_mall.jpg"
import clothes from "./clothes.jpg"
import online from "./online.jpg"
import axios from "axios"
import Cricket from "../cricket/Cricket"
import Football from "../football/Football"

// Define the type for banner data
interface Banner {
    _id: string
    category: string
    name: string
    description: string
    image: string[]
    createdAt: string
    updatedAt: string
    __v: number
}

const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const [sliderData, setSliderData] = useState<Banner[]>([])
    const controls = useAnimation()
    const defaultImages = [shoppingMall, online, clothes]

    const sliderImages =
        sliderData.length > 0
            ? sliderData.map((banner) => banner.image[0])
            : defaultImages

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8082/v1/integration_web/GetBanner`,
                )
                if (response.data.data && response.data.data.length > 0) {
                    setSliderData(response.data.data)
                }
            } catch (error) {
                console.error("Error fetching banners:", error)
            }
        }
        getData()
    }, [])

    // Metric cards data
    const metricCards = [
        {
            id: 1,
            value: "74M+",
            description: "Followers on",
            subdescription: "@433 Instagram",
            bgColor: "bg-blue-900",
            textColor: "text-white",
        },
        {
            id: 2,
            value: "2B+",
            description: "Views per",
            subdescription: "month",
            icon: Eye,
            bgColor: "bg-blue-900",
            textColor: "text-white",
        },
        {
            id: 3,
            value: "7B+",
            description: "Impressions",
            subdescription: "a month",
            icon: Eye,
            bgColor: "bg-blue-900",
            textColor: "text-white",
        },
        {
            id: 4,
            value: "14.4%",
            description: "Engagement rate",
            subdescription: "on reach",
            icon: Heart,
            bgColor: "bg-blue-900",
            textColor: "text-white",
        },
        {
            id: 5,
            value: "115M+",
            description: "Total followers, all",
            subdescription: "platforms combined",
            icon: null,
            bgColor: "bg-blue-900",
            textColor: "text-white",
        },
    ]

    // Auto-advance the slider
    useEffect(() => {
        if (sliderImages.length === 0) return

        const interval = setInterval(() => {
            setCurrentSlide((prev) =>
                prev === sliderImages.length - 1 ? 0 : prev + 1,
            )
        }, 5000)
        return () => clearInterval(interval)
    }, [sliderImages.length])

    useEffect(() => {
        const startAnimation = async () => {
            if (!isPaused) {
                // Set initial position to 0
                controls.set({ x: 0 })

                // Animate to the negative width of one set of cards
                await controls.start({
                    x: -100 * metricCards.length,
                    transition: {
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 5 * metricCards.length, // Adjust duration based on number of cards
                            ease: "linear",
                        },
                    },
                })
            }
        }

        startAnimation()
    }, [controls, isPaused, metricCards.length])

    // Navigate to the previous slide
    const prevSlide = () => {
        setCurrentSlide((prev) =>
            prev === 0 ? sliderImages.length - 1 : prev - 1,
        )
    }

    // Navigate to the next slide
    const nextSlide = () => {
        setCurrentSlide((prev) =>
            prev === sliderImages.length - 1 ? 0 : prev + 1,
        )
    }

    // Handle mouse enter (pause animation)
    const handleMouseEnter = () => {
        setIsPaused(true)
        controls.stop() // Stop the current animation
    }

    // Handle mouse leave (resume animation)
    const handleMouseLeave = () => {
        setIsPaused(false)
    }

    return (
        <>
            <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-4 sm:p-6">
                {/* Hero Section with Slider */}
                {/* <section className="relative mb-8 h-[400px] overflow-hidden sm:mb-10 sm:h-[450px] md:mb-12 md:h-[500px] lg:h-[550px]">
                    <div className="relative h-full w-full">
                        {sliderImages.map((image: any, index: any) => (
                            <div
                                key={index}
                                className={`absolute inset-0 overflow-hidden rounded-xl shadow-lg transition-opacity duration-1000 md:rounded-2xl ${
                                    index === currentSlide
                                        ? "opacity-100"
                                        : "opacity-0"
                                }`}
                            >
                                <img
                                    src={image || "/placeholder.svg"}
                                    alt={`Slide ${index + 1}`}
                                    className="h-full w-full object-cover opacity-85"
                                />
                                <div className="absolute inset-0 bg-black/30" />

                                {sliderData.length > 0 && sliderData[index] && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white sm:px-8 md:px-12">
                                        <motion.h1
                                            className="mb-2 max-w-xs px-4 text-2xl font-bold opacity-100 sm:mb-3 sm:max-w-md sm:px-0 sm:text-3xl md:mb-4 md:max-w-2xl md:text-4xl lg:text-5xl xl:text-6xl"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.8 }}
                                        >
                                            {sliderData[index].name}
                                        </motion.h1>
                                        <motion.p
                                            className="mb-4 max-w-xs px-4 text-sm opacity-100 sm:mb-6 sm:max-w-md sm:px-0 sm:text-base md:mb-8 md:max-w-xl md:text-lg lg:text-xl"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                duration: 0.8,
                                                delay: 0.2,
                                            }}
                                        >
                                            {sliderData[index].description}
                                        </motion.p>
                                    </div>
                                )}

                                {sliderData.length === 0 && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white sm:px-8 md:px-12">
                                        <motion.h1
                                            className="mb-2 max-w-xs px-4 text-2xl font-bold opacity-100 sm:mb-3 sm:max-w-md sm:px-0 sm:text-3xl md:mb-4 md:max-w-2xl md:text-4xl lg:text-5xl xl:text-6xl"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.8 }}
                                        >
                                            Your Premier Sports Hub
                                        </motion.h1>
                                        <motion.p
                                            className="mb-4 max-w-xs px-4 text-sm opacity-100 sm:mb-6 sm:max-w-md sm:px-0 sm:text-base md:mb-8 md:max-w-xl md:text-lg lg:text-xl"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                duration: 0.8,
                                                delay: 0.2,
                                            }}
                                        >
                                            Sportsclaus gives Live scores,
                                            in-depth stats, and the latest news
                                            from around the world.
                                        </motion.p>
                                    </div>
                                )}
                            </div>
                        ))}

                        <button
                            onClick={prevSlide}
                            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/20 p-1 text-white transition-all duration-300 hover:bg-white/40 sm:left-4 sm:p-2"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft size={20} className="sm:h-6 sm:w-6" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/20 p-1 text-white transition-all duration-300 hover:bg-white/40 sm:right-4 sm:p-2"
                            aria-label="Next slide"
                        >
                            <ChevronRight size={20} className="sm:h-6 sm:w-6" />
                        </button>

                        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 space-x-2 sm:bottom-6">
                            {sliderImages.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`h-2 w-2 rounded-full transition-all duration-300 sm:h-3 sm:w-3 ${
                                        index === currentSlide
                                            ? "scale-125 bg-white"
                                            : "bg-white/50"
                                    }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </section> */}

                <Cricket />
                <Football />
            </div>
        </>
    )
}

export default Home
