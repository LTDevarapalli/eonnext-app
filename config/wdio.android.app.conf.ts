import { join } from 'node:path';
import config from './wdio.shared.local.appium.conf';

config.specs = [
    './tests/specs/**/app*.spec.ts',
];

config.capabilities = [
    {
        platformName: 'Android',
        maxInstances: 1,
        'appium:orientation': 'PORTRAIT',
        'appium:automationName': 'UiAutomator2',
        'appium:newCommandTimeout': 240,
        "appium:fullReset": false,
        "appium:noReset": false,
    },
];

exports.config = config;
