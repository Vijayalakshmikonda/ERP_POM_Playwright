import { expect, Locator, Page } from "@playwright/test";

export class AdminLogin{
    //Declare variables for Login
    page : Page
    username:Locator
    password:Locator
    Login:Locator

    //write a constructor for intialization for above elements
    constructor(page:Page){
        this.page = page
        this.username = page.locator('#username')
        this.password=page.locator('#password')
        this.Login=page.locator('#btnsubmit')
    }
    //method for url launching
    async ERPurl(url:string){
        await this.page.goto(url)
    }
    //method for Login
    async ERPLogin(user:string,pass:string){
        await this.username.waitFor({state:'visible'})
        await this.username.clear()
        await this.username.fill(user)
        await this.password.waitFor({state:'visible'})
        await this.password.clear()
        await this.password.fill(pass)
        await this.Login.click()
        await expect(this.page).toHaveURL(/dashboard.php/)
    }
}
