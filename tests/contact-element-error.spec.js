import { test, expect } from '@playwright/test';

test.describe('Contact page testing of elements and error', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://corp.hexabase.app/contact-us');
  })

  test('test elements', async ({ page }) => {
    await expect(page).toHaveURL('https://corp.hexabase.app/contact-us');
    await expect(page).toHaveTitle(/.*お問合せ|Hexabase/);
  });

  test('incorrect content field: error', async ({ page }) => {
    //fill the name field
    await page.getByPlaceholder('例）山田　太郎').click();
    await page.getByPlaceholder('例）山田　太郎').fill('rica');
    //fill the furigana field
    await page.getByPlaceholder('例）やまだ　たろう').click();
    await page.getByPlaceholder('例）やまだ　たろう').fill('リカ');
    //email field
    await page.getByPlaceholder('例）sample@mail.address').click();
    await page.getByPlaceholder('例）sample@mail.address').fill('rica');
    //check the aggreement checkbox
    await page.getByLabel('個人情報の取り扱いに同意する').check();
    //it will not be able to go to the next page without filling in the 
    //name ,furigana ,email and checking the inquiry type field.
    const errorMessage = await page.locator('.error')
    await expect(errorMessage).toContainText('未入力です。')
  });

  test('お問合せ種別 section', async ({ page }) => {
    await expect(page.locator('text=お問合せ種別')).toHaveText('お問合せ種別');

    const labelsToCheck = [
      '製品に関するお問合せ',
      'パートナー募集に関するお問合せ',
      '新規事業開発に関するお問合せ',
      '採用に関するお問合せ',
      'その他',
    ];
    for (const label of labelsToCheck) {
      await page.check(`label:has-text("${label}") input[type="checkbox"]`);
    }
  });
  
  test('弊社サイトを何でお知りになりましたか？ section', async ({ page }) => {
    await expect(page.locator('text=弊社サイトを何でお知りになりましたか？')).toHaveText('弊社サイトを何でお知りになりましたか？');

    const labelsToCheck2 = [
      '検索エンジン',
      '展示会',
      '弊社営業活動により',
      'その他',
      'ご紹介',
    ];
    for (const label of labelsToCheck2) {
      await page.check(`label:has-text("${label}") input[type="checkbox"]`);
    }
  });
});