import { expect } from 'chai';
import * as accounts from '../../../../resources/data/user.json';

describe('StackDemo user suite', () => {

  beforeEach('Open StackDemo', async () => {
    await browser.url('');
  })

  afterEach('clear sessionstorage', async () => {
    await browser.execute(() => sessionStorage.clear())
  })

  it('All product images should load for user',async () => {
    await (await $('#signin')).click();
    await (await $('#username input')).setValue(accounts[2].username + '\n');
    await (await $('#password input')).setValue(accounts[2].password + '\n');
    await (await $('#login-btn')).click();
    expect(await (await $('.username')).getText()).to.equal('image_not_loading_user');

    const all_images = (await $$("div.shelf-item__thumb img")).map(function (element) {
      return element.getAttribute("src");
    });

    expect(all_images.filter(async x => await x === '').length).to.equal(0, 'One or more images for this user has not loaded.');
  })
})
