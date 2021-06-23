import { expect } from 'chai';
import * as accounts from '../../../../resources/data/user.json';

describe('StackDemo user suite', () => {

  beforeEach('Open StackDemo', async () => {
    await browser.url('');
  })

  afterEach('clear sessionstorage', async () => {
    await browser.execute(() => sessionStorage.clear())
  })

  it('Login with user having existing orders', async () => {
    await (await $('#signin')).click();
    await (await $('#username input')).setValue(accounts[3].username + '\n');
    await (await $('#password input')).setValue(accounts[3].password + '\n');
    await (await $('#login-btn')).click();
    expect(await ( await $('.username')).getText()).to.equal('existing_orders_user');

    await ( await $('#orders')).click();
    await ( await $(".order")).waitForDisplayed({ timeout: 5000 });
    expect(await $$('.order')).to.have.length(5);
  })
})
