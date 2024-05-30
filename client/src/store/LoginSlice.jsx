import { createSlice } from "@reduxjs/toolkit";
const loginSlice = createSlice({
    name: "login",
    initialState: {
        username: '',
        token: '',
    },
    reducers: {
        setToken: (state, action) => {
            state.username = action.payload.username;
            state.token = action.payload.token;
        }
    }
})

export const { setToken } = loginSlice.actions;
export default loginSlice.reducer;
