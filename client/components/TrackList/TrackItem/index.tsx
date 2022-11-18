import React from "react"
import type { Track } from "../../../types/track"
import { CaretRightOutlined, EyeOutlined, SoundOutlined } from "@ant-design/icons"
import { Typography } from "antd"
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from "../../../hooks"
import useHandleAudio from "../../../hooks/useHandleAudio"
import { setTrack } from "../../../store/slices/palyerSlice"
import formatStatic from "../../../utils/formatStatic"
import cn from 'classnames'
import { addListenThunk } from "../../../store/slices/tracksSlice"

const { Text } = Typography

const TrackItem = (track: Track): JSX.Element => {
    const { name, _id, artist, listens, image } = track
    const { track: activeTrack, playing } = useAppSelector(state => state.player)

    const dispatch = useAppDispatch()

    const { 
        handlePause,
        handlePlay
    } = useHandleAudio()

    const isThisActiveTrack = activeTrack?._id === _id
    const isThisTrackPlaying = playing && isThisActiveTrack

    const handleSetPlaying = () => {
        if(isThisActiveTrack) {
            if(playing) handlePause()
            else handlePlay() 
        } else {
            dispatch(setTrack(track))
            dispatch(addListenThunk({ _id }))
        }
    }

    return (
        <div className="bg-[#1f1f1f] py-3 pl-24 pr-6 rounded-xl flex justify-between relative">
            <div className="flex h-max mr-4 absolute left-0 top-0">
                <Image 
                    width="72"
                    height="72"
                    src={formatStatic(image)}
                    className="rounded-l-xl"
                    objectFit="contain"
                />
            </div>
            <div className="flex">
                <div className="rounded-full bg-[#141414] w-12 h-12 flex items-center justify-center">
                    {
                        React.createElement(isThisTrackPlaying ? SoundOutlined : CaretRightOutlined, {
                            className: cn(
                                'text-2xl leading-4 text-[#177ddc]',
                                isThisTrackPlaying && 'animate-pulse'
                            ),
                            onClick: handleSetPlaying
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