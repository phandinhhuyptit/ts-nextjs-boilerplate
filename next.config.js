const withSass = require('@zeit/next-sass');

const config = withSass();

config.publicRuntimeConfig = {
  BASE_URL: process.env.BASE_URL,
};

module.exports = config;
