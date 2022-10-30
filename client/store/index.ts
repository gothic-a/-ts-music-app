import { configureStore, createSlice } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { AppStore } from "../types/store";
import uploadTrackSlice from "./slices/uploadTrackSlice";


export const makeStore = () => (
    configureStore({
        reducer: {
            uploadTrack: uploadTrackSlice
        },
        devTools: true
    })
)

export const wrapper = createWrapper<AppStore>(makeStore)

