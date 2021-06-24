import { expect } from 'chai';
import * as accounts from '../../../../resources/data/user.json';
describe('StackDemo login', () => {

  beforeEach('Open StackDemo', async () => {
    await browser.url('');
  })

  afterEach('clear sessionstorage', async () => {
    await browser.execute(() => sessionStorage.clear())
  })

  it(`Login sholud not be successful for account with username 'locked_user'`, async function () {
    const signInButton = await $('#signin')
    await signInButton.click();
    const userNameField = await $('#username input')
    await userNameField.setValue(accounts[1].username + '\n');
    const passwordField = await $('#password input')
    await passwordField.setValue(accounts[1].password + '\n');
    const logInButton = await $('#login-btn')
    await logInButton.click();
    
    const errorMessage = await $('.api-error')

    expect(await errorMessage.getText()).to.equal('Your account has been locked.');
  });
})
