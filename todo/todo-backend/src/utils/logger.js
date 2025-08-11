import config from './config.js';
const info = (...params) => {
  if (config.NODE_ENV !== 'production' && config.NODE_ENV !== 'test') {
    console.log(...params);
  }
  return null;
};

const error = (...params) => {
  if (config.NODE_ENV !== 'test') {
    console.error(...params);
  }
  return null;
};

export default {
  info,
  error,
};
