import Footer from "@/components/footer"
import LatestCricket from "../cricket/components/LatestCricket"
import LatestFootball from "../football/components/LatestFootball"
import LatestKabaddi from "../kabaddi/components/LatestKabaddi"

const Home = () => {
    return (
        <>
            <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-4 sm:p-6">
                <LatestCricket />
                <LatestFootball />
                <LatestKabaddi />
            </div>
            <Footer />
        </>
    )
}

export default Home
