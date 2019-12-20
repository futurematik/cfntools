import { PrimitiveType } from '@fmtk/cfnspec';
import {
  bool,
  real,
  integer,
  text,
  ValueValidator,
  or,
} from '@fmtk/validation';
import { arbitraryObject } from './arbitraryObject';
import { isoDateString } from './isoDateString';
import { intrinsic } from '../Intrinsic';

export function primitive(
  type: PrimitiveType,
  allowIntrinsic = true,
): ValueValidator<unknown> {
  if (allowIntrinsic) {
    return or(primitive(type, false), intrinsic());
  }
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
