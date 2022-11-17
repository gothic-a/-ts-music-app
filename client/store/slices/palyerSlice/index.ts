import { createSlice } from "@reduxjs/toolkit";
import type { PlayerSliceInitialState, PlayerAction } from "../../../types/player";
import type { ExtendedTrack, Track } from "../../../types/track";
import type { PayloadAction } from "@reduxjs/toolkit";
import convertSecToMin from "../../../utils/convertSecToMin";

const initialState: PlayerSliceInitialState = {
    track: null,
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
    }
})

export const { 
    setTrack,
    setCurrent,
    setPlaying,
    setVolume
} = playerSlice.actions

export default playerSlice.reducer