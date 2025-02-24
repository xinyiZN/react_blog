import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    currentMenu: '', // 记录当前菜单名称
    parentMenu: '',  // 记录父级菜单名称
  },
  reducers: {
    setCurrentMenu(state, action) {
      console.log("menuslice-reducer-current:", action.payload)
      state.currentMenu = action.payload
      console.log("menuslice:", state.currentMenu)
    },
    setParentMenu(state, action) {
      console.log("menuslice-reducer-parent:", action.payload)
      state.parentMenu = action.payload
      console.log("menuslice-p:", state.parentMenu)
    }
  }
});

// 导出 actions 和 reducer
export const { setCurrentMenu, setParentMenu } = menuSlice.actions;
export default menuSlice.reducer;