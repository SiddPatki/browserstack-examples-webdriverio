import { expect } from 'chai';
import * as accounts from '../../../../resources/data/user.json';

describe('StackDemo user suite', () => {

  beforeEach('Open StackDemo', async () => {
    await browser.url('');
  })

  afterEach('clear sessionstorage', async () => {
    await browser.execute(() => sessionStorage.clear())
  })

  it('Logged in user should be able to add favourite', async () => {
    const signIn = await $('#signin')
    await signIn.click();
    const userNameField = await $('#username input')
    await userNameField.setValue(accounts[3].username + '\n');
    const passwordField = await $('#password input')
    await passwordField.setValue(accounts[3].password + '\n');
    const loginButton = await $('#login-btn')
    await loginButton.click();

    const iphone12 = await $("//p[text() = 'iPhone 12']/../div/button")
    await iphone12.waitForDisplayed({ timeout: 5000 });
    await iphone12.click();

    const favouritesButton = await $('#favourites')
    await favouritesButton.click();

    await browser.waitUntil(async () => {
      const pageUrl = await browser.getUrl();
      return pageUrl.indexOf('favourites') > -1;
    }, { timeout: 5000 })
    await browser.pause(5000)
    expect((await $$('p.shelf-item__title')).map(async e => await e.getText())).to.contain('iPhone 12');
  })
})
