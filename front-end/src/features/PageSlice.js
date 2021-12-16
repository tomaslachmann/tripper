import { createSlice } from "@reduxjs/toolkit";

export const pageSlice = createSlice({
    name:"page",
    initialState: {
        page:{
            name:'home'
        },
    },
    reducers:{
        changePage: (state, action) => {
            state.page = action.payload;
        },
    },
});


export const { changePage } = pageSlice.actions;

export const selectPage = (state) => state.page.page;

export default pageSlice.reducer;