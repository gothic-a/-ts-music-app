import { PayloadAction } from "@reduxjs/toolkit"
import { ExtendedTrack } from "./track"

export interface PlayerSliceInitialState {
    track: ExtendedTrack
    playing: boolean
    current: number
    volume: number
} 

export type PlayerAction = <P>(state: PlayerSliceInitialState, action: PayloadAction<P>) => void