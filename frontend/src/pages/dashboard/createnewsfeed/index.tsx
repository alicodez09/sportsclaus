import { useEffect, useState } from "react"
import DataTable, { type Field, type DataItem } from "./components/data-table"
import axios from "axios"
import { Sidebar } from "@/components/sidebar"

const newsFields: Field[] = [
    { name: "category", label: "Category", type: "select", required: true },
    { name: "type", label: "Type", type: "select", required: true },
    { name: "status", label: "Status", type: "select", required: true },

    { name: "name", label: "Name", type: "text", required: true },
    { name: "priority", label: "Priority", type: "number", required: true },

    {
        name: "description",
        label: "Description",
        type: "textarea",
        required: true,
    },
    { name: "image", label: "Image", type: "image" },
]

export default function createnewsfeed() {
    const [newsData, setNewsData] = useState<DataItem[]>([])

    const getData = async () => {
        try {
            const response = await axios.get(
                `https://events.alltheapps.io/v1/integration_web/GetNews`,
            )
            console.log(response.data, "response.data")
            setNewsData(response.data.data)
        } catch (error) {
            console.error("Error fetching newsfeed:", error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const handleRefresh = () => {
        getData()
    }

    const handleUpdate = (id: string, updatedData: any) => {
        setNewsData((prevData) =>
            prevData.map((item) => (item.id === id ? updatedData : item)),
        )
    }

    const handleDelete = (id: string) => {
        setNewsData((prevData) => prevData.filter((item) => item.id !== id))
    }

    return (
        <Sidebar>
            <div
                className="p-6"
                style={{ backgroundColor: "#fff", height: "100vh" }}
            >
                <h1 className="mb-6 text-2xl font-bold text-black">
                    Newsfeed Management
                </h1>

                <DataTable
                    modelName="News Items"
                    fields={newsFields}
                    data={newsData}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                    onRefresh={handleRefresh} // 👈 pass refresh handler
                />
            </div>
        </Sidebar>
    )
}
