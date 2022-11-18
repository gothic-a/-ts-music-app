import { PayloadAction } from "@reduxjs/toolkit"
import { Track } from "./track"

export interface PlayerSliceInitialState {
    track: Track
    playing: boolean
    current: number
    volume: number
} 

export type PlayerAction = <P>(state: PlayerSliceInitialState, action: PayloadAction<P>) => void