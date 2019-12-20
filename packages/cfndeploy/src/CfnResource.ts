import {
  ValueValidator,
  ValidationResult,
  is,
  properties,
  joinIds,
  optional,
  array,
  text,
} from '@fmtk/validation';
import {
  ResourceSpecification,
  StringMap,
  CfnSpecification,
} from '@fmtk/cfnspec';
import {
  subProperties,
  PropertyTypeResolver,
  propertyType,
} from './validation/propertyType';
import { arbitraryObject } from './validation/arbitraryObject';

export interface CfnResource<
  T extends string = string,
  P extends object = object
> {
  DependsOn?: string[];
  Metadata?: object;
  Properties: P;
  Type: T;
}

export function validateCfnResource(
  spec: CfnSpecification,
): ValueValidator<CfnResource> {
  const validTypes = Object.keys(spec.ResourceTypes);
  const baseValidator = baseCfnResource(validTypes);

  // eslint-disable-next-line prefer-const
  let propTypeValidators: StringMap<ValueValidator<object>>;

  function resolve(type: string, namespace: string): ValueValidator<object> {
    const searches = [`${namespace}.${type}`, type];

    for (const search of searches) {
      if (search in spec.PropertyTypes) {
        return (ctx): ValidationResult<object> =>
          propTypeValidators[search](ctx);
      }
    }

    throw new Error(
      `can't resolve type ${type} (tried [${searches.join(', ')}])`,
    );
  }

  propTypeValidators = Object.keys(spec.PropertyTypes).reduce(
    (a, x) => ({
      ...a,
      [x]: propertyType(spec.PropertyTypes[x], ns(x), x, resolve),
    }),
    {},
  );

  const propValidators = validTypes.reduce(
    (a, x) => ({
      ...a,
      [x]: validateCfnResourceProps(spec.ResourceTypes[x], x, resolve),
    }),
    {} as StringMap<ValueValidator<object>>,
  );

  return (ctx): ValidationResult<CfnResource> => {
    const result = baseValidator(ctx);
    if (!result.ok) {
      return result;
    }
    const propResult = propValidators[result.value.Type]({
      ...ctx,
      field: joinIds(ctx.field, 'Properties'),
      value: result.value.Properties,
    });
    if (!propResult.ok) {
      return propResult;
    }
    return {
      ok: true,
      value: { ...result.value, Properties: propResult.value },
    };
  };
}

export function validateCfnResourceProps<P extends object>(
  spec: ResourceSpecification,
  name: string,
  resolve: PropertyTypeResolver,
): ValueValidator<P> {
  return subProperties(
    spec.Properties || {},
    name,
    resolve,
    !!spec.AdditionalProperties,
  ) as ValueValidator<P>;
}

function baseCfnResource(validTypes: string[]): ValueValidator<CfnResource> {
  return properties<CfnResource>({
    DependsOn: optional(array(text())),
    Metadata: optional(arbitraryObject()),
    Properties: arbitraryObject(),
    Type: is(...validTypes),
  });
}

function ns(name: string): string {
  return name.split('.')[0];
}
