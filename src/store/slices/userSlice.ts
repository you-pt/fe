import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface userType {
  email: string;
  nickname: string;
  role: "user" | "trainer" | "admin";
}

const initialState: userType = {
  email: "",
  nickname: "",
  role: "user",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { email, name, role } = action.payload;
      state.email = email;
      state.nickname = name;
      state.role = role;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
