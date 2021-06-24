describe('StackDemo login', () => {

  beforeEach('Open StackDemo', async () => {
    await browser.url('');
  })

  afterEach('clear sessionstorage', async () => {
    await browser.execute(() => sessionStorage.clear())
  })

  it('Navigated to login on clicking favourites Nav Item', async () => {
    const favourites = await $('#favourites')
    await favourites.click();

    browser.waitUntil(async () => {
      const pageUrl = await browser.getUrl();
      return pageUrl.indexOf('signin?favourites=true') > -1
    }, { timeout: 5000 })
  })

})
