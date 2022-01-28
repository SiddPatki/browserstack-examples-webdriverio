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

    await browser.waitUntil(
      async () => (await (await browser.getUrl()).indexOf('favourites')) > -1,
     { timeout: 5000,
    timeoutMsg: 'expected favourites to load within 5s'
  }
  );
    await browser.pause(5000)
    const fav_items = (await $$('p.shelf-item__title')).map(async function (element) {
      return element.getText()
    });
    await expect(fav_items.filter(async (x) => (await x).includes('iPhone')).length).to.equal(fav_items.length, "Vendor filter is not applied");
    // await expect(fav_items).to.contain('iPhone 12',"User was able to add favourites");
  })
})
