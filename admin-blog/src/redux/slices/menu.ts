import { createSlice } from "@reduxjs/toolkit";

const MenuSlice = createSlice({
    name: 'menu',
    initialState: {
        currentMenu: '', // 记录当前菜单名称
        parentMenu: '',  // 记录父级菜单名称
        childMenus: []   // 记录子级菜单名称的数组
    },
    reducers: {
        setCurrentMenu(state, action) {
            state.currentMenu = action.payload; // 更新当前菜单名称
        }
    }
});

// 导出 actions 和 reducer
export const { setCurrentMenu } = MenuSlice.actions;
export default MenuSlice.reducer;