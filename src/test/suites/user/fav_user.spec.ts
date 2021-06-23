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
    await ( await $('#signin')).click();
    await ( await $('#username input')).setValue(accounts[0].username + '\n');
    await ( await $('#password input')).setValue(accounts[0].password + '\n');
    await ( await $('#login-btn')).click();

    await ( await $('#favourites')).click();

    await browser.waitUntil(async () => {
      const pageUrl = await browser.getUrl();
      return pageUrl.indexOf('favourites') > -1
    }, { timeout: 5000 })

    expect( await $$('.shelf-item')).to.have.length(5);
  })
})
