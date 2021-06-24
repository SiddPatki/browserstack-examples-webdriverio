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
    const signIn = await $('#signin')
    await signIn.click();
    const userNameField = await $('#username input')
    await userNameField.setValue(accounts[3].username + '\n');
    const passwordField = await $('#password input')
    await passwordField.setValue(accounts[3].password + '\n');
    const loginButton = await $('#login-btn')
    await loginButton.click();

    const userName = await $('.username')
    expect(await userName.getText()).to.equal('existing_orders_user');

    const ordersButton = await $('#orders')
    await ordersButton.click();
    const orderListElement = await $(".order")
    await orderListElement.waitForDisplayed({ timeout: 5000 });
    expect(await $$('.order')).to.have.length(5);
  })
})
