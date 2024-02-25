export default class AppScreen {
  private selector: string;

  constructor(selector: string) {
    this.selector = selector;
  }

  /**
   * Wait for the login screen to be visible
   *
   * @param {boolean} isShown
   */
  async waitForIsShown(
    isShown = true,
    timeout = 180000,
  ): Promise<boolean | void> {
    return $(this.selector).waitForDisplayed({
      timeout,
      reverse: !isShown,
    });
  }
}
