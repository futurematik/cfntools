/* eslint-disable */
import 'jest';
import { promises as fs } from 'fs';
import path from 'path';
import { StaticCfnSpec } from '@fmtk/cfnspec';
import { validateCfnTemplate } from './CfnTemplate';
import { ValidationMode } from '@fmtk/validation';

describe('validateCfnTemplate', () => {
  it('can construct a validator for the latest spec', () => {
    const validator = validateCfnTemplate(StaticCfnSpec);
    expect(validator).toBeTruthy();
  });

  it('can validate a sample spec', async () => {
    const templatePath = path.resolve(
      __dirname,
      '__tests__/sample-template.json',
    );

    const spec = JSON.parse(await fs.readFile(templatePath, 'utf8'));
    const validator = validateCfnTemplate(StaticCfnSpec);

    const result = validator({ value: spec, mode: ValidationMode.Strict });
    expect(result.ok).toBeTruthy();
  });
});
