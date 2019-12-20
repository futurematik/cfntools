/* eslint-disable */
import 'jest';
import { StaticCfnSpec } from '@fmtk/cfnspec';
import { validateCfnResource } from './CfnResource';
import { ValidationMode } from '@fmtk/validation';

describe('validateCfnResource', () => {
  it('can construct a validator for the latest spec', () => {
    const validator = validateCfnResource(StaticCfnSpec);
    expect(validator).toBeTruthy();
  });

  it('can validate a sample resource', () => {
    const validator = validateCfnResource(StaticCfnSpec);
    const result = validator({
      value: sampleIamResource,
      mode: ValidationMode.Strict,
    });

    expect(result.ok).toBeTruthy();
  });
});

const sampleIamResource = {
  Type: 'AWS::IAM::Role',
  Properties: {
    AssumeRolePolicyDocument: {
      Statement: [
        {
          Action: 'sts:AssumeRole',
          Effect: 'Allow',
          Principal: {
            Service: 'lambda.amazonaws.com',
          },
        },
      ],
      Version: '2012-10-17',
    },
    ManagedPolicyArns: [
      {
        'Fn::Join': [
          '',
          [
            'arn:',
            {
              Ref: 'AWS::Partition',
            },
            ':iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
          ],
        ],
      },
    ],
  },
  Metadata: {
    'aws:cdk:path':
      'SimpleHttpLambdaTestStack/TestFunction/ServiceRole/Resource',
  },
};
