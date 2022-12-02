export type PrimitiveEntity = string | number;
export type StructEntity = Record<number, unknown> | Record<number, unknown>;
export type Entity = StructEntity | PrimitiveEntity;

export type IndexValue<T extends Entity, Key> = 
    [T, Key] extends [PrimitiveEntity, never]
    ? T
    : [T, Key] extends [StructEntity, keyof T]
    ? Key extends keyof T
    ? T[Key]
    : never
    : never 
;

export interface ApiPage<T extends Entity, Key = never> {
    list: T[];
    from: IndexValue<T, Key>;
    to: IndexValue<T, Key>;
}