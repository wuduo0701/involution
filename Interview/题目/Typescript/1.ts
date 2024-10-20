type NestedArray<T> = T | NestedArray<T>[]

type MyArray = NestedArray<number>

const example: MyArray = [1, 2, 3, [4, 5, [7]], 1, 2]
