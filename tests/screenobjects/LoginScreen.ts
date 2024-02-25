import AppScreen from './AppScreen';
import {Eyes} from '@applitools/eyes-webdriverio';

class LoginScreen extends AppScreen {
  constructor() {
    super('~Email address');
  }
  private get loginButton() {
    const selector = driver.isIOS
      ? '~email-password-login-button'
      : '//android.widget.Button[@resource-id="email-password-login-button"]';
    return $(selector);
  }
  private get email() {
    const selector = driver.isIOS ? '~email-field' : '~Email address';
    return $(selector);
  }
  private get password() {
    const selector = driver.isIOS ? '~password-field' : '~Password';
    return $(selector);
  }



  async submitLoginForm({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    //Updating driver settings snapshotMaxDepth and CustomSnapshotTimeout
    // to support issues with app element tree
    driver.updateSettings({snapshotMaxDepth: 60});
    driver.updateSettings({customSnapshotTimeout: 30000});
    const eyes = new Eyes();
    eyes.setApiKey('SmdyBDsrqYN6Nbm97Ry100qfmeNHWMVaB1QlDke5MMXeVI110');
    // Clear login fields first, then set them
    await this.email.waitForExist({timeout: 180000});
    await this.email.setValue('');
    await this.password.setValue('');
    await this.email.setValue(username);
    await driver.pause(2000);
    await this.password.waitForExist({timeout: 180000});
    await driver.pause(5000);
    await this.password.setValue(password);
    await driver.pause(5000);
    eyes.open(driver, 'login', 'Login Screen Test');
    eyes.checkWindow('Login Screen');
    eyes.close();
    await driver.pause(5000); // wait for login to load
  }

}




export default new LoginScreen();
