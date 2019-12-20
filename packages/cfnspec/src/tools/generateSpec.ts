import { promises as fs } from 'fs';
import path from 'path';
import { getLatestSpec } from '../getLatestSpec';

export async function main(): Promise<number> {
  const spec = await getLatestSpec();

  await fs.writeFile(
    path.resolve(__dirname, `../spec.generated.ts`),
    `import { CfnSpecification } from './model/CfnSpecification';
export const spec: CfnSpecification = ${JSON.stringify(spec)};`,
  );

  return 0;
}

main().then(
  code => {
    process.exit(code);
  },
  err => {
    console.error(`FATAL ERROR`, err);
    process.exit(1);
  },
);
