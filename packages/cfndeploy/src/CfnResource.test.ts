/* eslint-disable */
import 'jest';
import { StaticCfnSpec } from '@fmtk/cfnspec';
import { validateCfnResource } from './CfnResource';

describe('validateCfnResource', () => {
  it('can construct a validator for the latest spec', () => {
    const validator = validateCfnResource(StaticCfnSpec);

    expect(validator).toBeTruthy();
  });
});
