import { test, expect } from '@playwright/test';

test.describe('Contact page testing', () => {

    //Navigate to the contact page
    test.beforeEach(async ({ page }) => {
        await page.goto('https://corp.hexabase.app/contact-us');
    })

    //Close the browser after each test
    test.afterEach(async ({ page }) => {
        await page.close()
    })

    //All form fields are filled in and the form is submitted
    test('Filling out the form', async ({ page }) => {
        //check the checkbox
        await page.getByLabel('製品に関するお問合せ').check();
        //fill the name field
        await page.getByPlaceholder('例）山田　太郎').click();
        await page.getByPlaceholder('例）山田　太郎').fill('');
        //fill the furigana field
        await page.getByPlaceholder('例）やまだ　たろう').click();
        await page.getByPlaceholder('例）やまだ　たろう').fill('りか');
        await page.getByPlaceholder('例）やまだ　たろう').press('ArrowUp');
        await page.getByPlaceholder('例）やまだ　たろう').press('Enter');
        await page.getByPlaceholder('例）やまだ　たろう').fill('りか\u001f');
        await page.getByPlaceholder('例）やまだ　たろう').press('ArrowUp');
        await page.getByPlaceholder('例）やまだ　たろう').press('ArrowDown');
        await page.getByPlaceholder('例）やまだ　たろう').press('Enter');
        //fill the company field
        await page.getByPlaceholder('例）株式会社 Hexabase').click();
        await page.getByPlaceholder('例）株式会社 Hexabase').fill('Test company');
        //fill the department field
        await page.getByPlaceholder('例）総務部').click();
        await page.getByPlaceholder('例）総務部').fill('IT');
        //fill the telephone number field
        await page.locator('#telephone_number_p1').click();
        await page.locator('#telephone_number_p1').fill('080');
        await page.locator('#telephone_number_p2').click();
        await page.locator('#telephone_number_p2').fill('1234');
        await page.locator('#telephone_number_p3').click();
        await page.locator('#telephone_number_p3').fill('5678');
        //fill the email field
        await page.getByPlaceholder('例）sample@mail.address').click();
        await page.getByPlaceholder('例）sample@mail.address').fill('rica@gmail.com');
        //fill the location field
        await page.locator('dd:nth-child(16)').click();
        await page.getByPlaceholder('例） 東京都千代田区神田佐久間町1-14 第二東ビル').fill('Tokyo');
        //fill the inquiry field
        await page.locator('#inquiry_content').click();
        await page.locator('#inquiry_content').fill('Test inquiry');
        //check the checkbox
        await page.getByLabel('検索エンジン').check();
        await page.getByLabel('個人情報の取り扱いに同意する').check();
        //click the confirm button
        //await page.getByRole('button', { name: '確認する' }).click();
        //click the send button
        //await page.getByRole('button', { name: '送信する' }).click();

        //Assert that a success message is displayed

        //click the home button
        //await page.getByRole('link', { name: 'HOMEへ' }).click();
    })

    test('Check validity of fields', async ({ page }) => {
        await page.getByPlaceholder('例）山田　太郎').click();
        await page.getByPlaceholder('例）山田　太郎').fill('rica');
        await page.getByPlaceholder('例）やまだ　たろう').click();
        await page.getByPlaceholder('例）やまだ　たろう').fill('mae');
        await page.getByPlaceholder('例）株式会社 Hexabase').click();
        await page.getByPlaceholder('例）株式会社 Hexabase').fill('test');
        await page.getByPlaceholder('例）総務部').click();
        await page.getByPlaceholder('例）総務部').fill('test2');
        await page.locator('#telephone_number_p1').click();
        await page.locator('#telephone_number_p1').fill('080');
        await page.locator('#telephone_number_p2').click();
        await page.locator('#telephone_number_p2').fill('080');
        await page.locator('#telephone_number_p3').click();
        await page.locator('#telephone_number_p3').fill('9999');
        await page.getByPlaceholder('例）sample@mail.address').click();
        await page.getByPlaceholder('例）sample@mail.address').fill('rica@gmail.com');
        await page.getByPlaceholder('例） 東京都千代田区神田佐久間町1-14 第二東ビル').click();
        await page.getByPlaceholder('例） 東京都千代田区神田佐久間町1-14 第二東ビル').fill('tesst');
        await page.locator('#inquiry_content').click();
        await page.locator('#inquiry_content').fill('inquiry');
        await page.locator('label').filter({ hasText: '検索エンジン' }).click();
        await page.locator('label').filter({ hasText: '個人情報の取り扱いに同意する' }).click();

    })

    test('form field should have error for missing fields', async ({ page }) => {
        await expect(page.locator('text=未入力です。')).toBeVisible();
        await page.getByPlaceholder('例）やまだ　たろう').click();
        await page.getByPlaceholder('例）やまだ　たろう').fill('rica');
        await page.getByPlaceholder('例）sample@mail.address').click();
        await page.getByPlaceholder('例）sample@mail.address').fill('rica@gmail.com');
        await page.getByText('必須項目です。').click();
        await page.getByLabel('個人情報の取り扱いに同意する').check();
        await page.getByPlaceholder('例）山田　太郎').click();
    })


    test('test', async ({ page }) => {
        await page.locator('label').filter({ hasText: '新規事業開発に関するお問合せ' }).click();
        await page.getByLabel('パートナー募集に関するお問合せ').check();
        await page.getByPlaceholder('例）山田　太郎').click();
        await page.getByPlaceholder('例）山田　太郎').fill('rica');
        await page.getByPlaceholder('例）やまだ　たろう').click();
        await page.getByPlaceholder('例）やまだ　たろう').fill('mae');
        await page.getByPlaceholder('例）株式会社 Hexabase').click();
        await page.getByPlaceholder('例）株式会社 Hexabase').fill('hexabase');
        await page.getByPlaceholder('例）総務部').click();
        await page.getByPlaceholder('例）総務部').fill('test');
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
        await page.getByRole('button', { name: '＜　戻る' }).click();
        await page.getByRole('button', { name: '確認する' }).click();
        await page.getByRole('button', { name: '送信する' }).click();
        await page.getByText('お問合せありがとうございました。').click();
        await page.getByText('お問合せありがとうございました。').click();
        await page.getByRole('link', { name: 'HOMEへ' }).click();
    });
});