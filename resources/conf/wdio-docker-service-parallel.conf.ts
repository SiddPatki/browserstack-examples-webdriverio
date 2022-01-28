import { config as defaultConfig } from './wdio.conf';
import * as _ from 'lodash';

const overrides = {
  specs: [
    './src/test/suites/login/*.ts',
    './src/test/suites/offers/*.ts',
    './src/test/suites/product/*.ts',
    './src/test/suites/e2e/*.ts',
    './src/test/suites/user/*.ts',
    './src/test/suites/accessibility/*.ts'
  ],
  services: ['docker'],
  dockerOptions: {
    image: 'selenium/standalone-chrome',
    healthCheck: 'http://localhost:4444',
    startDelay: 2000,
    options: {
      p: ['4444:4444'],
      shmSize: '2g'
    }
  },
  capabilities: [{
    maxInstances: 5,
    browserName: 'chrome',
    acceptInsecureCerts: true
  }],
  hostname: 'localhost',
  port: 4444,
  path: '/wd/hub'
};

export const config = _.defaultsDeep(overrides, defaultConfig);
