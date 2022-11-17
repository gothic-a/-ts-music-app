import React, { useState, useCallback } from "react"
import { ExtendedTrack } from "../../types/track"
import convertSecToMin from "../../utils/convertSecToMin"
import { CaretRightOutlined, PauseOutlined } from "@ant-design/icons"
import Image from 'next/image'
import TrackTimeLine from "./TrackTimeLine"
import VolumeTimeLine from "./VolumeTimeLine"

const track: ExtendedTrack = {
    _id: '1',
    name: 'Slim shady',
    artist: 'Eminem',
    listens: 1,
    image: 'http://localhost:5001/image/R-8607118-1465145735-5759.jpg-fff003b4-52db-4c0f-9446-93673517c048.jpg',
    audio: 'http://localhost:5001/audio/%D0%93%D1%80%D0%B0%D0%B6%D0%B4%D0%B0%D0%BD%D1%81%D0%BA%D0%B0%D1%8F%20%D0%9E%D0%B1%D0%BE%D1%80%D0%BE%D0%BD%D0%B0%20-%20%D0%A1%D0%BB%D0%B5%D0%B4%D1%8B%20%D0%BD%D0%B0%20%D1%81%D0%BD%D0%B5%D0%B3%D1%83%20(mp3store.cc).mp3-eaed0b5f-c891-4e38-873e-b849b15a0bf3.mp3',
    comments: [],
    duration: 145,
    convertedDuration: convertSecToMin(145)
}

const Player = (): JSX.Element => {
    const [playing, setPlaying] = useState<boolean>(false)
    const [value, setValue] = useState<number>(0)
    const [volume, setVolume] = useState<number>(50)

    const handleAfterChange = useCallback(setValue, [])

    return (
        <div className="flex items-center w-full h-full">
            <div className="max-h-full mr-8">
                <Image 
                    width={78}
                    height={78}
                    src={track.image}
                />
            </div>
            <div className="rounded-full bg-[#1f1f1f] w-14 h-14 flex items-center justify-center">
                {
                    React.createElement(playing ? PauseOutlined : CaretRightOutlined, {
                        className: 'text-3xl leading-4 text-[#177ddc]',
                        onClick: () => setPlaying(state => !state)
                    })
                }
            </div>
            <div className="flex grow h-full py-1 ml-8 justify-between">
                <TrackTimeLine 
                    name={track.name}
                    artist={track.artist}
                    duration={track.duration}
                    convertedDuration={track.convertedDuration}
                    value={value}
                    onAfterChange={handleAfterChange}
                    disabled={!playing}
                />
                <VolumeTimeLine 
                    value={volume}
                    onChange={setVolume}
                />
            </div>
        </div>
    )
}

export default Player