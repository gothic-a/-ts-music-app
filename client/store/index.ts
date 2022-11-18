import { configureStore, createSlice } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { AppStore } from "../types/store";
import uploadTrackSlice from "./slices/uploadTrackSlice";
import playerSlice from "./slices/palyerSlice";
import tracksSlice from "./slices/tracksSlice";

export const makeStore = () => (
    configureStore({
        reducer: {
            uploadTrack: uploadTrackSlice,
            player: playerSlice,
            tracks: tracksSlice
        },
        devTools: true
    })
)

export const wrapper = createWrapper<AppStore>(makeStore)

