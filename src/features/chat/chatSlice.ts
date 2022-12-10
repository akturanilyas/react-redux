import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface ChatState {
  chatId: number | null;
  targetId: number | null;
  targetType: string | null;
}

const initialState: ChatState = {
  chatId: null,
  targetId: null,
  targetType: null,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatState: (state, action) => {
      state.chatId = action.payload.chatId ?? state.chatId;
      state.targetId = action.payload.targetId ?? state.targetId;
      state.targetType = action.payload.targetType ?? state.targetType;
    },
  },
});

export const { setChatState } = chatSlice.actions;

export const selectChatState = (state: RootState) => state.chatState;
export const selectChatId = (state: RootState) => state.chatState.chatId;
export const selectTargetId = (state: RootState) => state.chatState.targetId;
export const selectTargetType = (state: RootState) => state.chatState.targetType;

export default chatSlice.reducer;
