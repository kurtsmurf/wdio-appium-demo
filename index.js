import wdio from "webdriverio";
import expect from "expect"

const options = {
  path: "/wd/hub",
  port: 4723,
  capabilities: {
    platformName: "Android",
    appPackage: "kurt.expo.quickstart",
    appActivity: "host.exp.exponent.LauncherActivity",
    // newCommandTimeout: 60 * 15 // extend timeout - useful for interactive sessions
  },
};

(async function main() {
  const client = await wdio.remote(options);

  const increment = await client.$('//android.widget.TextView[@text="INCREMENT"]');
  const decrement = await client.$('//android.widget.TextView[@text="DECREMENT"]')
  const reset = await client.$('//android.widget.TextView[@text="RESET"]')
  const counter = await client.$('//android.widget.TextView')

  await increment.click()
  await increment.click()
  await increment.click()

  expect(await counter.getAttribute("Text")).toBe("3")

  await decrement.click()

  expect(await counter.getAttribute("Text")).toBe("2")

  await reset.click()

  expect(await counter.getAttribute("Text")).toBe("0")

  await decrement.click()

  expect(await counter.getAttribute("Text")).toBe("-1")

  client.deleteSession()
})().catch(console.log);