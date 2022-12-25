import { createSlice } from '@reduxjs/toolkit';
import { useAppSelector } from '../../app/hooks';
import { ChatState, User } from '../../types/models';

interface MainSlice {
  user: User | undefined;
  chatState: ChatState | undefined;
}

const initialState: MainSlice = {
  user: undefined,
  chatState: undefined,
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setChatState: (state, action) => {
      state.chatState = action.payload;
    },
    setChatId: (state, action) => {
      state.chatState!.chatId = action.payload.chatId;
    },
    setTarget: (state, action) => {
      state.chatState!.targetId = action.payload.targetId;
      state.chatState!.targetType = action.payload.targetType;
    },
  },
});

export const { setUser, setChatState, setChatId, setTarget } = mainSlice.actions;

export const useMain = () => useAppSelector((state) => state.main);

export default mainSlice.reducer;
