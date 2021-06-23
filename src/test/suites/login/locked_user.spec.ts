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
    await ( await $('#signin')).click();
    await ( await $('#username input')).setValue(accounts[1].username + '\n');
    await ( await $('#password input')).setValue(accounts[1].password + '\n');
    await ( await $('#login-btn')).click();

    expect(await ( await $('.api-error')).getText()).to.equal('Your account has been locked.');
  });
})
