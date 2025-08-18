'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const chalk = require('react-dev-utils/chalk');
const paths = require('./paths');

// Ensure the certificate and key provided are valid and if not
// throw an easy to debug error
function validateKeyAndCerts({ cert, key, keyFile, crtFile }) {
  let encrypted;
  try {
    // publicEncrypt will throw an error with an invalid cert
    encrypted = crypto.publicEncrypt(cert, Buffer.from('test'));
  } catch (err) {
    throw new Error(
      `The certificate "${chalk.yellow(crtFile)}" is invalid.\n${err.message}`
    );
  }

  try {
    // privateDecrypt will throw an error with an invalid key
    crypto.privateDecrypt(key, encrypted);
  } catch (err) {
    throw new Error(
      `The certificate key "${chalk.yellow(keyFile)}" is invalid.\n${
        err.message
      }`
    );
  }
}

// Read file and throw an error if it doesn't exist
function readEnvFile(file, type) {
  if (!fs.existsSync(file)) {
    throw new Error(
      `You specified ${chalk.cyan(
        type
      )} in your env, but the file "${chalk.yellow(file)}" can't be found.`
    );
  }
  return fs.readFileSync(file);
}

// Get the https config
// Return cert files if provided in env, otherwise just true or false
const selfsigned = require('selfsigned'); // npm install selfsigned



function getHttpsConfig() {
  const { SSL_CRT_FILE, SSL_KEY_FILE, HTTPS } = process.env;
  const isHttps = HTTPS === 'true';

  if (!isHttps) {
    return null; // Explicitly return null when HTTPS is disabled
  }

  // HTTPS=true but no certificate files specified
  if (!SSL_CRT_FILE || !SSL_KEY_FILE) {
    console.log('Generating temporary self-signed certificate...');
    const attrs = [{ name: 'commonName', value: 'localhost' }];
    return selfsigned.generate(attrs, {
      days: 30,
      keySize: 2048,
      algorithm: 'sha256'
    });
  }

  // HTTPS=true with custom certificates
  const crtFile = path.resolve(paths.appPath, SSL_CRT_FILE);
  const keyFile = path.resolve(paths.appPath, SSL_KEY_FILE);

  if (!fs.existsSync(crtFile)) {
    throw new Error(`SSL certificate file not found: ${crtFile}`);
  }
  if (!fs.existsSync(keyFile)) {
    throw new Error(`SSL key file not found: ${keyFile}`);
  }

  return {
    cert: fs.readFileSync(crtFile),
    key: fs.readFileSync(keyFile)
  };
}

module.exports = getHttpsConfig;