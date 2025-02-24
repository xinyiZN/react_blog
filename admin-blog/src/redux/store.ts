import { configureStore } from "@reduxjs/toolkit";
import MenusReducer from "./slices/MenuSlice"

export const store = configureStore({
  reducer: {
    menus: MenusReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch