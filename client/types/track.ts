import { ErrorType } from "../utils/parseError"

export interface Comment {
    _id: string,
    username: string,
    text: string,
    trackId: string,
    userId?: string 
}

export interface Track {
    _id: string,
    name: string,
    artist: string,
    text?: string,
    listens: number,
    image: string,
    audio: string,
    comments?: Comment[],
    duration: 145,
    convertedDuration: string
}

export interface TracksSliceInitialState {
    data: Track[] | null,
    limit: number,
    page: number | null,
    error: ErrorType | null,
    loading: boolean
} 

export interface GetTracksThunkProps {
    page: number
}

