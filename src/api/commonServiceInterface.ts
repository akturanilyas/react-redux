export interface Post<T> {
  id?: number;
  body: T | Record<string, unknown>;
}

export interface Get<T = undefined> {
  id?: number;
  query?: T | Record<string, unknown>;
}

export interface Delete {
  id: number;
}
