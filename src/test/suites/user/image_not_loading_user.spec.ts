import { expect } from 'chai';
import * as accounts from '../../../../resources/data/user.json';

describe('StackDemo user suite', () => {

  beforeEach('Open StackDemo', async () => {
    await browser.url('');
  })

  afterEach('clear sessionstorage', async () => {
    await browser.execute(() => sessionStorage.clear())
  })

  it('All product images should load for user', async function () {
    const signInButton = await $('#signin')
    await signInButton.click();
    const userNameField = await $('#username input')
    await userNameField.setValue(accounts[2].username + '\n');
    const passwordField = await $('#password input')
    await passwordField.setValue(accounts[2].password + '\n');
    const loginButton = await $('#login-btn')
    await loginButton.click();

    const userName = await $('.username')
    await expect(await userName.getText()).to.equal('image_not_loading_user');

    const all_images = (await $$("div.shelf-item__thumb img")).map(async function (element) {
      return element.getAttribute("src");
    });
    await expect(all_images.filter(async (x) => (await x) === '').length).to.equal(25, 'One or more images for this user has not loaded.');
  })
})
