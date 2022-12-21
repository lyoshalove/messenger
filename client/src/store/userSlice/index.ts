import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IUser } from "../../types/users";

const initialState: Partial<IUser> = {};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    initUser: (state, action: PayloadAction<Partial<IUser>>) => {
      console.log(action);
      state = { ...state, ...action.payload };
    }
  }
});

export const { initUser } = userSlice.actions;
export default userSlice.reducer; 