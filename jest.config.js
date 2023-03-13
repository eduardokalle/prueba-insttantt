module.exports = {
   preset: 'jest-preset-angular',
   setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
   testPathIgnorePatterns: [
     "<rootDir>/node_modules/",
     "<rootDir>/dist/",
     "<rootDir>/src/test.ts"
   ],
   globals: {
     'ts-jest': {
       tsconfig: '<rootDir>/tsconfig.spec.json',
       stringifyContentPathRegex: '\\.(html|svg)$',
       astTransformers: {
         before: [
           'jest-preset-angular/build/InlineFilesTransformer',
           'jest-preset-angular/build/StripStylesTransformer'
         ]
       }
     }
   },
   verbose: true
 };