import axios from "axios";

const apiDomain = 'http://localhost:5001/api'

const api = axios.create({
    baseURL: apiDomain
})

export const createTrack = (data) => {
    return api.post('/tracks/create', data)
}