import { createSlice } from "@reduxjs/toolkit";
import type { PlayerSliceInitialState } from "../../../types/player";
import type { Track } from "../../../types/track";
import type { PayloadAction } from "@reduxjs/toolkit";

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
        setTrack: (state, { payload }: PayloadAction<Track>) => void(state.track = payload),
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