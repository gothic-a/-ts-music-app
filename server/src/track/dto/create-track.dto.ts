export interface CreateTrackDto {
    readonly name: string
    readonly artist: string
    readonly text?: string
    readonly duration: number
}

export interface CreateTrackFilesDto {
    readonly image: Express.Multer.File[]
    readonly audio: Express.Multer.File[]
}