import { expect } from 'chai';
import * as accounts from '../../../../resources/data/user.json';

describe('StackDemo login', () => {

  beforeEach('Open StackDemo', async () => {
    await browser.url('');
  })

  afterEach('clear sessionstorage', async () => {
    await browser.execute(() => sessionStorage.clear())
  })

  it(`Login should be successful for account with username 'image_not_loading_user'`, async function () {
    const signInButton = await $('#signin')
    await signInButton.click();
    const userNameField = await $('#username input')
    await userNameField.setValue(accounts[2].username + '\n');
    const passwordField = await $('#password input')
    await passwordField.setValue(accounts[2].password + '\n');
    const logInButton = await $('#login-btn')
    await logInButton.click();

    const userName = await $('.username')

    expect(await userName.getText()).to.equal(accounts[2].username);
    const logOutButton = await $('#logout')
    await logOutButton.click();
  });
})
