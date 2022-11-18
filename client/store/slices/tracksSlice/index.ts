import { createSlice, createAsyncThunk, AnyAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { Track, TracksSliceInitialState, GetTracksThunkProps } from "../../../types/track";
import { parseError, ErrorType } from "../../../utils/parseError";
import { getTracks } from "../../../api";
import { AppState, AppThunk } from "../../../types/store";

const initialState: TracksSliceInitialState = {
    data: null,
    limit: 10,
    page: null,
    error: null,
    loading: false
}

export const getTracksThunk = createAsyncThunk<Track[], GetTracksThunkProps, { state: AppState, rejectValue: ErrorType }>(
    'tracks/getTracks',
    async ({ page }, { rejectWithValue, getState }) => {
        try {
            const { tracks: { limit } } = getState()

            const { data } = await getTracks({ page, limit })
            return data
        } catch(e) {
            const error = parseError(e)
            return rejectWithValue(error) 
        }
    }
)

const trackSlice = createSlice({
    name: 'tracks',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getTracksThunk.pending, (state) => void(state.loading = true))
        builder.addCase(getTracksThunk.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
        })
        builder.addCase(getTracksThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload 
        })

        builder.addCase(HYDRATE, (state, action: AnyAction) => {
            return {
                ...state,
                ...action.payload.tracks
            }
        })
    },
})


export default trackSlice.reducer