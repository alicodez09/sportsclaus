import { useEffect, useState } from "react"
import DataTable, { type Field, type DataItem } from "./components/data-table"
import axios from "axios"
import { Sidebar } from "@/components/sidebar"

const newsFields: Field[] = [
    { name: "category", label: "Category", type: "select", required: true },
    { name: "rank", label: "Ranking", type: "select", required: true },
    { name: "type", label: "Game Type", type: "select", required: true },
    {
        name: "player_type",
        label: "Player Type",
        type: "select",
        required: true,
    },

    { name: "rating", label: "Rating", type: "text", required: true },

    { name: "name", label: "Player Name", type: "text", required: true },
    { name: "country", label: "Country", type: "select", required: true },
]

export default function createnewsfeed() {
    const [newsData, setNewsData] = useState<DataItem[]>([])

    const getData = async () => {
        try {
            const response = await axios.get(
                `https://events.alltheapps.io/api/v1/playerranking/get`,
            )
            setNewsData(response.data.data)
        } catch (error) {
            console.error("Error fetching banner:", error)
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
                    Player Ranking Management
                </h1>

                <DataTable
                    modelName="Player Ranking Items"
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
