import { StringMap, CfnSpecification } from '@fmtk/cfnspec';
import { CfnResource, validateCfnResource } from './CfnResource';
import { CfnOutput, valdiateCfnOutput } from './CfnOutput';
import {
  properties,
  text,
  optional,
  dictionary,
  ValueValidator,
} from '@fmtk/validation';

export interface CfnTemplate {
  Description?: string;
  Outputs?: StringMap<CfnOutput>;
  Resources: StringMap<CfnResource>;
}

export function validateCfnTemplate(
  spec: CfnSpecification,
): ValueValidator<CfnTemplate> {
  return properties<CfnTemplate>({
    Description: optional(text()),
    Outputs: optional(dictionary(valdiateCfnOutput)),
    Resources: dictionary(validateCfnResource(spec)),
  });
}
