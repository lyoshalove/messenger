import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IUser } from "../../types/users";

interface IState {
  value: Partial<IUser>
}

const initialState: IState = {
  value: {},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    initUser: (state, action: PayloadAction<Partial<IUser>>) => {
      state.value = { ...state.value, ...action.payload };
    }
  }
});

export const { initUser } = userSlice.actions;
export default userSlice.reducer; 