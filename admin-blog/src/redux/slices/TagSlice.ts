import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


//tagslice状态属性接口
interface tagSliceState {
  id: number;
  name: string;
  color: string;
  state: number;
  createdBy: string;
}
const initialState = [] as tagSliceState[]

// 定义异步操作
export const fetchTags = createAsyncThunk('tags/fetchTags', async () => {
  const response = await axios.get('/api/tags');
  return response.data;
});

export const addTag = createAsyncThunk('tags/addTag', async (newTag: tagSliceState) => {
  const response = await axios.post('/api/tags', newTag);
  return response.data;
});

export const updateTag = createAsyncThunk('tags/updateTag', async (updatedTag: tagSliceState) => {
  const response = await axios.put(`/api/tags/${updatedTag.id}`, updatedTag);
  return response.data;
});

export const deleteTag = createAsyncThunk('tags/deleteTag', async (id: number) => {
  await axios.delete(`/api/tags/${id}`);
  return id;
});

// 更新reducers
const tagSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    // 这里可以添加同步操作的reducer
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addTag.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(updateTag.fulfilled, (state, action) => {
        const index = state.findIndex(tag => tag.id === action.payload.id);
        if (index !== -1) {
          state[index] = action.payload;
        }
      })
      .addCase(deleteTag.fulfilled, (state, action) => {
        return state.filter(tag => tag.id !== action.payload);
      });
  }
});

export default tagSlice.reducer;