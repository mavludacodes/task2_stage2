describe("Test 2", function () {
  describe("New Paste", async () => {
    before(async function () {
      await browser.url("https://pastebin.com/");
    });
    after(async () => await browser.pause(8000));

    it("should paste text", async function () {
      const element = await $("#postform-text");
      await element.addValue(
        'git config --global user.name "New Sheriff in Town"\ngit reset $ (git commit-tree HEAD ^ {tree} -m "Legacy code")\ngit push origin master --force'
      );
      const content = await element.getValue();
      expect(content).toEqual(
        'git config --global user.name "New Sheriff in Town"\ngit reset $ (git commit-tree HEAD ^ {tree} -m "Legacy code")\ngit push origin master --force'
      );
    });

    it("should set syntax highlighting: ", async function () {
      const selectBoxVisible = await $(
        '//label[text() = "Syntax Highlighting:"]/following-sibling::*[1]'
      );
      await selectBoxVisible.click();
      if (await $("#select2-postform-format-results").isDisplayed()) {
        const option = await $(
          '//ul[@id="select2-postform-format-results"]/li[2]/ul/li[1]'
        );
        if (option.isDisplayed()) {
          await option.click();
        }
      }
      let element = await $(
        '//select[@id="postform-format"]/optgroup/option[@value="8"]'
      );
      expect(await element.isSelected()).toEqual(true);
      expect(
        await $(
          '//label[text() = "Syntax Highlighting:"]/following-sibling::*[1]'
        ).getText()
      ).toEqual("Bash");
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
      await element.addValue("how to gain dominance among developers");
      const content = await element.getValue();
      expect(content).toEqual("how to gain dominance among developers");
    });

    it("should save all changes ", async function () {
      const btn = await $(
        '//div[@class="form-group form-btn-container"]/button[text()="Create New Paste"]'
      );
      expect(await btn.getText()).toEqual("Create New Paste");
      btn.click();
    });

    it("should check title ", async function () {
      const title = await $('//div[@class="info-top"]/h1');
      await title.waitForExist({ timeout: 5000 });
      expect(await title.getText()).toEqual(
        "how to gain dominance among developers"
      );
    });
    it("should check code ", async function () {
      const list = await $('//ol[@class="bash"]').$$("li");
      let result = [];
      for (item of list) {
        result.push(await item.getText());
      }
      const output = result.join("\n");
      // console.log("output", output);
      expect(output).toEqual(
        'git config --global user.name "New Sheriff in Town"\ngit reset $ (git commit-tree HEAD ^ {tree} -m "Legacy code")\ngit push origin master --force'
      );
    });
  });
});
