import { createSlice } from "@reduxjs/toolkit";
import type { PlayerSliceInitialState } from "../../../types/player";
import type { ExtendedTrack, Track } from "../../../types/track";
import type { PayloadAction } from "@reduxjs/toolkit";
import convertSecToMin from "../../../utils/convertSecToMin";

const initialState: PlayerSliceInitialState = {
    track: {
        _id: '1',
        name: 'Slim shady',
        artist: 'Eminem',
        listens: 1,
        image: 'http://localhost:5001/image/R-8607118-1465145735-5759.jpg-fff003b4-52db-4c0f-9446-93673517c048.jpg',
        audio: 'http://localhost:5001/audio/%D0%93%D1%80%D0%B0%D0%B6%D0%B4%D0%B0%D0%BD%D1%81%D0%BA%D0%B0%D1%8F%20%D0%9E%D0%B1%D0%BE%D1%80%D0%BE%D0%BD%D0%B0%20-%20%D0%A1%D0%BB%D0%B5%D0%B4%D1%8B%20%D0%BD%D0%B0%20%D1%81%D0%BD%D0%B5%D0%B3%D1%83%20(mp3store.cc).mp3-eaed0b5f-c891-4e38-873e-b849b15a0bf3.mp3',
        comments: [],
        duration: 145,
        convertedDuration: convertSecToMin(145)
    },
    playing: false,
    current: 0,
    volume: 50
}

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setTrack: (state, { payload }: PayloadAction<Track>) => {
            const extendedTrack: ExtendedTrack = {
                ...payload,
                convertedDuration: convertSecToMin(payload.duration) 
            }
            
            state.track = extendedTrack
        },
        setCurrent: (state, action: PayloadAction<number>) => void(state.current = action.payload),
        setPlaying: (state, action: PayloadAction<boolean>) => void(state.playing = action.payload),
        setVolume: (state, action: PayloadAction<number>) => void(state.volume = action.payload)
    },
})

export const { 
    setTrack,
    setCurrent,
    setPlaying,
    setVolume
} = playerSlice.actions

export default playerSlice.reducer