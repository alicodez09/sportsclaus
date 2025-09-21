import React from "react"
import Sportsclasus from "../assets/Sportsclaus.jpeg"
import { Link, NavLink, useLocation } from "react-router-dom"
import {
    Zap,
    Share2,
    Instagram,
    Facebook,
    Youtube,
    Twitter,
} from "lucide-react"

const Footer: React.FC = () => {
    const location = useLocation()

    return (
        <footer className="bg-blue-900 px-4 py-8 text-white md:px-8 md:py-10">
            <div className="mx-auto max-w-6xl">
                <div className="mb-6 flex flex-col items-center justify-between gap-6 md:mb-8 md:flex-row md:items-start md:gap-8">
                    {/* Logo and Brand */}
                    <div className="text-center md:text-left">
                        <Link
                            to="/"
                            className="flex items-center justify-center space-x-2 md:justify-start"
                        >
                            <img
                                src={Sportsclasus}
                                alt="Sportsclaus Logo"
                                className="h-20 w-20 rounded-full object-cover md:h-32 md:w-32"
                            />
                        </Link>
                    </div>

                    {/* Quick Links */}
                    <div className="text-center md:text-left">
                        <h3 className="mb-3 flex items-center justify-center text-lg font-bold md:mb-4 md:justify-start md:text-xl">
                            <span className="mr-2 rounded-lg bg-blue-500 p-1 md:mr-3 md:p-2">
                                <Zap className="h-4 w-4 md:h-6 md:w-6" />
                            </span>
                            QUICK LINKS
                        </h3>
                        <nav className="flex flex-col items-center space-y-2 md:items-start md:space-y-4">
                            <NavLink
                                to="/"
                                className="text-sm transition-colors duration-300 hover:text-blue-300 md:text-base"
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/cricket"
                                className="text-sm transition-colors duration-300 hover:text-blue-300 md:text-base"
                            >
                                Cricket
                            </NavLink>
                            <NavLink
                                to="/football"
                                className="text-sm transition-colors duration-300 hover:text-blue-300 md:text-base"
                            >
                                Football
                            </NavLink>
                            <NavLink
                                to="/kabaddi"
                                className="text-sm transition-colors duration-300 hover:text-blue-300 md:text-base"
                            >
                                Kabaddi
                            </NavLink>
                        </nav>
                    </div>

                    {/* Social Links */}
                    <div className="text-center md:text-left">
                        <h3 className="mb-3 flex items-center justify-center text-lg font-bold md:mb-4 md:justify-start md:text-xl">
                            <span className="mr-2 rounded-lg bg-purple-500 p-1 md:mr-3 md:p-2">
                                <Share2 className="h-4 w-4 md:h-6 md:w-6" />
                            </span>
                            SOCIAL LINKS
                        </h3>
                        <div className="flex justify-center space-x-4 md:justify-start md:space-x-6">
                            <a
                                href="https://www.instagram.com/sportsclaus/"
                                aria-label="Instagram"
                                target="_blank"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 transition-transform duration-300 hover:scale-110 md:h-12 md:w-12"
                            >
                                <Instagram className="h-4 w-4 md:h-6 md:w-6" />
                            </a>
                            <a
                                href="https://www.facebook.com/sportsclaus"
                                aria-label="Facebook"
                                target="_blank"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 transition-transform duration-300 hover:scale-110 md:h-12 md:w-12"
                            >
                                <Facebook className="h-4 w-4 md:h-6 md:w-6" />
                            </a>
                            <a
                                href="https://youtube.com/@sportsclaus?si=OEOFfxo-SFDfTod9"
                                aria-label="YouTube"
                                target="_blank"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 transition-transform duration-300 hover:scale-110 md:h-12 md:w-12"
                            >
                                <Youtube className="h-4 w-4 md:h-6 md:w-6" />
                            </a>
                            <a
                                href="https://x.com/sportsclaus?s=21"
                                aria-label="Twitter"
                                target="_blank"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-black transition-transform duration-300 hover:scale-110 md:h-12 md:w-12"
                            >
                                <Twitter className="h-4 w-4 md:h-6 md:w-6" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="my-4 border-t border-gray-700 md:my-6"></div>

                {/* Bottom Section */}
                <div className="flex flex-col items-center justify-between gap-3 text-xs text-gray-400 md:flex-row md:gap-4 md:text-sm">
                    <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                        {/* <a
                            href="/privacy-policy"
                            className="transition-colors duration-300 hover:text-white hover:underline"
                        >
                            Privacy Policy
                        </a>
                        <span>•</span>
                        <a
                            href="/cookie-policy"
                            className="transition-colors duration-300 hover:text-white hover:underline"
                        >
                            Cookie Policy
                        </a>
                        <span>•</span>
                        <a
                            href="/licensed-images"
                            className="transition-colors duration-300 hover:text-white hover:underline"
                        >
                            Licensed Images
                        </a> */}
                    </div>
                    <div className="text-center md:text-right">
                        © {new Date().getFullYear()} SportsClaus. All rights
                        reserved.
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
