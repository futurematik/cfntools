import { StringMap, validateStringMap } from './StringMap';
import {
  AttributeSpecification,
  validateAttributeSpecification,
} from './AttributeSpecification';
import {
  PropertySpecification,
  validatePropertySpecification,
} from './PropertySpecification';
import { properties, text, optional, bool } from '@fmtk/validation';

export interface ResourceSpecification {
  AdditionalProperties?: boolean;
  Attributes?: StringMap<AttributeSpecification>;
  Documentation?: string;
  Properties: StringMap<PropertySpecification>;
}

export const validateResourceSpecification = properties<ResourceSpecification>({
  AdditionalProperties: optional(bool()),
  Attributes: optional(validateStringMap(validateAttributeSpecification)),
  Documentation: optional(text()),
  Properties: validateStringMap(validatePropertySpecification),
});
