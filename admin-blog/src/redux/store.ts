import { configureStore } from "@reduxjs/toolkit";
import MenusReducer from "./slices/MenuSlice"
import tagsReducer from "./slices/TagSlice"
export const store = configureStore({
  reducer: {
    menus: MenusReducer,
    tags: tagsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch