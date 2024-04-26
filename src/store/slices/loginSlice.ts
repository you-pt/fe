import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface loginState {
  isLogin: boolean
}

const initialState: loginState = {
  isLogin: false
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    signin :(state) => {
      state.isLogin = true;
    },
    signout :(state ) => {
      state.isLogin = false;
    },
  },
});

export const { signin, signout } =
  loginSlice.actions;

export default loginSlice.reducer;
