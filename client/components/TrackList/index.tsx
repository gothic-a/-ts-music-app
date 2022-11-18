import { Track } from "../../types/track"
import { useAppSelector } from "../../hooks"
import { useMemo } from "react"
import TrackItem from "./TrackItem"

const tracks: Track[] = [
    {
        _id: '1',
        name: 'Slim shady',
        artist: 'Eminem',
        listens: 1,
        image: 'http://localhost:5001/image/R-8607118-1465145735-5759.jpg-fff003b4-52db-4c0f-9446-93673517c048.jpg',
        audio: 'http://localhost:5001/audio/%D0%93%D1%80%D0%B0%D0%B6%D0%B4%D0%B0%D0%BD%D1%81%D0%BA%D0%B0%D1%8F%20%D0%9E%D0%B1%D0%BE%D1%80%D0%BE%D0%BD%D0%B0%20-%20%D0%A1%D0%BB%D0%B5%D0%B4%D1%8B%20%D0%BD%D0%B0%20%D1%81%D0%BD%D0%B5%D0%B3%D1%83%20(mp3store.cc).mp3-eaed0b5f-c891-4e38-873e-b849b15a0bf3.mp3',
        comments: [],
        duration: 145,
    },
    {
        _id: '2',
        name: 'Slim shady',
        artist: 'Eminem',
        listens: 1,
        image: 'http://localhost:5001/image/R-8607118-1465145735-5759.jpg-fff003b4-52db-4c0f-9446-93673517c048.jpg',
        audio: 'http://localhost:5001/audio/%D0%93%D1%80%D0%B0%D0%B6%D0%B4%D0%B0%D0%BD%D1%81%D0%BA%D0%B0%D1%8F%20%D0%9E%D0%B1%D0%BE%D1%80%D0%BE%D0%BD%D0%B0%20-%20%D0%A1%D0%BB%D0%B5%D0%B4%D1%8B%20%D0%BD%D0%B0%20%D1%81%D0%BD%D0%B5%D0%B3%D1%83%20(mp3store.cc).mp3-eaed0b5f-c891-4e38-873e-b849b15a0bf3.mp3',
        comments: [],
        duration: 145,
    },
    {
        _id: '3',
        name: 'Slim shady',
        artist: 'Eminem',
        listens: 1,
        image: 'http://localhost:5001/image/R-8607118-1465145735-5759.jpg-fff003b4-52db-4c0f-9446-93673517c048.jpg',
        audio: 'http://localhost:5001/audio/%D0%93%D1%80%D0%B0%D0%B6%D0%B4%D0%B0%D0%BD%D1%81%D0%BA%D0%B0%D1%8F%20%D0%9E%D0%B1%D0%BE%D1%80%D0%BE%D0%BD%D0%B0%20-%20%D0%A1%D0%BB%D0%B5%D0%B4%D1%8B%20%D0%BD%D0%B0%20%D1%81%D0%BD%D0%B5%D0%B3%D1%83%20(mp3store.cc).mp3-eaed0b5f-c891-4e38-873e-b849b15a0bf3.mp3',
        comments: [],
        duration: 145,
    }
]

const TrackList = (): JSX.Element => {
    const tracksList = useMemo(() => (
        tracks.map(t => (
            <TrackItem 
                key={t._id}
                _id={t._id}
                name={t.name}
                artist={t.artist}
                listens={t.listens}
                image={t.image}
                audio={t.audio}
                comments={t.comments}
                duration={t.duration}
            />
        ))
    ), [tracks])

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {
                tracksList
            }
        </div>
    )
}

export default TrackList