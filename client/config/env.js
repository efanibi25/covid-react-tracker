'use strict';

const fs = require('fs');
const path = require('path');
const paths = require('./paths');

// Make sure that including paths.js after this file is safe
delete require.cache[require.resolve('./paths')];

const NODE_ENV = process.env.NODE_ENV;
if (!NODE_ENV) {
  throw new Error(
    'The NODE_ENV environment variable is required but was not specified.'
  );
}

// https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
var dotenvFiles = [
  `${paths.dotenv}.${NODE_ENV}.local`,
  // Don't include `.env.local` for `test` environment
  // because normally you expect tests to produce same results on CI and local machine
  NODE_ENV !== 'test' && `${paths.dotenv}.local`,
  `${paths.dotenv}.${NODE_ENV}`,
  paths.dotenv,
].filter(Boolean);

// Load environment variables from .env* files. Suppress warnings using silent
// if this file is missing. dotenv will not modify any environment variables
// that have already been set. For example, if you have `FOO=bar` in your .env file
// and you run `FOO=baz npm start`, then `FOO` will be `baz` in your code.
// https://github.com/motdotla/dotenv
// https://github.com/motdotla/dotenv-expand
dotenvFiles.forEach(dotenvFile => {
  if (fs.existsSync(dotenvFile)) {
    require('dotenv-expand')(
      require('dotenv').config({
        path: dotenvFile,
      })
    );
  }
});

// We support resolving modules according to `NODE_PATH`.
// This lets you use absolute paths in imports inside large projects.
// It works similar to `fallback` behavior in node module resolution:
// https://github.com/facebookincubator/create-react-app/issues/253
// https://nodejs.org/api/all.html#modules_loading_from_the_global_folders
// Note that unlike in Node.js, these paths are not absolute. They are relative to
// the current working directory (e.g. `src` or `node_modules`).
// We temporarily add them to our BROWSER_PATH to allow importing things like
// `config/env` or `config/paths`.
const appDirectory = fs.realpathSync(process.cwd());
process.env.NODE_PATH = (process.env.NODE_PATH || '')
  .split(path.delimiter)
  .filter(folder => folder && !path.isAbsolute(folder))
  .map(folder => path.resolve(appDirectory, folder))
  .join(path.delimiter);

// Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be
// injected into the application via DefinePlugin in Webpack configuration.
const REACT_APP = /^REACT_APP_/i;

function getClientEnvironment(publicUrl) {
  const raw = Object.keys(process.env)
    .filter(key => REACT_APP.test(key))
    .reduce(
      (env, key) => {
        env[key] = process.env[key];
        return env;
      },
      {
        // Useful for knowing whether we are in development, production or a test environment.
        NODE_ENV: process.env.NODE_ENV || 'development',
        // Useful for resolving the correct path to static assets in `public`.
        PUBLIC_URL: publicUrl,
        // We support configuring the socket host explicitly in development.
        // https://github.com/facebook/create-react-app/issues/8636
        WDS_SOCKET_HOST: process.env.WDS_SOCKET_HOST,
        WDS_SOCKET_PATH: process.env.WDS_SOCKET_PATH,
        WDS_SOCKET_PORT: process.env.WDS_SOCKET_PORT,
      }
    );
  // Stringify all values so we can feed into Webpack's DefinePlugin
  const stringified = {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {}),
  };

  return { raw, stringified };
}

module.exports = getClientEnvironment;