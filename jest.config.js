module.exports = {
  testEnvironment: "jsdom",
  preset: "ts-jest",
  setupFilesAfterEnv: ["<rootDir>/.jest/setupTests.ts"],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': "ts-jest",
  },
  transformIgnorePatterns: ['/node_modules/'],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(js|jsx|ts|tsx)?$",
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  globals: {
    "ts-jest": {
      tsConfig: "<rootDir>/.jest/tsconfig.jest.json",
    },
  },
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
};
