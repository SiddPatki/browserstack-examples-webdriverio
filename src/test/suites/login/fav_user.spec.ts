import { expect } from 'chai';
import * as accounts from '../../../../resources/data/user.json';

describe('StackDemo login', () => {

  beforeEach('Open StackDemo', async () => {
    await browser.url('');
  })

  afterEach('clear sessionstorage', async () => {
    await browser.execute(() => sessionStorage.clear())
  })

  it(`Login sholud be successful for account with username 'fav_user'`, async function () {
    const signInButton = await $('#signin');
    await signInButton.click();
    const userNameField = await $('#username input')
    await userNameField.setValue(accounts[0].username + '\n');
    const passwordField = await $('#password input')
    await passwordField.setValue(accounts[0].password + '\n');
    const loginButton = await $('#login-btn')
    await loginButton.click();

    const userName = await $('.username')
    await expect(await userName.getText()).to.equal(accounts[0].username);
    const logOutButton = await $('#logout')
    await logOutButton.click();
  });
})
