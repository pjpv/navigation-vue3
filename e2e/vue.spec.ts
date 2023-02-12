// @ts-nocheck
import {test, expect} from '@playwright/test'

// See here how to get started:
// https://playwright.dev/docs/intro
test.describe('页面测试', async () => {
  test.beforeEach(async ({page}) => {
    await page.goto('/')
  })
  test('添加分组', async ({page}) => {
    const header = await page.$('div.v-header')
    if (header) {
      const sw = await header.$('.t-switch')
      await sw.click({force: true})
      // await page.waitForTimeout(300)
      const groupCount = 300
      for (let i = 0; i < groupCount; i++) {
        await (await page.getByText('添加组')).click()
        await (await page.$('.t-dialog .t-input .t-input__inner')).type('test')
        await (await page.$('.t-dialog button.t-dialog__confirm')).click()
      }
      const pageGroupCount = (await page.$$('.v-content .v-content-draggable > .v-group')).length
      await page.waitForTimeout(5 * 1000)
      await expect(pageGroupCount).toEqual(groupCount)
    } else {
      await expect('页面加载失败')
    }
  })
})
