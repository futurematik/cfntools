import { ValueValidator, dictionary } from '@fmtk/validation';

export interface StringMap<T> {
  [key: string]: T;
}

export function validateStringMap<T>(
  validator: ValueValidator<T>,
): ValueValidator<StringMap<T>> {
  return dictionary(validator);
}
