import AnaylsisCricket from "./components/AnaylsisCricket"
import LatestCricket from "./components/LatestCricket"
import OpinionCricket from "./components/OpinionCricket"
import PlayerBanner from "./components/PlayerBanner"

const Cricket = () => {
    return (
        <div className="min-h-screen bg-white">
            <PlayerBanner />

            <LatestCricket />
            <OpinionCricket />
            <AnaylsisCricket/>
        </div>
    )
}

export default Cricket
