import { PrimitiveType, validatePrimitiveType } from './PrimitiveType';
import { UpdateType, validateUpdateType } from './UpdateType';
import { properties, text, optional, bool } from '@fmtk/validation';

export interface PropertySpecification {
  Documentation?: string;
  DuplicatesAllowed?: boolean;
  ItemType?: string;
  PrimitiveItemType?: PrimitiveType;
  PrimitiveType?: PrimitiveType;
  Required: boolean;
  Type?: string;
  UpdateType: UpdateType;
}

export const validatePropertySpecification = properties<PropertySpecification>({
  Documentation: optional(text()),
  DuplicatesAllowed: optional(bool()),
  ItemType: optional(text()),
  PrimitiveItemType: optional(validatePrimitiveType),
  PrimitiveType: optional(validatePrimitiveType),
  Required: bool(),
  Type: optional(text()),
  UpdateType: validateUpdateType,
});
