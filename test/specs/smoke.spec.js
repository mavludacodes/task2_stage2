const OpenPage = require("../../pages/OpenPage");

describe("Smoke", function () {
  describe("Google Cloud Platform Pricing Calculator", async () => {
    const openPage = new OpenPage("https://cloud.google.com");

    before(async function () {
      await openPage.load();
    });
    after(async () => await browser.pause(8000));
    it("should load the page", async function () {
      expect(await openPage.successOpened()).toEqual(true);
    });

    it("should search by the given query", async () => {
      const searchIcon = await $('//form[@class="devsite-search-form"]');
      await searchIcon.waitForDisplayed({ timeout: 6000 });
      await searchIcon.click();
      const searchBar = await $(
        '//input[@class="devsite-search-field devsite-search-query"]'
      );
      await searchBar.waitForDisplayed({ timeout: 8000 });
      await searchBar.setValue("Google Cloud Platform Pricing Calculator");
      const query = await $("//div[@id='suggestion-partial-query-0']/a/span/b");
      expect(await query.getText()).toEqual(
        "google cloud platform pricing calculator"
      );
      const clickQuery = await $("//div[@id='suggestion-partial-query-0']");
      await clickQuery.click();
    });

    it("should go to the page based on the search query ", async function () {
      const title = await $("//div[@class='gs-title']/a/b");
      expect(await title.getText()).toEqual("Google Cloud Pricing Calculator");
      await title.click();
    });

    it("should go to the page after clicking the link", async function () {
      const iframe = await $("#cloud-site iframe");
      await iframe.waitForDisplayed({ timeout: 6000 });
      await browser.switchToFrame(iframe);
      const iframe2 = await $("#myFrame");
      await iframe2.waitForDisplayed({ timeout: 6000 });
      await browser.switchToFrame(iframe2);
      const title = await $('//h2[text()="Instances"]').getText();
      expect(title).toEqual("Instances");
    });

    it("should estimate", async function () {
      // Activate Compute Engine
      await $("//div[@title='Compute Engine']").click();

      // Number of instances
      const num_of_instances = await $(
        '//label[contains(text(),"Number of instance")]/following-sibling::input'
      );
      await num_of_instances.setValue(4);

      // Operating Systems
      await $(
        '//label[text() = "Operating System / Software"]/following-sibling::*'
      ).click();
      let container = await $(
        '//div[@class="md-select-menu-container md-active md-clickable"]'
      );
      await container.waitForDisplayed({ timeout: 4000 });

      await $(
        '//div[@class="md-select-menu-container md-active md-clickable"]//div[contains(text(), "Free: Debian, CentOS")]/..'
      ).click();

      // VM class
      await $(
        '//label[text() = "Provisioning model"]/following-sibling::*'
      ).click();
      container = await $(
        '//div[@class="md-select-menu-container md-active md-clickable"]'
      );
      await container.waitForDisplayed({ timeout: 4000 });
      await $(
        '//div[@class="md-select-menu-container md-active md-clickable"]//div[text() = "Regular"]/..'
      ).click();

      // Instance type
      await $('//label[text() = "Series"]/following-sibling::*[1]').click();
      container = await $(
        '//div[@class="md-select-menu-container md-active md-clickable"]'
      );
      await container.waitForDisplayed({ timeout: 4000 });
      await $(
        '//div[@class="md-select-menu-container md-active md-clickable"]//div[contains(text(),"N1")]/..'
      ).click();

      // Machine type
      await $('//label[text() = "Machine type"]/..').click();
      container = await $(
        '//div[@class="md-select-menu-container md-active md-clickable"]'
      );
      await container.waitForDisplayed({ timeout: 4000 });

      await $(
        '//div[@class="md-select-menu-container md-active md-clickable"]//div[contains(text(),"n1-standard-8 (vCPUs: 8, RAM: 30GB)")]/..'
      ).click();

      // Add GPUs
      await $("//div[contains(text(), 'Add GPUs.')]/..").click();

      const gpuType = await $(
        '//label[text() = "GPU type"]/following-sibling::*[1]'
      );

      await gpuType.click();
      container = await $(
        '//div[@class="md-select-menu-container md-active md-clickable"]'
      );
      await container.waitForDisplayed({ timeout: 4000 });
      await $(
        '//div[@class="md-select-menu-container md-active md-clickable"]//div[contains(text(),"NVIDIA Tesla P100")]/..'
      ).click();
      await $(
        '//label[text() = "Number of GPUs"]/following-sibling::*[1]'
      ).click();
      container = await $(
        '//div[@class="md-select-menu-container md-active md-clickable"]'
      );
      await container.waitForDisplayed({ timeout: 4000 });
      await $(
        '//div[@class="md-select-menu-container md-active md-clickable"]//div[text()=1]/..'
      ).click();

      // Local SSD
      await $(
        '//form[@name="ComputeEngineForm"]//label[text() = "Local SSD"]/following-sibling::*'
      ).click();
      container = await $(
        '//div[@class="md-select-menu-container md-active md-clickable"]'
      );
      await container.waitForDisplayed({ timeout: 4000 });
      await $(
        '//div[@class="md-select-menu-container md-active md-clickable"]//div[contains(text(),"2x375 GB")]/..'
      ).click();

      // Datacenter location
      await $(
        '//form[@name="ComputeEngineForm"]//label[text() = "Datacenter location"]/following-sibling::*'
      ).click();
      const location_container = await $(
        '//div[@class="md-select-menu-container cpc-region-select md-active md-clickable"]'
      );
      await location_container.waitForDisplayed({ timeout: 4000 });
      await $(
        '//div[@class="md-select-menu-container cpc-region-select md-active md-clickable"]//div[contains(text(),"Frankfurt (europe-west3)")]/..'
      ).click();

      // // Commited usage
      // await $(
      //   '//form[@name="ComputeEngineForm"]//label[text() = "Committed usage"]/following-sibling::*'
      // ).click();

      // let usage_container = await $(
      //   '//div[@class="md-select-menu-container md-active md-clickable"]'
      // );

      // await usage_container.waitForDisplayed({ timeout: 4000 });

      // await $(
      //   '//div[@class="md-select-menu-container md-active md-clickable"]//div[contains(text(),"1 Year")]/..'
      // ).click();

      // Add to Estimate
      const btn = await $(
        '//form[@name="ComputeEngineForm"]//button[contains(text(),"Add to Estimate")]'
      );
      await btn.click();
    });

    it("should send email", async function () {
      await $("//button[@title='Email Estimate']").click();
      await browser.newWindow("https://10minutemail.com/", {
        windowName: "WebdriverIO window",
        windowFeature: "width=420,height=230,resizable,scrollbars=yes,status=1",
      });
      // console.log(await browser.getTitle(), "!!!!!!!!!@@@@@");
      const handles = await browser.getWindowHandles();
      await browser.switchToWindow(handles[1]);
      const email = await $('//input[@id="mail_address"]').getValue();
      console.log("emailinnnnnnnnnnnnnnnnnnnnnnng", email);
      await browser.switchToWindow(handles[0]);

      const iframe3 = await $("#cloud-site iframe");
      await iframe3.waitForDisplayed({ timeout: 6000 });
      await browser.switchToFrame(iframe3);
      const iframe4 = await $("#myFrame");
      await iframe4.waitForDisplayed({ timeout: 6000 });
      await browser.switchToFrame(iframe4);

      const emailInput = await $(
        "//form[@name = 'emailForm']//input[@type = 'email']"
      );
      await emailInput.waitForDisplayed({ timeout: 4000 });
      await emailInput.setValue(email);
      await $(
        "//form[@name = 'emailForm']//button[ contains(text(), 'Send Email')]"
      ).click();

      const total_cost = await $(
        '//h2/b[contains(text(), "Total Estimated Cost")]'
      ).getText();
      expect(total_cost).toEqual(
        "Total Estimated Cost: USD 4,559.10 per 1 month"
      );

      // await browser.switchToWindow(handles[1]);
      // const message_list = await $('//section[@id="mail_messages"]/div');
      // await message_list.waitForDisplayed({ timeout: 8000 });
      // await message_list.scrollIntoView();
      // await message_list.click();
      // const total_cost_in_letter = await $(
      //   '//h2[contains(text(), "Estimated Monthly Cost")]'
      // );
      // await total_cost_in_letter.waitForDisplayed({ timeout: 4000 });
      // const text = await total_cost_in_letter.getText();
      // console.log(text.subStr(24));
      // expect(total_cost).toEqual(
      //   "Total Estimated Cost:" + text.subStr(24) + "per 1 month"
      // );
      // await browser.closeWindow();
      // await browser.switchToWindow(handles[0]);
      // console.log(await browser.getTitle(), "hhhhhhhhhhhh");
    });
  });
});
