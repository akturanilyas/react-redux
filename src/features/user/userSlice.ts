/* eslint-ignore */
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface UserState {
  chatUsers: object;
}

const initialState: UserState = {
  chatUsers: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setChatUsers: (state, action) => {
      state.chatUsers = action.payload;
    },
  },
});

export const { setChatUsers } = userSlice.actions;

export const selectChatUsers = (state: RootState) => state.user.chatUsers;

export default userSlice.reducer;
