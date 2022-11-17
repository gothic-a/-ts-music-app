import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Track } from '../../../types/track' 
import { uploadTrack } from '../../../api/index'
import { parseError } from '../../../utils/parseError'
import type { ErrorType } from '../../../utils/parseError'
import type { SetProgress } from '../../../types/api'
import { UploadTrackSliceState } from "../../../types/upload";


const initialState: UploadTrackSliceState = {
    data: null,
    loading: false,
    error: null,
    success: false,
    progress: null
}


export const uploadTrackThunk = createAsyncThunk<Track, FormData, { rejectValue: ErrorType }>(
    'upload/uploadTrack',
    async (formData: FormData, { rejectWithValue, dispatch }) => {
        const setProgress: SetProgress = (progress) => {
            console.log(progress)
            dispatch(setUploadProgress(progress))
        }
        
        try {
            const { data } = await uploadTrack(formData, setProgress)
            return data
        } catch(e) {
            const error = parseError(e)
            return rejectWithValue(error) 
        }
    }
)

const uploadTrackSlice = createSlice({
    name: 'uploadTrack',
    initialState,
    reducers: {
        setUploadProgress: (state, action) => void(state.progress = action.payload),
        resetUploadState: () => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(uploadTrackThunk.pending, (state) => void(state.loading = true))
        builder.addCase(uploadTrackThunk.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.success = true
        })
        builder.addCase(uploadTrackThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload 
        })
    }
})

export const {  
    setUploadProgress,
    resetUploadState
} = uploadTrackSlice.actions

export default uploadTrackSlice.reducer