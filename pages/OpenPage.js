class OpenPage {
  constructor(url) {
    this.url = url;
  }

  async load() {
    await browser.url(this.url);
  }

  async successOpened() {
    return await $("title").isExisting();
  }

  async clickBtn(selector) {
    await $(selector).click();
  }
}

module.exports = OpenPage;
