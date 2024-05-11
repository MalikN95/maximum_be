import { Config } from 'jest';

import { compilerOptions } from './tsconfig.json';

/**
 * If you use "baseUrl" and "paths" options in your tsconfig file,
 * you should make sure the "pathMapper" option in your Jest config is setup accordingly.
 *
 * pathMapperAdapter provides a helper to transform the mapping from tsconfig to Jest config format.
 * tsconfig.json
 * {
 *  "compilerOptions": {
 *  "baseUrl": ".",
 *  "paths": {
 *    "@App/*": ["src/*"],
 *    "lib/*": ["common/*"]
 *   }
 *  }
 * }
 *
 * without Adapter
 *
 * moduleNameMapper: {
 * '^@App/(.*)$': '<rootDir>/src/$1',
 * '^lib/(.*)$': '<rootDir>/common/$1',
 * },
 *
 * with Adapter - you do not need to manually specify an alias path for the jest
 *
 * moduleNameMapper: pathMapperAdapter(compilerOptions.paths)
 */
function pathMapperAdapter(
  paths: Record<string, string[]>,
): Record<string, string> {
  const newPaths = { ...paths };

  const transformedPaths: Record<string, string> = {};

  Object.entries(newPaths).forEach(([key, value]) => {
    const newKey = `^${key.replace('*', '(.*)$')}`;
    const newValue = value.map((item) =>
      item.replace('./', '<rootDir>/').replace('/*', '/$1'),
    )[0];

    transformedPaths[newKey] = newValue;
  });

  return transformedPaths;
}

const config: Config = {
  roots: ['<rootDir>'],
  verbose: true,
  testEnvironment: 'node',
  preset: 'ts-jest',
  collectCoverageFrom: ['**/*.{ts, js}'],
  coverageDirectory: '../coverage',
  testRegex: '.*\\.spec\\.ts$',
  moduleNameMapper: pathMapperAdapter(compilerOptions.paths),
};

export default config;
