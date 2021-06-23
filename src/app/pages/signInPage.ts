import { Page } from "./basePage";
/**
 * sub page containing specific selectors and methods for a specific page
 */
export class SignInPage extends Page {
  /**
   * define selectors using getter methods
   */
  get inputUsername(): Promise<WebdriverIO.Element> {
    return $('#username input')
  }

  get inputPassword(): Promise<WebdriverIO.Element> {
    return $('#password input')
  }

  get btnSubmit(): Promise<WebdriverIO.Element> {
    return $('#login-btn')
  }

  get signedInUsername(): Promise<WebdriverIO.Element> {
    return $('.username')
  }

  async login(username: string, password: string): Promise<void> {
    await browser.pause(5000)
    const usernameField = await this.inputUsername;
    await usernameField.setValue(username + '\n');
    const passwordField = await this.inputPassword
    await passwordField.setValue(password + '\n');
    const submitButton = await this.btnSubmit
    await submitButton.click();
  }

  async getSignedInUsername(): Promise<WebdriverIO.Element> {
    return await this.signedInUsername;
  }


}
