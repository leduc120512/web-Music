const { override } = require("customize-cra");

module.exports = {
  webpack: override(),
  jest: (config) => {
    config.moduleNameMapper = {
      ...(config.moduleNameMapper || {}),
      "^axios$": "<rootDir>/node_modules/axios/dist/node/axios.cjs",
    };

    return config;
  },
};

