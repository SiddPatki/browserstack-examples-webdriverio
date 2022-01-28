import { expect } from 'chai';
import * as accounts from '../../../../resources/data/user.json';

describe('StackDemo user suite', () => {

  beforeEach('Open StackDemo', async () => {
    await browser.url('');
  })

  afterEach('clear sessionstorage', async () => {
    await browser.execute(() => sessionStorage.clear())
  })

  it('User with favourites should see 5 items', async () => {
    const signInButton = await $('#signin')
    await signInButton.click();
    const userNameField = await $('#username input')
    await userNameField.setValue(accounts[0].username + '\n');
    const passwordField = await $('#password input')
    await passwordField.setValue(accounts[0].password + '\n');
    const loginButton = await $('#login-btn')
    await loginButton.click();

    const favouritesButton = await $('#favourites')
    await favouritesButton.click();

    await browser.waitUntil(async () => {
      const pageUrl = await browser.getUrl();
      return pageUrl.indexOf('favourites') > -1
    }, { timeout: 5000 })

    await expect(await $$('.shelf-item')).to.have.length(5);
  })
})
