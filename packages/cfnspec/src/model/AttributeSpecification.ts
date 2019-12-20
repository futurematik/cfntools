import { PrimitiveType, validatePrimitiveType } from './PrimitiveType';
import { properties, optional, text } from '@fmtk/validation';

export interface AttributeSpecification {
  ItemType?: string;
  PrimitiveItemType?: PrimitiveType;
  PrimitiveType?: PrimitiveType;
  Type?: string;
}

export const validateAttributeSpecification = properties<
  AttributeSpecification
>({
  ItemType: optional(text()),
  PrimitiveItemType: optional(validatePrimitiveType),
  PrimitiveType: optional(validatePrimitiveType),
  Type: optional(text()),
});
