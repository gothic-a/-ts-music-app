import { useState, useEffect } from "react"
import { useAppDispatch } from "."
import { setCurrent, setVolume, setPlaying } from "../store/slices/palyerSlice"

export interface UseHandleAudioReturnedType {
    handlePlay: () => void 
    handlePause: () => void 
    handleVolumeChange: (volume: number) => void 
    handleCurrentTime: (value: number) => void 
    handleSetDisableAudioSettingCurrent: (value: boolean) => void
}

let audio: HTMLAudioElement

const useHandleAudio = (audioSrc?: string): UseHandleAudioReturnedType => {
    const [disableAudioSettingCurrent, setDisableAudioSettingCurrent] = useState<boolean>(false)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if(audio) {
            audio.ontimeupdate = () => {
                if(!disableAudioSettingCurrent) dispatch(setCurrent(audio.currentTime))
            }
        }
    }, [disableAudioSettingCurrent])

    useEffect(() => {
        if(!audio) {
            audio = new Audio()

            audio.onvolumechange = () => dispatch(setVolume(audio.volume * 100))
            audio.onplay = () => dispatch(setPlaying(true))
            audio.onpause = () => dispatch(setPlaying(false))
        } else if(audioSrc) {
            audio.src = audioSrc
            audio.play()
        }
    }, [audioSrc])

    const handlePlay = (): void => void(audio.play())
    const handlePause = (): void => void(audio.pause())
    const handleVolumeChange = (volume: number): void => void(audio.volume = volume)
    const handleCurrentTime = (value: number): void => void(audio.currentTime = value)
    const handleSetDisableAudioSettingCurrent = (value: boolean): void => setDisableAudioSettingCurrent(value)
    
    return {
        handlePlay,
        handlePause,
        handleVolumeChange,
        handleCurrentTime,
        handleSetDisableAudioSettingCurrent
    }
}

export default useHandleAudio