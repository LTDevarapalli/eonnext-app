import { join } from 'node:path';
import config from './wdio.shared.local.appium.conf';

// ============
// Specs
// ============
config.specs = ['./tests/specs/**/app.login.spec.ts'];

config.capabilities = [
  {
    platformName: 'iOS',
    maxInstances: 1,
    'appium:isHeadless': false,
    'appium:deviceName': 'iPhone 15 Pro Max',
    'appium:platformVersion': '17.2',
    'appium:orientation': 'PORTRAIT',
    'appium:automationName': 'XCUITest',
    'appium:newCommandTimeout': 240,
    'appium:fullReset': false, 
    'appium:noReset': false, 
    'appium:app': join(
      process.cwd(),
      'apps',
      // Change this name according to the app version you downloaded
      'ios.simulator.wdio.native.app.v1.0.8.zip')
  },
];

exports.config = config;
