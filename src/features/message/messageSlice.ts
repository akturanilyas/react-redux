import { createSlice } from '@reduxjs/toolkit';
import { Message } from '../../api/models';
import { RootState } from '../../app/store';

export interface MessageState {
  messages: Message[];
}

const initialState: MessageState = {
  messages: [],
};

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const { setMessages } = messageSlice.actions;

export const selectMessages = (state: RootState) => state.message.messages;

export default messageSlice.reducer;
