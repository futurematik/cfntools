import { ValueValidator, ValidationResult } from '@fmtk/validation';

export function arbitraryObject(): ValueValidator<object> {
  return (ctx): ValidationResult<object> => {
    if (
      typeof ctx.value === 'object' &&
      ctx.value !== null &&
      ctx.value.constructor === Object
    ) {
      return { ok: true, value: ctx.value };
    }
    return {
      ok: false,
      errors: [
        {
          id: 'EXPECTED_OBJECT',
          text: 'expected object',
          field: ctx.field,
        },
      ],
    };
  };
}
