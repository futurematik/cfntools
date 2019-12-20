import { StringMap, validateStringMap } from './StringMap';
import {
  PropertyTypeSpecification,
  validatePropertyTypeSpecification,
} from './PropertyTypeSpecification';
import {
  ResourceSpecification,
  validateResourceSpecification,
} from './ResourceSpecification';
import { properties, text } from '@fmtk/validation';

export interface CfnSpecification {
  PropertyTypes: StringMap<PropertyTypeSpecification>;
  ResourceSpecificationVersion: string;
  ResourceTypes: StringMap<ResourceSpecification>;
}

export const validateCfnSpecification = properties<CfnSpecification>({
  PropertyTypes: validateStringMap(validatePropertyTypeSpecification),
  ResourceSpecificationVersion: text(),
  ResourceTypes: validateStringMap(validateResourceSpecification),
});
