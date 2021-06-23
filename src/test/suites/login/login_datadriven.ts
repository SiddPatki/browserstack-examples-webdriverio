import { expect } from 'chai';
import * as items from '../../../../resources/data/login_cases.json';

describe('Password input validation', function () {
  items.forEach((item: { username: string; password: string; expected_message: string; }) => {

    beforeEach('Open StackDemo', async () => {
      await browser.url('');
    })

    afterEach('clear sessionstorage', async () => {
      await browser.execute(() => sessionStorage.clear())
    })

    it(`Login should not be successful for account with username ''`, async () => {
      await ( await $('#signin')).click();
      await ( await $('#username input')).setValue(item.username + '\n');
      await ( await $('#password input')).setValue(item.password + '\n');
      await ( await $('#login-btn')).click();

      expect(await ( await $('.api-error')).getText()).to.equal(item.expected_message);
    });
  })
});
