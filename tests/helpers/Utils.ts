export async function findElementByText(
  text: string,
  opts: object = {timeout: 10000, interval: 100},
) {
  await driver.pause(5000);
  const selector = await driver.findElement(
    'xpath',
    `//*[@${driver.isIOS ? 'label' : 'text'}="${text}"]`,
  );
  const element = await driver.$(selector);
  try {
    await element.waitForDisplayed(opts);
  } catch {
    // if not existing, wait 5 seconds then try again
    await driver.pause(5000);
    await element.waitForDisplayed(opts);
  }
  return element;
}

export async function scrollDown(resourceId: string) {
  if (driver.isAndroid) {
    await $(
      `android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().resourceIdMatches(".*:id/${resourceId}"))`,
    );
    await driver.pause(3000);
  } else {
    await driver.execute('mobile:scroll', {direction: 'down'});
  }
}

// SCREEN RECORDING
// (ANDROID CAN ALSO BE HANDLED SEPERATELY OUTSIDE OF THE TEST SCRIPT AT THE EMULATOR LEVEL)
// NOT NEEDED FOR SAUCELABS

export async function startScreenRecord() {
  await driver.startRecordingScreen();
}

export async function saveScreenRecord(testSuite: String) {
  const recordingfilePath = driver.isIOS
    ? `/Users/vagrant/deploy/ios_entire_test_video_${testSuite}.mp4`
    : `/bitrise/deploy/android_entire_test_video_${testSuite}.mp4`;
  await driver.saveRecordingScreen(recordingfilePath);
}

/**
 * Get the time difference in seconds
 */
export function timeDifference(string: string, start: number, end: number) {
  const elapsed = (end - start) / 1000;
  console.log(`${string} It took ${elapsed} seconds.`);
}

/**
 * Create a cross platform solution for opening a deep link
 */
export async function openDeepLinkUrl(url: string) {
  const prefix = 'wdio://';

  if (driver.isAndroid) {
    // Life is so much easier
    return driver.execute('mobile:deepLink', {
      url: `${prefix}${url}`,
      package: 'com.wdiodemoapp',
    });
  }

  // We can use `driver.url` on iOS simulators, but not on iOS real devices. The reason is that iOS real devices
  // open Siri when you call `driver.url('')` to use a deep link. This means that real devices need to have a different implementation
  // then iOS sims
  // iOS sims and real devices can be distinguished by their UDID. Based on these sources there is a diff in the UDIDS
  // - https://blog.diawi.com/2018/10/15/2018-apple-devices-and-their-new-udid-format/
  // - https://www.theiphonewiki.com/wiki/UDID
  // iOS sims have more than 1 `-` in the UDID and the UDID is being
  const simulatorRegex = new RegExp('(.*-.*){2,}');

  // Check if we are a simulator
  if (
    'udid' in driver.capabilities &&
    simulatorRegex.test(driver.capabilities.udid as string)
  ) {
    await driver.url(`${prefix}${url}`);
  } else {
    // Else we are a real device and we need to take some extra steps
    // Launch Safari to open the deep link
    await driver.execute('mobile: launchApp', {
      bundleId: 'com.apple.mobilesafari',
    });

    // Add the deep link url in Safari in the `URL`-field
    // This can be 2 different elements, or the button, or the text field
    // Use the predicate string because  the accessibility label will return 2 different types
    // of elements making it flaky to use. With predicate string we can be more precise
    const addressBarSelector = 'label == "Address" OR name == "URL"';
    const urlFieldSelector =
      'type == "XCUIElementTypeTextField" && name CONTAINS "URL"';
    const addressBar = $(`-ios predicate string:${addressBarSelector}`);
    const urlField = $(`-ios predicate string:${urlFieldSelector}`);

    // Wait for the url button to appear and click on it so the text field will appear
    // iOS 13 now has the keyboard open by default because the URL field has focus when opening the Safari browser
    if (!(await driver.isKeyboardShown())) {
      await addressBar.waitForDisplayed();
      await addressBar.click();
    }

    // Submit the url and add a break
    await urlField.setValue(`${prefix}${url}\uE007`);
  }

  /**
   * PRO TIP:
   * if you started the iOS device with `autoAcceptAlerts:true` in the capabilities then Appium will auto accept the alert that should
   * be shown now. You can then comment out the code below
   */
  // Wait for the notification and accept it
  // When using an iOS simulator you will only get the pop-up once, all the other times it won't be shown
  try {
    const openSelector =
      "type == 'XCUIElementTypeButton' && name CONTAINS 'Open'";
    const openButton = $(`-ios predicate string:${openSelector}`);
    // Assumption is made that the alert will be seen within 2 seconds, if not it did not appear
    await openButton.waitForDisplayed({timeout: 2000});
    await openButton.click();
  } catch (e) {
    // ignore
  }
}
