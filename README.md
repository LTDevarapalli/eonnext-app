## Appium Setup

**Ensure you are on a sufficient node version BEFORE beginning!**

Requires node: "^16.13.0 || >=18.0.0". (Written using 20.0.0)

Install node modules for this folder:
`yarn install`

Install appium globally:
`npm i -g appium@next`

Install drivers for iOS & Android:
```
appium driver install xcuitest # iOS
appium driver install uiautomator2 # Android
```

Install Carthage (Required for iOS):
`brew install carthage`

Install appium doctor:
`npm install appium-doctor -g`

Run appium doctor to ensure your setup is complete:
`appium-doctor`

## Running Appium tests locally (fiddly)

**Ensure simulator is open with the app installed before running:**

Run for iOS:
```yarn ios.app```

Run for android:
```yarn android.app```

NOTES:
- The default is dev environment!
- If you are having trouble getting the tests to run, you may need to
specify the device name and platform in the config folder for the
relevant platform. (eg iOS -> config/wdio.ios.app.conf.ts)

Setup is based on:
https://webdriver.io/docs/boilerplates/
`https://github.com/webdriverio/appium-boilerplate/`


## Running Appium tests via SauceLabs (easy/recommended!)

1. In `apps/e2e/config/saucelabs/wdio.shared.sauce.conf.ts`, replace config.user and config.key to your personal SAUCE_USERNAME and SAUCE_ACCESS_KEY. These can be found by clicking the 'key' icon at the top of the SauceLabs dashboard.

Eg:
```
config.user = 'jamesmcn1;
config.key = '32434......';
```

2. Copy the `fileID` of the build you want to run the tests on, ensuring to choose the correct platform and environment.These can be accessed on the SauceLabs dashboard in the 'App Management' section. `fileID` should be in the format: `e67521cf-b648-4278-a741-54688022040d`

3. In the `apps/e2e` directory, run the relevant script for the platform of your choice, passing the `fileID` afterwards. Eg:

`yarn run android.sauce.rdc.app.eu FILE_ID` or
`yarn run ios.sauce.rdc.app.eu FILE_ID`

*NOTE* If the build is for the *prod* environment, you'll need to add the word 'prod' afterwards. Eg:
`yarn run android.sauce.rdc.app.eu FILE_ID prod`



#
### Appium Inspector

Appium inspector helps debug tests and identify correct selectors to use.

To connect the inspector, set the following values, leaving the host as 0.0.0.0 and the port as default
 ```
platformName: "iOS"
"appium:deviceName": iPhone 14 Pro
"appium:platformVersion": 16.1
"appium:automationName": XCUITest
```

There is probably a more elegant way of doing this, but starting appium from the terminal and then clicking connect should load the UI.

Then, you can run the tests using the commands above.

#
### Usage

The Appium documentation is poor and not helpful for our use case. The best bet is to look at [Webdriver documentation](https://webdriver.io/docs/api), specifically the browser(driver), and element methods.

### Helpers

We have created some helpers, alongside the helpers which came with the boilerplate:

- `findElementByText` (`tests/helpers/Utils.ts`)

Screen Recording:
- `startScreenRecord` (`tests/helpers/Utils.ts`)
- `saveScreenRecord` (`tests/helpers/Utils.ts`)

This records screen on test suites.
Add startScreenRecord in before hook, and saveScreenRecord at end of after hook (pass in name of test suite)
