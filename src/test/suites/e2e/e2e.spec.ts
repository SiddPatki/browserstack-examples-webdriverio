import { HomePage } from '../../../app/pages/homePage';
import { SignInPage } from '../../../app/pages/signInPage';
import { CheckoutPage } from '../../../app/pages/checkoutPage';
import { ConfirmationPage } from '../../../app/pages/confirmationPage';
import { OrdersPage } from '../../../app/pages/ordersPage';
import { expect } from 'chai';
import * as accounts from '../../../../resources/data/user.json';


describe('Order a product', () => {

  beforeEach('Open StackDemo', async () => {
    await browser.url('');
  })

  afterEach('clear sessionstorage', async () => {
    await browser.execute(() => sessionStorage.clear())
  })

  it('Login and order a product', async () => {

    const homePage = new HomePage();
    await homePage.navigateToSignIn();

    const signInPage = new SignInPage();
    await signInPage.login(accounts[0].username, accounts[0].password);
    await expect(await (await signInPage.getSignedInUsername()).getText()).to.equal(accounts[0].username);

    await homePage.selectPhone('iPhone XS');
    await homePage.closeCartModal();
    await homePage.selectPhone('Galaxy S20');
    await homePage.clickBuyButton();

    const checkoutPage = new CheckoutPage();

    await checkoutPage.enterFirstName('firstname');
    await checkoutPage.enterLastName('lastname');
    await checkoutPage.enterAddressLine1('address');
    await checkoutPage.enterProvince('state');
    await checkoutPage.enterPostCode('12345');
    await checkoutPage.clickSubmit();

    const confirmationPage = new ConfirmationPage();

    await confirmationPage.waitForConfirmationToBeDisplayed();
    await expect(await (await confirmationPage.confirmationMessage).getText()).to.equal('Your Order has been successfully placed.');

    if(browser.config.user && !driver.isMobile){
      await confirmationPage.clickDownloadPdf();
      const fileDownloadCheck = await confirmationPage.downloadedFileExists();
      await expect(fileDownloadCheck).to.equal(true);

    }
    await confirmationPage.clickContinueShoppingButton();

    await homePage.navigateToOrders();

    const ordersPage = new OrdersPage();
    await ordersPage.waitforOrdersToDisplay();
    await expect(await ordersPage.allOrders).to.have.length(1);
  })
})

