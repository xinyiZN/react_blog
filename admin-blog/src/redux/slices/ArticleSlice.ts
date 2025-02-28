
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import type {
  TagType,
  Category,
  ListItem,
} from "@/types/article"
import { ArticleApi } from '@/api/ArticleApi';
import { error } from 'console';

// 定义初始状态
const initialState = {
  articles: [] as ListItem[],
  error: ""
}

// 异步获取文章
export const fetchArticles = createAsyncThunk('articles/fetchArticles', async () => {
  const res = await ArticleApi.getAllArticle()
  console.log("所有的文章数据：", res.data.data.lists)
  return res.data.data.lists;
});

// 异步添加文章
export const addArticle = createAsyncThunk('articles/addArticle', async (newArticle) => {
  const response = await axios.post('/api/articles', newArticle);
  return response.data;
});

// 异步删除文章
export const deleteArticle = createAsyncThunk('articles/deleteArticle', async (id) => {
  await axios.delete(`/ api / articles / ${id} `);
  return id; // 返回删除的文章ID
});

// 异步更新文章
// export const updateArticle = createAsyncThunk('articles/updateArticle', async (updatedArticle) => {
//   const response = await axios.put(`/ api / articles / ${updatedArticle.id} `, updatedArticle);
//   return response.data;
// });

const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.articles = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.error = action.error.message!;
      })
      // .addCase(addArticle.fulfilled, (state, action) => {
      //   state.articles.push(action.payload);
      // })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.articles = state.articles.filter(article => article.id !== action.payload!);
      })
    // .addCase(updateArticle.fulfilled, (state, action) => {
    //   const index = state.articles.findIndex(article => article.id === action.payload.id);
    //   if (index !== -1) {
    //     state.articles[index] = action.payload;
    //   }
    // });
  },
});

export default articleSlice.reducer;