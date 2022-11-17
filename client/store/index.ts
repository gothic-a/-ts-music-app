import { configureStore, createSlice } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { AppStore } from "../types/store";
import uploadTrackSlice from "./slices/uploadTrackSlice";
import playerSlice from "./slices/palyerSlice";

export const makeStore = () => (
    configureStore({
        reducer: {
            uploadTrack: uploadTrackSlice,
            player: playerSlice
        },
        devTools: true
    })
)

export const wrapper = createWrapper<AppStore>(makeStore)

