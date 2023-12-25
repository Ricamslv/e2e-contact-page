import { test, expect } from '@playwright/test';

test.describe('Contact page fill up testing', () => {

    //fill in the form
    test.beforeEach(async ({ page }) => {
        await page.goto('https://corp.hexabase.app/contact-us');
        await page.locator('label').filter({ hasText: '新規事業開発に関するお問合せ' }).click();
        await page.getByLabel('パートナー募集に関するお問合せ').check();
        await page.getByPlaceholder('例）山田　太郎').click();
        await page.getByPlaceholder('例）山田　太郎').fill('rica');
        await page.getByPlaceholder('例）やまだ　たろう').click();
        await page.getByPlaceholder('例）やまだ　たろう').fill('リカ');
        await page.getByPlaceholder('例）株式会社 Hexabase').click();
        await page.getByPlaceholder('例）株式会社 Hexabase').fill('Test company');
        await page.getByPlaceholder('例）総務部').click();
        await page.getByPlaceholder('例）総務部').fill('IT');
        await page.locator('#telephone_number_p1').click();
        await page.locator('#telephone_number_p1').fill('080');
        await page.locator('#telephone_number_p2').click();
        await page.locator('#telephone_number_p2').fill('1234');
        await page.locator('#telephone_number_p3').click();
        await page.locator('#telephone_number_p3').fill('5678');
        await page.getByPlaceholder('例）sample@mail.address').click();
        await page.getByPlaceholder('例）sample@mail.address').fill('rica@gmail.com');
        await page.getByPlaceholder('例） 東京都千代田区神田佐久間町1-14 第二東ビル').click();
        await page.getByPlaceholder('例） 東京都千代田区神田佐久間町1-14 第二東ビル').fill('Tokyo');
        await page.locator('#inquiry_content').click();
        await page.locator('#inquiry_content').fill('Inquiry');
        await page.getByLabel('弊社営業活動により').check();
        await page.getByLabel('個人情報の取り扱いに同意する').check();
        await page.getByRole('button', { name: '確認する' }).click();
    })

    test('second page testing', async ({ page }) => {
        await expect(page.locator('text=以下の内容でよろしければ送信してください。')).toBeVisible();
        await expect(page.locator('text=お問合せ種別')).toBeVisible();
        await expect(page.locator('text=新規事業開発に関するお問合せ, パートナー募集に関するお問合せ')).toHaveText('新規事業開発に関するお問合せ, パートナー募集に関するお問合せ');
        //check  if the name field is filled in
        await page.getByText('rica', { exact: true }).click();
        //check if the furigana field is filled in
        await expect(page.locator('text=リカ')).toHaveText('リカ');
        //check if the company field is filled in
        await expect(page.locator('text=Test company')).toHaveText('Test company');
        //check if the department field is filled in
        await expect(page.locator('text=IT')).toHaveText('IT');
        //check if the telephone number field is filled in
        await expect(page.locator('text=080-1234-5678')).toHaveText('080-1234-5678');
        //check if the email field is filled in
        await expect(page.locator('text=rica@gmail.com')).toHaveText('rica@gmail.com');
        //check if the location field is filled in
        await expect(page.locator('text=Tokyo')).toHaveText('Tokyo');
        //check if the inquiry is filled in
        await expect(page.locator('text=Inquiry')).toHaveText('Inquiry');
        //check if the checkbox is clicked
        await expect(page.locator('text=弊社営業活動により')).toHaveText('弊社営業活動により');

        //click the send button
        await page.getByRole('button', { name: '＜　戻る' }).click();
        await page.getByRole('button', { name: '確認する' }).click();
        await page.getByRole('button', { name: '送信する' }).click();
        //check if the success message is displayed
        const successMessageLocator = page.locator('text=お問合せありがとうございました。');
        await expect(successMessageLocator).toBeVisible();
        //go back to the home page
        await page.getByRole('link', { name: 'HOMEへ' }).click();
    });

});