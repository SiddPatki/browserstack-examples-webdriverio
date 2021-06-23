import { expect } from 'chai';

describe('StackDemo filters', () => {

  beforeEach('Open StackDemo', async () => {
    await browser.url('');
  })

  afterEach('clear sessionstorage', async () => {
    await browser.execute(() => sessionStorage.clear())
  })

  it('Apply vendor filter', async () => {
    await ( await $("input[value='Apple'] + span")).click();
    await browser.pause(5000)                                               // Example for static wait
    const all_phones = (await $$(".shelf-item__title")).map(async function (element) {
      return await element.getText()
    });
    expect(all_phones.filter(async (x) => (await x).includes('iPhone')).length).to.equal(all_phones.length, "Vendor filter is not applied");
  })
})
