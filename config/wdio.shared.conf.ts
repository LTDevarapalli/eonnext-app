const connectionRetryValue = 250000;

console.log('connectionRetryValue!!!!!', connectionRetryValue);

export const config: WebdriverIO.Config = {
  runner: 'local',
  specs: [],
  capabilities: [],
  logLevel: 'trace',
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: connectionRetryValue,
  connectionRetryCount: 3,
  services: [],
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 3 * 60 * 1000, 
  },
};
