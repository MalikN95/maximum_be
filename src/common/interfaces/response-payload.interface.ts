export interface Payload<T> {
  data: T[] | T;
  message?: string;
}
