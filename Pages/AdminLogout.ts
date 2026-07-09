import { Locator,Page } from "@playwright/test";
export class AdminLogout{
    page : Page
    clicklogout : Locator
    constructor(page:Page)
    {
        this.page=page
        this.clicklogout=page.locator('#logout')
    }
    async ERPLogout()
    {
        await this.clicklogout.waitFor()
        await this.clicklogout.click()
    }
}