describe("Test 1", function () {
  describe("New Paste", async () => {
    before(async function () {
      await browser.url("https://pastebin.com/");
    });
    after(async () => await browser.pause(8000));

    it("should paste text", async function () {
      const element = await $("#postform-text");
      await element.addValue("Hello from WebDriver");
      const content = await element.getValue();
      expect(content).toEqual("Hello from WebDriver");
    });
    it("should paste expiration ", async function () {
      const selectBoxVisible = await $(
        '//label[text() = "Paste Expiration:"]/following-sibling::*[1]'
      );
      await selectBoxVisible.click();
      if (await $("#select2-postform-expiration-results").isDisplayed()) {
        const option = await $('//ul/li[text()="10 Minutes"]');
        if (option.isDisplayed()) {
          await option.click();
        }
      }
      let element = await $(
        '//select[@id="postform-expiration"]/option[@value="10M"]'
      );
      expect(await element.isSelected()).toEqual(true);
      expect(
        await $(
          '//label[text() = "Paste Expiration:"]/following-sibling::*[1]'
        ).getText()
      ).toEqual("10 Minutes");
    });
    it("should paste name/title ", async function () {
      const element = await $("#postform-name");
      await element.addValue("helloweb");
      const content = await element.getValue();
      expect(content).toEqual("helloweb");
    });
  });
});
