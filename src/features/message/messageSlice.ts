import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface MessageState {
  chatUsers: object;
}

const initialState: MessageState = {
  chatUsers: [],
};

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.chatUsers = action.payload;
    },
  },
});

export const { setMessages } = messageSlice.actions;

export const selectMessages = (state: RootState) => state.messages.chatUsers;

export default messageSlice.reducer;
