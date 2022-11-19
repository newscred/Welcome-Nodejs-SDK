import type {Config} from 'jest';

const config: Config = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  globalSetup: './tests/setup/globalSetup.ts',
  globalTeardown: './tests/setup/globalTeardown.ts',
};

export default config;
