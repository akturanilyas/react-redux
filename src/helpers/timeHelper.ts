const date = new Date();

export const getNow = (): string => new Date().toLocaleString();
export const getDateNow = (): string => {
  return `${date.getFullYear()}`;
};
export const getTimeNow = (): string => {
  return `${date.getHours().toString()}-${date.getMinutes().toString()}`;
};
