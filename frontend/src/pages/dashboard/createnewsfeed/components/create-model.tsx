import type React from "react"
import { useState, useEffect } from "react"
import type { Field, DataItem } from "./data-table"
import axios from "axios"
import { CloudinaryUpload } from "@/components/CloudinaryUpload"
// import { CustomRichTextEditor } from "@/components/CustomRichTextEditor"
import RichTextEditor from "@/components/RichTextEditor"

interface CreateModalProps {
    isOpen: boolean
    onClose: () => void
    fields: Field[]
    data: DataItem
    onRefresh?: () => void
}

export default function CreateModal({
    isOpen,
    onClose,
    fields,
    data,
    onRefresh,
}: CreateModalProps) {
    const [formData, setFormData] = useState<any>({})
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [categories, setCategories] = useState<any[]>([
        { id: 1, name: "Cricket", slug: "Cricket" },
        { id: 2, name: "Football", slug: "Football" },
        { id: 3, name: "Kabaddi", slug: "Kabaddi" },
    ])
    const [type, setType] = useState<any[]>([
        { id: 1, name: "latestnews", slug: "latestnews" },
        { id: 2, name: "match_analysis", slug: "match_analysis" },
        { id: 3, name: "opinion", slug: "opinion" },
    ])
    const [status, setStatus] = useState<any[]>([
        { id: 1, name: "publish", slug: "publish" },
        { id: 2, name: "draft", slug: "draft" },
    ])

    useEffect(() => {
        const initialData: Record<string, any> = {}
        fields.forEach((field) => {
            initialData[field.name] =
                data[field.name] || (field.type === "image" ? [] : "")
        })
        setFormData(initialData)
    }, [data, fields])

    const handleChange = (fieldName: string, value: any) => {
        setFormData((prev: any) => ({
            ...prev,
            [fieldName]: value,
        }))

        if (errors[fieldName]) {
            setErrors((prev) => {
                const newErrors = { ...prev }
                delete newErrors[fieldName]
                return newErrors
            })
        }
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        fields.forEach((field) => {
            if (field.required && !formData[field.name]) {
                newErrors[field.name] = `${field.label} is required`
            }

            if (
                field.required &&
                field.type === "image" &&
                formData[field.name]?.length === 0
            ) {
                newErrors[field.name] = `${field.label} is required`
            }

            if (
                field.required &&
                field.type === "textarea" &&
                (!formData[field.name] ||
                    formData[field.name].trim() === "" ||
                    formData[field.name] === "<p><br></p>")
            ) {
                newErrors[field.name] = `${field.label} is required`
            }

            if (field.type === "email" && formData[field.name]) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                if (!emailRegex.test(formData[field.name])) {
                    newErrors[field.name] = "Please enter a valid email address"
                }
            }

            if (field.type === "number" && formData[field.name]) {
                if (isNaN(Number(formData[field.name]))) {
                    newErrors[field.name] = "Please enter a valid number"
                }
            }
        })

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (validateForm()) {
            const response = await axios.post(
                `https://events.alltheapps.io/v1/integration_web/CreateNews`,
                formData,
            )
            if (response.data.success) {
                onClose()
                if (onRefresh) onRefresh()
            }
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="flex max-h-[90vh] w-full max-w-4xl flex-col rounded-lg bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-gray-200 p-6">
                    <h3 className="text-lg font-medium text-gray-900">
                        Create Newsfeed
                    </h3>
                    <button
                        onClick={onClose}
                        className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    >
                        ❌
                    </button>
                </div>

                {/* Scrollable content area */}
                <div className="flex-grow overflow-y-auto px-6 py-4">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            {fields.map((field) => (
                                <div key={field.name} className="space-y-1">
                                    <label
                                        htmlFor={field.name}
                                        style={{ color: "black" }}
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        {field.label}{" "}
                                        {field.required && (
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        )}
                                    </label>

                                    {field.name === "category" ? (
                                        <select
                                            id={field.name}
                                            name={field.name}
                                            style={{ color: "black" }}
                                            value={formData[field.name] || ""}
                                            onChange={(e) =>
                                                handleChange(
                                                    field.name,
                                                    e.target.value,
                                                )
                                            }
                                            className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm ${
                                                errors[field.name]
                                                    ? "border-red-500"
                                                    : "border-gray-300"
                                            }`}
                                        >
                                            <option value="">
                                                Select {field.label}
                                            </option>
                                            {categories.map((category) => (
                                                <option
                                                    key={category._id}
                                                    value={category._id}
                                                >
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                    ) : field.type === "date" ? (
                                        <input
                                            type="date"
                                            id={field.name}
                                            name={field.name}
                                            style={{ color: "black" }}
                                            value={
                                                formData[field.name]
                                                    ? new Date(
                                                          formData[field.name],
                                                      )
                                                          .toISOString()
                                                          .split("T")[0]
                                                    : ""
                                            }
                                            onChange={(e) =>
                                                handleChange(
                                                    field.name,
                                                    e.target.value,
                                                )
                                            }
                                            className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm ${
                                                errors[field.name]
                                                    ? "border-red-500"
                                                    : "border-gray-300"
                                            }`}
                                        />
                                    ) : field.name === "status" ? (
                                        <select
                                            id={field.name}
                                            name={field.name}
                                            style={{ color: "black" }}
                                            value={formData[field.name] || ""}
                                            onChange={(e) =>
                                                handleChange(
                                                    field.name,
                                                    e.target.value,
                                                )
                                            }
                                            className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm ${
                                                errors[field.name]
                                                    ? "border-red-500"
                                                    : "border-gray-300"
                                            }`}
                                        >
                                            <option value="">
                                                Select {field.label}
                                            </option>
                                            {status.map((category) => (
                                                <option
                                                    key={category._id}
                                                    value={category._id}
                                                >
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                    ) : field.name === "type" ? (
                                        <select
                                            id={field.name}
                                            name={field.name}
                                            style={{ color: "black" }}
                                            value={formData[field.name] || ""}
                                            onChange={(e) =>
                                                handleChange(
                                                    field.name,
                                                    e.target.value,
                                                )
                                            }
                                            className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm ${
                                                errors[field.name]
                                                    ? "border-red-500"
                                                    : "border-gray-300"
                                            }`}
                                        >
                                            <option value="">
                                                Select {field.label}
                                            </option>
                                            {type.map((category) => (
                                                <option
                                                    key={category._id}
                                                    value={category._id}
                                                >
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                    ) : field.type === "textarea" ? (
                                        <div>
                                            <div
                                                className={`mt-1 ${errors[field.name] ? "rounded-md border border-red-500" : ""}`}
                                            >
                                                <RichTextEditor
                                                    value={
                                                        formData[field.name] ||
                                                        ""
                                                    }
                                                    onChange={(value) =>
                                                        handleChange(
                                                            field.name,
                                                            value,
                                                        )
                                                    }
                                                    placeholder={`Enter ${field.label}...`}
                                                    name={field.name}
                                                    id={field.name}
                                                />
                                            </div>
                                        </div>
                                    ) : field.type === "image" ? (
                                        <>
                                            <CloudinaryUpload
                                                onUploadSuccess={(urls) =>
                                                    handleChange(
                                                        field.name,
                                                        urls,
                                                    )
                                                }
                                                multiple={false}
                                            />
                                        </>
                                    ) : (
                                        <input
                                            type={
                                                field.type === "number"
                                                    ? "number"
                                                    : field.type === "email"
                                                      ? "email"
                                                      : "text"
                                            }
                                            id={field.name}
                                            name={field.name}
                                            style={{ color: "black" }}
                                            value={formData[field.name] || ""}
                                            onChange={(e) =>
                                                handleChange(
                                                    field.name,
                                                    e.target.value,
                                                )
                                            }
                                            className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm ${
                                                errors[field.name]
                                                    ? "border-red-500"
                                                    : "border-gray-300"
                                            }`}
                                        />
                                    )}

                                    {errors[field.name] && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors[field.name]}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Fixed button container at the bottom */}
                        <div className="sticky -bottom-3 z-50 mt-6 flex justify-end space-x-3 border-t border-gray-200 bg-white  pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
