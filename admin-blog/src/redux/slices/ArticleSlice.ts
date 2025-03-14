import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import type {
  TagType,
  Category,
  ArticleItem,
} from "@/types/article"
import { ArticleApi } from '@/api/ArticleApi';
import { notification } from 'antd';

// 定义初始状态
const initialState = {
  articles: [] as ArticleItem[],
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
export const deleteArticle = createAsyncThunk('articles/deleteArticle', async (id: number) => {
  const res = await ArticleApi.deleteArticleById(id)
  console.log("删除文章：", res.data.data)
  if (res.data.code == 200) {
    notification.success({
      message: "提示",
      description: "文章删除成功"
    })
  }
  return id;
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
        console.log("获取文章:", action.payload)
        state.articles = action.payload;
        console.log(state.articles)
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.error = action.error.message!;
      })
      // .addCase(addArticle.fulfilled, (state, action) => {
      //   state.articles.push(action.payload);
      // })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        console.log("删除文章的action:", action.payload)
        state.articles = state.articles.filter(article => article.id !== action.payload!);
        console.log("删除文章后的数据", state.articles)
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