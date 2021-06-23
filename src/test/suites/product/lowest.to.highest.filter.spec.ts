import { expect } from 'chai';
import * as _ from 'lodash';

describe('StackDemo filters', () => {

  beforeEach('Open StackDemo', async () => {
    await browser.url('');
  })

  afterEach('clear sessionstorage', async () => {
    await browser.execute(() => sessionStorage.clear())
  })

  it('Lowest to Highest filter is applied', async () => {
    await ( await $('.sort select')).selectByAttribute('value', 'lowestprice');
    await browser.waitUntil(
      async () => await (await $("//*[@class = 'shelf-item__title'][1]")).getText() === 'Pixel 2',
      {
        timeout: 5000,
        timeoutMsg: 'expected filtering to happen within 5s'
      }
    );
    const all_prices = (await $$(".val > b")).map(async function (element) {
      return parseInt(await element.getText())
    });
    expect(_.isEqual(all_prices, _.orderBy(all_prices, [], ['asc']))).to.equal(true, "Lowest to Highest filter is not applied");
  })
})
