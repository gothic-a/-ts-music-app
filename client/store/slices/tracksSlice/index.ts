import { createSlice, createAsyncThunk, AnyAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { Track, TracksSliceInitialState, GetTracksThunkProps, AddListenThunkProps } from "../../../types/track";
import { parseError, ErrorType } from "../../../utils/parseError";
import { addListen, getTracks } from "../../../api";
import { AppState } from "../../../types/store";

const initialState: TracksSliceInitialState = {
    data: null,
    limit: 10,
    page: null,
    error: null,
    loading: false
}

export const getTracksThunk = createAsyncThunk<{data: Track[], page: number}, GetTracksThunkProps, { state: AppState, rejectValue: ErrorType }>(
    'tracks/getTracks',
    async ({ page, query }, { rejectWithValue, getState }) => {
        try {
            const { tracks: { limit, page: pageFromStore } } = getState()

            const actualPage = page ?? pageFromStore

            const { data } = await getTracks({ page: actualPage, limit, query })
            return { data, page }
        } catch(e) {
            const error = parseError(e)
            return rejectWithValue(error) 
        }
    }
)

export const addListenThunk = createAsyncThunk<string, AddListenThunkProps, { rejectValue: ErrorType }>(
    'tracks/addListen',
    async ({ _id }, { rejectWithValue }) => {
        try {
            await addListen(_id)
            return _id
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
            const { data, page } = action.payload
            state.data = data
            state.page = page
        })
        builder.addCase(getTracksThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload 
        })

        builder.addCase(addListenThunk.fulfilled, (state, action) => {
            const { payload } = action

            const tracks = state.data
            const listenTrack = tracks.find(t => t._id === payload)

            ++listenTrack.listens 

            state.data = tracks
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