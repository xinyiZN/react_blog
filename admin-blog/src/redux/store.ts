import { configureStore } from "@reduxjs/toolkit"
import MenusReducer from "./slices/MenuSlice"
import tagsReducer from "./slices/TagSlice"
import articlesReducer from "./slices/ArticleSlice"
export const store = configureStore({
  reducer: {
    menus: MenusReducer,
    tags: tagsReducer,
    articles: articlesReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
