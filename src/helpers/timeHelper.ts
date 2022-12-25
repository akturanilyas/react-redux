const date = new Date();

export const getNow = (): string => new Date().toLocaleString();
export const getDateNow = (): string => {
  return `${date.getFullYear()}`;
};
export const getTimeNow = (): string => {
  return `${date.getHours().toString()}-${date.getMinutes().toString()}`;
};

export const getTime = (time: Date): string => {
  const formattedTime = new Date(time);

  return `${formattedTime.getHours().toString()}-${formattedTime.getMinutes().toString()}`;
};
