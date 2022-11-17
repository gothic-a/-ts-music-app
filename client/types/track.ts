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
}

export interface ExtendedTrack extends Track {
    convertedDuration: string
}