import React, { useCallback} from "react"
import TrackTimeLine from "./TrackTimeLine"
import VolumeTimeLine from "./VolumeTimeLine"
import TrackImage from "./TrackImage"
import TrackPlayButton from "./TrackPlayButton"
import { useAppSelector } from "../../hooks"
import useHandleAudio from "../../hooks/useHandleAudio"


const Player = (): JSX.Element => {
    const { playing, current, volume, track } = useAppSelector(state => state.player)

    const { 
        handlePlay,
        handlePause,
        handleVolumeChange,
        handleCurrentTime,
        handleSetDisableAudioSettingCurrent
    } = useHandleAudio(track?.audio)


    const handlePlayClick = useCallback((): void => {
        if(playing) handlePause()
        else handlePlay()
    }, [playing])

    const handleTimelineChange = useCallback((): void => handleSetDisableAudioSettingCurrent(true), [])
    const handleTimelineAfterChange = useCallback((value): void => {
        handleCurrentTime(value)
        handleSetDisableAudioSettingCurrent(false)
    }, [])

    const handleChangeVolume = useCallback((value: number): void => handleVolumeChange(value / 100), []) 

    return (
        <div className="flex items-center w-full h-full">
            <TrackImage image={track.image}/>
            <TrackPlayButton 
                playing={playing}
                onPlayClick={handlePlayClick}
            />
            <div className="flex grow h-full py-1 ml-8 justify-between">
                <TrackTimeLine 
                    name={track.name}
                    artist={track.artist}
                    duration={track.duration}
                    convertedDuration={track.convertedDuration}
                    value={current}
                    onAfterChange={handleTimelineAfterChange}
                    onChange={handleTimelineChange}
                />
                <VolumeTimeLine 
                    value={volume}
                    onChange={handleChangeVolume}
                />
            </div>
        </div>
    )
}

export default Player