import { expect } from 'chai';
import * as accounts from '../../../../resources/data/user.json';

describe('StackDemo login', () => {

  beforeEach('Open StackDemo', async () => {
    await browser.url('');
  })

  afterEach('clear sessionstorage', () => {
    browser.execute(() => sessionStorage.clear())
  })

  it(`Login sholud be successful for account with username 'existing_orders_user'`, async function () {
    await (await $('#signin')).click();
    await (await $('#username input')).setValue(accounts[2].username + '\n');
    await (await $('#password input')).setValue(accounts[2].password + '\n');
    await (await $('#login-btn')).click();

    expect(await (await $('.username')).getText()).to.equal(accounts[2].username);
    await (await $('#logout')).click();
  });
})
