import { useAppSelector } from "../../hooks"
import { useMemo } from "react"
import TrackItem from "./TrackItem"

const TrackList = (): JSX.Element => {
    const { data } = useAppSelector(state => state.tracks)

    const tracksList = useMemo(() => (
        data && data.map(t => (
            <TrackItem 
                key={t._id}
                {...t}
            />
        ))
    ), [data])

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {
                tracksList
            }
        </div>
    )
}

export default TrackList