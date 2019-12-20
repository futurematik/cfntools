import { PrimitiveType } from '@fmtk/cfnspec';
import { bool, real, integer, text, ValueValidator } from '@fmtk/validation';
import { arbitraryObject } from './arbitraryObject';
import { isoDateString } from './isoDateString';

export function primitive(type: PrimitiveType): ValueValidator<unknown> {
  switch (type) {
    case PrimitiveType.Boolean:
      return bool();
    case PrimitiveType.Double:
      return real();
    case PrimitiveType.Integer:
      return integer();
    case PrimitiveType.Json:
      return arbitraryObject();
    case PrimitiveType.Long:
      return integer();
    case PrimitiveType.String:
      return text();
    case PrimitiveType.Timestamp:
      return isoDateString();

    default:
      throw new Error(`unknown primitive type: '${type}'`);
  }
}
