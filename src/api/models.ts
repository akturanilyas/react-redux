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

export interface Chat {
  id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  type?: string;
}

export interface Message {
  id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  sender_id: number;
  chat_id: number;
  message: string;
  sender: User;
  direction: string;
}
