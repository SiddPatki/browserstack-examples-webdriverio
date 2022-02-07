import { expect } from 'chai';
import { default as AxeBuilder } from "@axe-core/webdriverio";

describe('Accessibility test', () => {

  beforeEach('Open StackDemo', async () => {
    await browser.url('');
  })

  afterEach('clear sessionstorage', async () => {
    await browser.execute(() => sessionStorage.clear())
  })

  it('Performs accessibility tests', async () => {

    const signInButton = await $('#signin')
    await signInButton.click();
    await (await $('.login_wrapper')).waitForDisplayed({ timeout: 3000 });
    const builder = new AxeBuilder({ client: browser }).withRules('color-contrast');

    //const builder = new AxeBuilder({ client: browser }).withRules([])
    // this can be used to run the accessibility tests using a specific set of accessibility rules
    //const builder = new AxeBuilder({ client: browser }).withTags([]) 
    // this can be used to run the accessibility tests on a specific tag instead of full page

    const results = await builder.analyze();
    const violations = JSON.stringify(results.violations, null, 1);
    console.log(violations);
    
    await expect(violations).to.be.empty;
     //There are 8 accessibility violations in the demo website.
  });
});