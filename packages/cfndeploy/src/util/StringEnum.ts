export type StringEnum<T extends string> = { [K in T]: K };

export function stringEnum<T extends string>(
  ...values: (T | T[])[]
): StringEnum<T> {
  return values.reduce(reduceEnum, {} as StringEnum<T>);
}

function reduceEnum<T extends string>(
  output: StringEnum<T>,
  value: T | T[],
): StringEnum<T> {
  if (Array.isArray(value)) {
    return { ...output, ...value.reduce(reduceEnum, {} as StringEnum<T>) };
  }
  return { ...output, [value]: value };
}
