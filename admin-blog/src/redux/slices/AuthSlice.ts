import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 定义初始状态
interface initialProp {
  id: number,
  name: string,
  password: string,
  avatar: string,
  des: string
}

const initialState: initialProp[] = [];

// 创建异步操作
export const fetchUsers = createAsyncThunk('users/fetch', async () => {
  const response = await axios.get('/api/users');
  return response.data;
});

export const addUser = createAsyncThunk('users/add', async (user: initialProp) => {
  const response = await axios.post('/api/users', user);
  return response.data;
});

export const updateUser = createAsyncThunk('users/update', async (user: initialProp) => {
  const response = await axios.put(`/api/users/${user.id}`, user);
  return response.data;
});

export const deleteUser = createAsyncThunk('users/delete', async (id: number) => {
  await axios.delete(`/api/users/${id}`);
  return id;
});

// 创建 slice
const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    // 这里可以添加同步的 reducers
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state[index] = action.payload;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        return state.filter(user => user.id !== action.payload);
      });
  }
});

// 导出 reducer
export default authSlice.reducer;