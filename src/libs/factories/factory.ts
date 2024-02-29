export interface IFactory<T> {
  create(p: T): T;
}
