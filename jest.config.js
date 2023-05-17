module.exports = {
    testPathIgnorePatterns: ["./.next/", "./node_modules/"],
    setupFilesAfterEnv: [
      "./setupTests.js",
    ],
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "./node_modules/babel-jest",
    },
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    },
  };
  