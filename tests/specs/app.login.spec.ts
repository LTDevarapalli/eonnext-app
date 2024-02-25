import LoginScreen from '../screenobjects/LoginScreen';
import {
  USERNAME,
  PASSWORD,
} from '../helpers/Constants';



describe('when interacting with a login form,', async () => {
  before(async () => {
      await LoginScreen.waitForIsShown();
  });

  it('should be able login successfully', async () => {
    await LoginScreen.submitLoginForm({
      username: USERNAME,
      password: PASSWORD,
    })
  });
});
