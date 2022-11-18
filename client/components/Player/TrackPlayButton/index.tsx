import { PauseOutlined, CaretRightOutlined } from "@ant-design/icons"
import React from "react"

interface TrackPlayButtonProps {
    playing: boolean
    onPlayClick: () => void
}

const TrackPlayButton = ({ playing, onPlayClick }: TrackPlayButtonProps): JSX.Element => {
    return (
        <div className="rounded-full bg-[#1f1f1f] w-14 h-14 flex items-center justify-center">
            {
                React.createElement(playing ? PauseOutlined : CaretRightOutlined, {
                    className: 'text-3xl leading-4 text-[#177ddc]',
                    onClick: onPlayClick
                })
            }
        </div>
    )
}

export default React.memo(TrackPlayButton)