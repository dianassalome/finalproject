import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice"
import notesReducer from "./notebook/notesSlice"

export const store = configureStore({
    reducer: {
        user: userReducer,
        notes: notesReducer
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch