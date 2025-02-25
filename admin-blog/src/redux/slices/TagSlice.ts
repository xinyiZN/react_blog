import { TagApi } from "@/api/TagApi"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { notification } from "antd"

//tagslice状态属性接口
interface tagSliceState {
  id: number
  name: string
  color: string
  state: number
  createdBy: string
}
const initialState = [] as tagSliceState[]

// 定义异步操作
export const getAllTags = createAsyncThunk("tags/getAllTags", async () => {
  const res = await TagApi.getAllTags()
  console.log("获取的所有标签：", res.data.data)
  return res.data.data
})

export const addTag = createAsyncThunk(
  "tags/addTag",
  async (newTag: tagSliceState) => {
    const response = await axios.post("/api/tags", newTag)
    return response.data
  }
)

export const editTag = createAsyncThunk(
  "tags/editTag",
  async (editTag: tagSliceState) => {
    const response = await axios.put(`/api/tags/${editTag.id}`, editTag)
    return response.data
  }
)

export const deleteTag = createAsyncThunk(
  "tags/deleteTag",
  async (id: number) => {
    const res = await TagApi.deleteTag(id)
    console.log("res.data:删除：", res.data.data)
    if (!res.data.data.length) {
      notification.error({
        message: "错误",
        description: "已有文章使用，该标签不可以删除"
      })
      throw new Error("当前数据不可以删除")
    }
    return res.data.data
  }
)

// 更新reducers
const tagSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    // 这里可以添加同步操作的reducer
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTags.fulfilled, (state, action) => {
        return action.payload
      })
      .addCase(addTag.fulfilled, (state, action) => {
        state.push(action.payload)
      })
      .addCase(editTag.fulfilled, (state, action) => {
        const index = state.findIndex((tag) => tag.id === action.payload.id)
        if (index !== -1) {
          state[index] = action.payload
        }
      })
      .addCase(deleteTag.fulfilled, (state, action) => {
        console.log("删除方法:--state", state)
        console.log("删除方法:--action", action.payload)
        return state.filter((tag) => tag.id !== action.payload)
      })
  }
})

export default tagSlice.reducer
