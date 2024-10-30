import { Builder, By } from "selenium-webdriver";
import chai from "chai";
const { expect } = chai;

describe("UI testing using selenium", function () {
  this.timeout(10000);

  let driver;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
  });

  after(async function () {
    await driver.quit();
  });

  it("should load the login page", async function () {
    await driver.get("file:///C:/Users/ACER/Downloads/ppmpl-prakt4-master/ppmpl-prakt4-master/index.html");
    const title = await driver.getTitle();
    expect(title).to.equal("Login Page"); // Pastikan ini sesuai dengan judul halaman yang sebenarnya
  });

  it("should input username and password", async function () {
    await driver.findElement(By.id("username")).clear();
    await driver.findElement(By.id("password")).clear();

    await driver.findElement(By.id("username")).sendKeys("testuser");
    await driver.findElement(By.id("password")).sendKeys("password123");

    const usernameValue = await driver.findElement(By.id("username")).getAttribute("value");
    const passwordValue = await driver.findElement(By.id("password")).getAttribute("value");

    expect(usernameValue).to.equal("testuser");
    expect(passwordValue).to.equal("password123");
  });

  it("should click the login button", async function () {
    await driver.findElement(By.id("loginButton")).click();

    // Periksa jika errorMessage tidak terlihat
    const errorMessage = await driver.findElement(By.id("errorMessage"));
    const displayValue = await errorMessage.getCssValue("display");

    expect(displayValue).to.equal("none");
  });

  it("should fail login with incorrect credentials", async function () {
    await driver.get("file:///C:/Users/ACER/Downloads/ppmpl-prakt4-master/ppmpl-prakt4-master/index.html");
    await driver.findElement(By.id("username")).clear();
    await driver.findElement(By.id("password")).clear();

    await driver.findElement(By.id("username")).sendKeys("wronguser");
    await driver.findElement(By.id("password")).sendKeys("wrongpassword");
    await driver.findElement(By.id("loginButton")).click();

    const errorMessage = await driver.findElement(By.id("errorMessage")).getText();
    console.log("Error Message:", errorMessage); // Debug output
    expect(errorMessage).to.equal("Invalid username or password"); // Pastikan ini sesuai dengan teks yang ditampilkan
  });

  it("should validate visibility of elements", async function () {
    const loginButton = await driver.findElement(By.id("loginButton"));
    const isVisible = await loginButton.isDisplayed();
    expect(isVisible).to.be.true;
  });

  it("should input username and password using CSS Selector and XPath", async function () {
    await driver.findElement(By.css("#username")).clear();
    await driver.findElement(By.xpath('//*[@id="password"]')).clear();

    await driver.findElement(By.css("#username")).sendKeys("testuser");
    await driver.findElement(By.xpath('//*[@id="password"]')).sendKeys("password123");

    const usernameValue = await driver.findElement(By.css("#username")).getAttribute("value");
    const passwordValue = await driver.findElement(By.xpath('//*[@id="password"]')).getAttribute("value");

    expect(usernameValue).to.equal("testuser");
    expect(passwordValue).to.equal("password123");
  });
});
