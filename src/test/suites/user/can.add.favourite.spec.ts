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
    await ( await $('#signin')).click();
    await ( await $('#username input')).setValue(accounts[3].username + '\n');
    await ( await $('#password input')).setValue(accounts[3].password + '\n');
    await ( await $('#login-btn')).click();

    await ( await $("//p[text() = 'iPhone 12']/../div/button")).waitForDisplayed({ timeout: 5000 });
    await ( await $("//p[text() = 'iPhone 12']/../div/button")).click();

    await ( await $('#favourites')).click();

    await browser.waitUntil(async () => {
      const pageUrl = await browser.getUrl();
      return pageUrl.indexOf('favourites') > -1;
    }, { timeout: 5000 })
    await browser.pause(5000)
    expect((await $$('p.shelf-item__title')).map(async e => await e.getText())).to.contain('iPhone 12');
  })
})
