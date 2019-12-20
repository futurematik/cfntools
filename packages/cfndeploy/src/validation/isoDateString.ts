import { ValueValidator, ValidationResult } from '@fmtk/validation';
import { parseISO } from 'date-fns';

export function isoDateString(): ValueValidator<string> {
  return (ctx): ValidationResult<string> => {
    if (
      typeof ctx.value === 'string' &&
      !isNaN(parseISO(ctx.value).getTime())
    ) {
      return {
        ok: true,
        value: ctx.value,
      };
    }

    return {
      ok: false,
      errors: [
        {
          id: 'EXPECTED_ISO_DATE_STRING',
          field: ctx.field,
          text: 'expected ISO date string',
        },
      ],
    };
  };
}
