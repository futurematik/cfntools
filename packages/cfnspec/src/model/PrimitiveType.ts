import { is } from '@fmtk/validation';
import { stringEnum } from '../util/StringEnum';

export const PrimitiveType = stringEnum(
  'String',
  'Long',
  'Integer',
  'Double',
  'Boolean',
  'Timestamp',
  'Json',
);

export type PrimitiveType = keyof typeof PrimitiveType;

export const validatePrimitiveType = is<PrimitiveType>(
  ...Object.values(PrimitiveType),
);
