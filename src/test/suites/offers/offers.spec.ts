import { expect } from 'chai';
import * as accounts from '../../../../resources/data/user.json';

describe('StackDemo Offers', () => {

  beforeEach('Open StackDemo', async () => {
    await browser.url('');
  })

  afterEach('clear sessionstorage', async () => {
    await browser.execute(() => sessionStorage.clear())
  })

  it('Check offers for India', async () => {
    const signIn = await $('#signin')
    await signIn.click();
    const userNameField = await $('#username input')
    await userNameField.setValue(accounts[0].username + '\n');
    const passwordField = await $('#password input')
    await passwordField.setValue(accounts[0].password + '\n');
    const logInButton = await $('#login-btn')
    await logInButton.click();

    await browser.execute(() => {
        window.navigator.geolocation.getCurrentPosition = function (success) {
          const position: GeolocationPosition = { coords: { latitude: 1, longitude: 103, accuracy: 20, altitude: null, altitudeAccuracy: null, heading: null, speed: null }, timestamp: Date.now() };
          success(position);
        };
      });
    const offersButton = await $('#offers')
    await offersButton.click();

    const offer  = await $(".offer")
    await offer.waitForDisplayed({ timeout: 5000 });
    await expect(await $$('.offer')).to.have.length(3);
  })
})

