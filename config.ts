// Grab the current node env. Default it to production
const NODE_ENV = process.env.NODE_ENV || 'production';

// Default configuration file
const { default: defaultConfig } = require('./configs/default.config');

// Environment config file
const { default: environmentConfig } = require(`./configs/${NODE_ENV}.config`);

// Combined the config files, prioritizing the environmental config file
const combinedConfig = {
  ...defaultConfig,
  ...environmentConfig,
};

// Export it
export default combinedConfig;
