import React, { useState } from "react"
import { toast } from "react-hot-toast"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const userTypeOptions = [
    "Seller",
    "Graphic designer",
    "Full stack developer",
    "Web developer",
    "Mobile developer",
    "Data analyst",
    "Data scientist",
    "Software engineer",
    "Project manager",
    "Business analyst",
]

const Register: React.FC = () => {
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [user_type, setUserType] = useState<string>("Seller")
    const [description, setDescription] = useState<string>("")
    const [linkedin, setLinkedin] = useState<string>("")
    const [portfolio, setPortfolio] = useState<string>("")
    const navigate = useNavigate()
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email || !password || !name) {
            setError("Please fill in all required fields")
            return
        }

        // Prepare user_type_data object based on user_type
        const user_type_data =
            user_type !== "Seller"
                ? {
                      description,
                      linkedin,
                      portfolio,
                  }
                : null

        try {
            const response = await axios.post(
                `http://localhost:8082/api/v1/auth/register`,

                {
                    name,
                    email,
                    password,
                    phone,
                },
            )

            if (response.data.success) {
                toast.success("Register successful!")
                navigate("/login")
            } else {
                toast.error("Registration failed, please try again.")
            }
        } catch (err) {
            console.error("Error registering:", err)
            toast.error("An error occurred, please try again later.")
        }

        setError(null)
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-lg">
                <h2 className="text-center text-2xl font-bold text-gray-800">
                    Register
                </h2>

                {error && (
                    <div className="text-center text-red-500">{error}</div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-2 w-full rounded-md border border-gray-300 p-2 text-gray-800"
                            required
                            placeholder="Name"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-2 w-full rounded-md border border-gray-300 p-2 text-gray-800"
                            required
                            placeholder="Email"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-2 w-full rounded-md border border-gray-300 p-2 text-gray-800"
                            required
                            placeholder="Password"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <input
                            id="phone"
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="mt-2 w-full rounded-md border border-gray-300 p-2 text-gray-800"
                            required
                            placeholder="Phone"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-md bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
                    >
                        Register
                    </button>
                </form>

                <div className="mt-4 text-center text-sm text-gray-600">
                    Have an account?{" "}
                    <a
                        href="/login"
                        className="text-blue-500 hover:text-blue-700"
                    >
                        Login
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Register
