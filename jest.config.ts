/** @type {import('jest').Config} */

//location to collect coverage and tests
const baseDir = "<rootDir>/src/app/password_checker_tdd";
const baseTestDir = "<rootDir>/src/test/password_checker_tdd";

const config = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "node",

  collectCoverage: true,
  collectCoverageFrom: [
    // '**'  - for all js files inside app folder , /
    //"<rootDir>/src/app/**/*.js",
    `${baseDir}/**/*.ts`,
  ],
  testMatch: [`${baseTestDir}/**/*.ts`],
};

module.exports = config;

////////////////////////////////
// import type { Config } from "@jest/types";

// const config: Config.InitialOptions = {
//   preset: "ts-jest",
//   testEnvironment: "node",
//   verbose: true,
// };

// export default config;
