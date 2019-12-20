import { StringMap, validateStringMap } from './StringMap';
import {
  PropertySpecification,
  validatePropertySpecification,
} from './PropertySpecification';
import { properties, text, optional, bool } from '@fmtk/validation';
import { PrimitiveType, validatePrimitiveType } from './PrimitiveType';
import { UpdateType, validateUpdateType } from './UpdateType';

export interface PropertyTypeSpecification {
  Documentation?: string;
  DuplicatesAllowed?: boolean;
  ItemType?: string;
  PrimitiveItemType?: PrimitiveType;
  PrimitiveType?: PrimitiveType;
  Properties?: StringMap<PropertySpecification>;
  Required?: boolean;
  Type?: string;
  UpdateType?: UpdateType;
}

export const validatePropertyTypeSpecification = properties<
  PropertyTypeSpecification
>({
  Documentation: optional(text()),
  DuplicatesAllowed: optional(bool()),
  ItemType: optional(text()),
  PrimitiveItemType: optional(validatePrimitiveType),
  PrimitiveType: optional(validatePrimitiveType),
  Properties: optional(validateStringMap(validatePropertySpecification)),
  Required: optional(bool()),
  Type: optional(text()),
  UpdateType: optional(validateUpdateType),
});
