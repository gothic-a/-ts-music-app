import React, { useState, useDeferredValue } from "react"
import type { Track } from "../../../types/track"
import { CaretRightOutlined, PauseOutlined, LoadingOutlined, EyeOutlined } from "@ant-design/icons"
import { Slider, Typography } from "antd"
import Image from 'next/image'

const current = 123

const { Text } = Typography

const TrackItem = ({ 
    _id, 
    name, 
    artist, 
    listens, 
    image, 
    audio, 
    comments,
    duration
}: Track): JSX.Element => {
    const [playing, setPlaying] = useState<boolean>(false)

    return (
        <div className="bg-[#1f1f1f] py-3 pl-24 pr-6 rounded-xl flex justify-between relative">
            <div className="flex h-max mr-4 absolute left-0 top-0">
                <Image 
                    width="72"
                    height="72"
                    src={image}
                    className="rounded-l-xl"
                />
            </div>
            <div className="flex">
                <div className="rounded-full bg-[#141414] w-12 h-12 flex items-center justify-center">
                    {
                        React.createElement(playing ? LoadingOutlined : CaretRightOutlined, {
                            className: 'text-2xl leading-4 text-[#177ddc]',
                            onClick: () => setPlaying(state => !state)
                        })
                    }
                </div>
                <div className="flex flex-col ml-8 justify-between text-base">
                    <Text>{artist}</Text>
                    <Text>{name}</Text>
                </div>
            </div>
            <div className="flex flex-col items-center justify-around bg-[#141414] px-6 pb-1 rounded-r-xl absolute right-0 top-0 h-full">
                <EyeOutlined className="text-xl"/>
                <Text>{listens}</Text>
            </div>
        </div>
    )
}

export default TrackItem