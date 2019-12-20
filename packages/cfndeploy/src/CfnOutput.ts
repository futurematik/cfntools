import { Intrinsic, intrinsic } from './Intrinsic';
import { properties, optional, text, or } from '@fmtk/validation';

export interface CfnOutput {
  Description?: string;
  Value: string | Intrinsic;
  Export?: {
    Name: string | Intrinsic;
  };
}

export const valdiateCfnOutput = properties<CfnOutput>({
  Description: optional(text()),
  Value: or<string | Intrinsic>(text(), intrinsic()),
  Export: optional(
    properties({
      Name: or<string | Intrinsic>(text(), intrinsic()),
    }),
  ),
});
