// logger.js

// Define severity levels. Higher numbers are more severe.
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

// Set the current log level from an environment variable, defaulting to 'info'.
// In production, you might set LOG_LEVEL=warn to reduce noise.
// In development, you can set LOG_LEVEL=debug for maximum detail.
const currentLevel = process.env.LOG_LEVEL || 'info';
const severity = levels[currentLevel.toLowerCase()] ?? levels.info;

const log = (level, ...args) => {
  // Only log messages that are at or above the configured severity
  if (levels[level] > severity) {
    return;
  }

  const timestamp = new Date().toISOString();
  const levelFormatted = `[${level.toUpperCase()}]`.padEnd(7); // for alignment

  // Format arguments to be readable, converting objects to JSON strings
  const message = args.map(arg => {
      if (typeof arg === 'object' && arg !== null) {
        return JSON.stringify(arg, null, 2); // Pretty-print JSON
      }
      return arg;
    }).join(' ');

  console.log(`[${timestamp}] ${levelFormatted} ${message}`);
};

module.exports = {
  error: (...args) => log('error', ...args),
  warn: (...args) => log('warn', ...args),
  info: (...args) => log('info', ...args),
  debug: (...args) => log('debug', ...args), // Added debug level
};