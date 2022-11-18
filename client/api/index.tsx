import axios from "axios";
import type { AxiosPromise } from "axios";
import type { Track } from "../types/track";
import type { OnUploadProgress, SetProgress, GetTracksProps } from "../types/api";

const apiDomain = 'http://localhost:5001/api'

const api = axios.create({
    baseURL: apiDomain
})

const onUploadProgress: OnUploadProgress = (cb) => (progressEvent) => cb(progressEvent.progress * 100)

export const uploadTrack = (data: FormData, setProgress: SetProgress): AxiosPromise<Track> => {
    return api.post('/tracks/create', data, { onUploadProgress: onUploadProgress(setProgress) })
}

export const getTracks = ({ page, limit, query }: GetTracksProps): AxiosPromise<Track[]> => {
    return api.get(`/tracks?page=${page}&limit=${limit}${query ? `&query=${query}` : ''}`)
}

