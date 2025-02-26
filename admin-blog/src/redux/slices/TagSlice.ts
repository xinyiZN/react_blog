import { TagApi } from "@/api/TagApi"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { notification } from "antd"

//tagslice状态属性接口
interface tagSliceState {
  id: number
  name: string
  color: string
  state?: number
  created_by: string
}
const initialState: tagSliceState[] = []

// 定义异步操作
export const getAllTags = createAsyncThunk("tags/getAllTags", async () => {
  const res = await TagApi.getAllTags()
  return res.data.data.lists
})

//添加标签
export const addTag = createAsyncThunk(
  "tags/addTag",
  async (newTag: tagSliceState) => {
    const res = await TagApi.addTag(newTag)
    if (res.data.code === 200) {
      notification.success({
        message: "提示",
        description: "添加成功"
      })
    }
    return res.data.data
  }
)

//修改标签信息
export const editTag = createAsyncThunk(
  "tags/editTag",
  async (editTag: tagSliceState) => {
    const res = await TagApi.updateTag(editTag)
    if (!res.data.data.length) {
      notification.error({
        message: "错误",
        description: "已有文章使用，该标签不可以修改"
      })
      throw new Error("当前数据不可以删除")
    }
    return res.data.data.lists
  }
)

//删除标签
export const deleteTag = createAsyncThunk(
  "tags/deleteTag",
  async (id: number) => {
    const res = await TagApi.deleteTag(id)
    if (res.data.code === 10004) {
      notification.error({
        message: "错误",
        description: "已有文章使用，该标签不可以删除"
      })
      throw new Error("当前数据不可以删除")
    }
    notification.success({
      message: "提示",
      description: "删除成功"
    })
    return id
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
        const { id, name, color, state: tagState, created_by } = action.payload;
        state.push({ id, name, color, state: tagState, created_by });
      })
      .addCase(editTag.fulfilled, (state, action) => {
        const index = state.findIndex((tag) => tag.id === action.payload.id)
        if (index !== -1) {
          state[index] = action.payload
        }
      })
      .addCase(deleteTag.fulfilled, (state, action) => {
        return initialState.filter((tag) => tag.id !== action.payload)
      })
  }
})

export default tagSlice.reducer
