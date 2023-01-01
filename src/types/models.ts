export interface BaseEnum {
  group: string | null;
  value: string;
  key: string;
  description: string;
}

export interface Auth {
  token: string;
}

export interface User {
  id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  email: string;
  username: string;
  age?: number;
  first_name: string;
  last_name: string;
  photo_url?: string;
}

export interface Group {
  username: string;
}

export interface Message {
  id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  sender_id: number;
  chat_id: number;
  text: string;
  sender: User;
  direction: string;
}

export interface UsersChat {
  id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  user: User;
  chat_id: number;
  target_id: number;
  target_type: string;
  target: User;
  messages: Message[];
}

export interface Chat {
  created_at: Date;
  deleted_at: Date;
  id: number;
  messages: Message[];
  notify_count: number | undefined;
  type?: string;
  updated_at: Date;
  usersChats: UsersChat[];
}

export interface ChatState {
  chatId: number;
  targetId: number;
  targetType: string;
  isLoading: boolean;
  chat: Chat;
}
