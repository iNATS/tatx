const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Customize metro config for web
if (config.web) {
  config.web.buildPath = 'web-build';
}

module.exports = config;
