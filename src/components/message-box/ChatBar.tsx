import React from 'react';

interface ChatBarProps {
  username: string | null
}

export const ChatBar = (props: ChatBarProps) => {
  const { username } = props;

  return <div className="px-5 primary bg-green-700 border border-amber-500 rounded-xl flex items-center h-16">
    {username}
  </div>;
};
