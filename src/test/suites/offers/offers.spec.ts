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
    await (await $('#signin')).click();
    await (await $('#username input')).setValue(accounts[0].username + '\n');
    await (await $('#password input')).setValue(accounts[0].password + '\n');
    await (await $('#login-btn')).click();

    await browser.execute(function () {
      window.navigator.geolocation.getCurrentPosition = function (success) {
        const position: GeolocationPosition = { coords: { latitude: 1, longitude: 103, accuracy: 20, altitude: null, altitudeAccuracy: null, heading: null, speed: null }, timestamp: Date.now() };
        success(position);
      }
    });
    await ( await $('#offers')).click();

    await ( await $(".offer")).waitForDisplayed({ timeout: 5000 });
    expect(await $$('.offer')).to.have.length(3);
  })
})

