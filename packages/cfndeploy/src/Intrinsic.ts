/* eslint-disable @typescript-eslint/no-explicit-any */
import { ValueValidator, ValidationResult } from '@fmtk/validation';
import { stringEnum } from './util/StringEnum';

export const IntrinsicTypes = [
  'Fn::Base64',
  'Fn::Cidr',
  'Fn::FindInMap',
  'Fn::GetAtt',
  'Fn::GetAZs',
  'Fn::ImportValue',
  'Fn::Join',
  'Fn::Select',
  'Fn::Split',
  'Fn::Sub',
  'Fn::Transform',
  'Ref',
];

export const IntrinsicType = stringEnum(...IntrinsicTypes);

export type Intrinsic =
  | {
      'Fn::Base64': any;
    }
  | {
      'Fn::Cidr': any;
    }
  | {
      'Fn::FindInMap': any;
    }
  | {
      'Fn::GetAtt': any;
    }
  | {
      'Fn::GetAZs': any;
    }
  | {
      'Fn::ImportValue': any;
    }
  | {
      'Fn::Join': any;
    }
  | {
      'Fn::Select': any;
    }
  | {
      'Fn::Split': any;
    }
  | {
      'Fn::Sub': any;
    }
  | {
      'Fn::Transform': any;
    }
  | {
      Ref: any;
    };

export function intrinsic(): ValueValidator<Intrinsic> {
  return (ctx): ValidationResult<Intrinsic> => {
    if (isIntrinsic(ctx.value)) {
      return { ok: true, value: ctx.value };
    }
    return {
      ok: false,
      errors: [
        {
          id: 'EXPECTED_INTRINSIC',
          text: 'expected an intrinsic function',
          field: ctx.field,
        },
      ],
    };
  };
}

export function isIntrinsic(value: unknown): value is Intrinsic {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const [prop, ...others] = Object.keys(value);

  if (others.length) {
    return false;
  }
  const match = IntrinsicTypes.indexOf(prop) >= 0;
  return match;
}
