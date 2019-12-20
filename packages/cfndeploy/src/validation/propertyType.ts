import {
  PropertyTypeSpecification,
  PropertySpecification,
  StringMap,
} from '@fmtk/cfnspec';
import {
  ValueValidator,
  array,
  dictionary,
  properties,
  any,
} from '@fmtk/validation';
import { primitive } from './primitive';

export interface PropertyTypeResolver {
  (type: string, namespace: string): ValueValidator<object>;
}

export function propertyType(
  spec: PropertyTypeSpecification | PropertySpecification,
  namespace: string,
  type: string | undefined,
  resolve: PropertyTypeResolver,
): ValueValidator<unknown> {
  if (spec.PrimitiveType) {
    return primitive(spec.PrimitiveType);
  } else if (spec.Type) {
    if (spec.Type === 'List' || spec.Type === 'Map') {
      let itemValidator: ValueValidator<unknown>;

      if (spec.PrimitiveItemType) {
        itemValidator = primitive(spec.PrimitiveItemType);
      } else if (spec.ItemType) {
        itemValidator = resolve(spec.ItemType, namespace);
      } else {
        throw new Error(`don't know how to validate spec`);
      }
      if (spec.Type === 'List') {
        return array(itemValidator);
      }
      return dictionary(itemValidator);
    } else {
      return resolve(spec.Type, namespace);
    }
  } else if ('Properties' in spec && spec.Properties) {
    return subProperties(spec.Properties, namespace, resolve);
  } else {
    console.warn(`no validation possible for type ${type} (${namespace})`);
    return any();
  }
}

export function subProperties(
  props: StringMap<PropertySpecification>,
  namespace: string,
  resolve: PropertyTypeResolver,
  allowExtra = false,
): ValueValidator<unknown> {
  return properties(
    Object.keys(props).reduce(
      (v, k) => ({
        ...v,
        [k]: propertyType(props[k], namespace, k, resolve),
      }),
      {},
    ),
    allowExtra,
  );
}
