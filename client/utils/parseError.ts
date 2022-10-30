import axios from 'axios'

export const parseError = (e: unknown) => {
    if(axios.isAxiosError(e)) {
        return {
            data: e.response.data, 
            status: e.response.status 
        }
    } else if(e instanceof Error) {
        return e.message
    }
}

export type ErrorType = ReturnType<typeof parseError>