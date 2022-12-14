import { createSlice } from '@reduxjs/toolkit';
import { ChatUser } from '../../api/models';
import { RootState } from '../../app/store';

export interface ChatState {
  chatId: number | null;
  targetId: number | null;
  targetType: string | null;
  chats: ChatUser[];
}

const initialState: ChatState = {
  chatId: null,
  targetId: null,
  targetType: null,
  chats: [],
};

export const chatSlice = createSlice({
  name: 'chatSlice',
  initialState,
  reducers: {
    setChatState: (state, action) => {
      state.chatId = action.payload.chatId ?? state.chatId;
      state.targetId = action.payload.targetId ?? state.targetId;
      state.targetType = action.payload.targetType ?? state.targetType;
      state.chats = action.payload.chats ?? state.chats;
    },
    setChatMessages: (state, action) => {
      state.chats = action.payload.chats;
    },
    addChatToMessage: (state, action) => {
      state.chats[action.payload.chatId] = action.payload.message;
    },
  },
});

export const { setChatState, setChatMessages, addChatToMessage } = chatSlice.actions;

export const selectChatState = (state: RootState) => state.chatSlice;
export const selectChats = (state: RootState) => state.chatSlice.chats;
export const selectChatId = (state: RootState) => state.chatSlice.chatId;
export const selectTargetId = (state: RootState) => state.chatSlice.targetId;
export const selectTargetType = (state: RootState) => state.chatSlice.targetType;

export default chatSlice.reducer;
