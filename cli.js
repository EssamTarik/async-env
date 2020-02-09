#!/usr/bin/env node

const spawn = require('cross-spawn');
const path = require('path');
const args = require('yargs').argv

const defaultConfigLoaderPath = 'async-env.js';

const injectConfigToEnv = (config) => {
  const configKeys = Object.keys(config);
  for (let key of configKeys) {
    const configValue = config[key];
    process.env[key] = configValue;
  }
}

const loadConfig = async ({ configLoaderPath }) => {
  const configLoader = require(configLoaderPath);
  const config = await configLoader();
  injectConfigToEnv(config);
}

const validateArgs = ({ command }) => {
  if (!command.length) {
    throw new Error('No executable command provided!')
  }
}

const main = async () => {
  const command = args._;
  const configLoaderPath = path.resolve(args.p || args.path || defaultConfigLoaderPath);

  validateArgs({ command });

  await loadConfig({ configLoaderPath });

  spawn(command[0], command.slice(1), { stdio: 'inherit' })
    .on('exit', process.exit)
}

main()
  .catch(console.error);