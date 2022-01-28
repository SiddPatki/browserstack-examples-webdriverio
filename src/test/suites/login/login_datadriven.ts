import { expect } from 'chai';
import * as items from '../../../../resources/data/login_cases.json';

describe('Password input validation', function () {
  items.forEach((item: { username: string; password: string; expected_message: string; }) => {

    beforeEach('Open StackDemo', async () => {
      await browser.url('');
    })

    afterEach('clear sessionstorage', async () => {
      await browser.execute(() => sessionStorage.clear())
    })

    it(`Login should not be successful for account with username ''`, async () => {
      const signInButton = await $('#signin')
      await signInButton.click();
      const userNameField = await $('#username input')
      await userNameField.setValue(item.username + '\n');
      const passwordField = await $('#password input')
      await passwordField.setValue(item.password + '\n');
      const logInButton = await $('#login-btn')
      await logInButton.click();

      const errorMessage = await $('.api-error')

      await expect(await errorMessage.getText()).to.equal(item.expected_message);
    });
  })
});
