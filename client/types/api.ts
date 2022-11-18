import { AxiosProgressEvent } from "axios"

export type SetProgress = (progress: number) => void
export type OnUploadProgress = (cb: SetProgress) => (progressEvent: AxiosProgressEvent) => ReturnType<SetProgress>

export interface GetTracksProps {
    page: number
    limit: number
    query?: string
}