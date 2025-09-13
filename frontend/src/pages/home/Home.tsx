"use client"

import { useState, useEffect, useRef } from "react"
import {
    ChevronLeft,
    ChevronRight,
    Eye,
    Heart,
    InstagramIcon,
} from "lucide-react"
import { motion, useAnimation } from "framer-motion"
import shoppingMall from "./shopping_mall.jpg"
import clothes from "./clothes.jpg"
import online from "./online.jpg"
import Cricket from "../cricket/Cricket"

const Home = () => {
    // State for the image slider
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const controls = useAnimation()
    const containerRef = useRef(null)

    const sliderImages = [shoppingMall, online, clothes]

    // Metric cards data
    const metricCards = [
        {
            id: 1,
            value: "74M+",
            description: "Followers on",
            subdescription: "@433 Instagram",
            icon: InstagramIcon,
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
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-6">
            {/* Hero Section with Slider */}
            <section className="relative mb-12 h-[550px] overflow-hidden">
                <div className="relative h-full w-full">
                    {sliderImages.map((image, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 overflow-hidden rounded-2xl shadow-lg transition-opacity duration-1000 ${
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
                        </div>
                    ))}

                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-white">
                        <motion.h1
                            className="mb-4 text-4xl font-bold opacity-100 md:text-6xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            Your Premier Sports Hub
                        </motion.h1>
                        <motion.p
                            className="mb-8 max-w-2xl text-xl opacity-100 md:text-2xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Sportsclaus gives Live scores, in-depth stats, and
                            the latest news from around the world.
                        </motion.p>
                    </div>

                    {/* Slider Navigation */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white transition-all duration-300 hover:bg-white/40"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white transition-all duration-300 hover:bg-white/40"
                        aria-label="Next slide"
                    >
                        <ChevronRight size={24} />
                    </button>

                    {/* Slider Indicators */}
                    <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 space-x-2">
                        {sliderImages.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                                    index === currentSlide
                                        ? "scale-125 bg-white"
                                        : "bg-white/50"
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Animated Metrics Cards Section */}
            <section
                className="relative overflow-hidden rounded-2xl"
                ref={containerRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className="relative">
                    <motion.div
                        className="flex gap-6 whitespace-nowrap"
                        animate={controls}
                    >
                        {/* First set of cards */}
                        {metricCards.map((card) => (
                            <motion.div
                                key={`first-${card.id}`}
                                className={`h-48 w-80 flex-shrink-0 ${card.bgColor} ${card.textColor} relative flex flex-col justify-between overflow-hidden rounded-2xl p-6`}
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <div className="mb-2 text-4xl font-bold">
                                            {card.value}
                                        </div>
                                        <div className="text-sm opacity-80">
                                            {card.description}
                                        </div>
                                        <div className="text-sm opacity-80">
                                            {card.subdescription}
                                        </div>
                                    </div>
                                    {card.icon && (
                                        <div className="opacity-60">
                                            <card.icon size={24} />
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}

                        {/* Duplicate set for seamless loop */}
                        {metricCards.map((card) => (
                            <motion.div
                                key={`second-${card.id}`}
                                className={`h-48 w-80 flex-shrink-0 ${card.bgColor} ${card.textColor} relative flex flex-col justify-between overflow-hidden rounded-2xl p-6`}
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <div className="mb-2 text-4xl font-bold">
                                            {card.value}
                                        </div>
                                        <div className="text-sm opacity-80">
                                            {card.description}
                                        </div>
                                        <div className="text-sm opacity-80">
                                            {card.subdescription}
                                        </div>
                                    </div>
                                    {card.icon && (
                                        <div className="opacity-60">
                                            <card.icon size={24} />
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
            <Cricket />
        </div>
    )
}

export default Home
