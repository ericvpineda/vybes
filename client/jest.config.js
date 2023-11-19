/** @type {import('jest').Config} */

var esmModules = ["@bundled-es-modules"];

const config = {
  verbose: true,
  setupFiles: ["./jest.polyfills.js"],
  transformIgnorePatterns: [
    `node_modules/(?!(?:.pnpm/)?(${esmModules.join("|")}))`,
  ],
  moduleFileExtensions: ["js", "jsx"],
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
};

module.exports = config;
