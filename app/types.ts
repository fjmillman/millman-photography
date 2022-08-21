import type { Merge } from 'type-fest';

type JsonPrimitives = string | number | boolean | String | Number | Boolean | null;
type NonJsonPrimitives = undefined | Function | symbol;

type UndefinedOptionals<T extends object> = Merge<
  {
    [k in keyof T as undefined extends T[k] ? never : k]: T[k];
  },
  {
    [k in keyof T as undefined extends T[k] ? k : never]?: Exclude<T[k], undefined>;
  }
>;

type SerializeType<T> = T extends JsonPrimitives
  ? T
  : T extends NonJsonPrimitives
  ? never
  : T extends {
      toJSON(): infer U;
    }
  ? U
  : T extends []
  ? []
  : T extends [unknown, ...unknown[]]
  ? {
      [k in keyof T]: T[k] extends NonJsonPrimitives ? null : SerializeType<T[k]>;
    }
  : T extends ReadonlyArray<infer U>
  ? (U extends NonJsonPrimitives ? null : SerializeType<U>)[]
  : T extends object
  ? SerializeObject<UndefinedOptionals<T>>
  : never;

export type SerializeObject<T> = {
  [k in keyof T as T[k] extends NonJsonPrimitives ? never : k]: SerializeType<T[k]>;
};
