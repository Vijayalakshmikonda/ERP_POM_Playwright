import { Locator,Page } from "@playwright/test";
import { count } from "node:console";
export class AddCustomers{
    //Declare variables for suppliers module
    page : Page
    ClickCustomers : Locator
    ClickAddIcon : Locator
    CustomerNumber : Locator
    CustomerName : Locator
    CAddress : Locator
    CCity : Locator
    CCountry : Locator
    CContactPerson : Locator
    CPhoneNumber : Locator
    CEmail : Locator
    CMobileNumber : Locator
    CNotes : Locator
    ClickAddButton : Locator
    ClickConfirmOk : Locator
    ClickAlertOk : Locator
    SearchPanel : Locator
    SearchTextBox : Locator
    SearchButton : Locator
    CustomerTable : Locator
    constructor(page:Page){
        //Initialize variables 
        this.page = page
        this.ClickCustomers = page.locator('li#mi_a_customers')
        this.ClickAddIcon = page.locator("span[data-caption='Add']").first()
        this.CustomerNumber = page.locator('#x_Customer_Number')
        this.CustomerName = page.locator('#x_Customer_Name')
        this.CAddress = page.locator('#x_Address')
        this.CCity = page.locator('#x_City')
        this.CCountry = page.locator('#x_Country')
        this.CContactPerson = page.locator('#x_Contact_Person')
        this.CPhoneNumber = page.locator('#x_Phone_Number')
        this.CEmail = page.locator('#x__Email')
        this.CMobileNumber = page.locator('#x_Mobile_Number')
        this.CNotes = page.locator('#x_Notes')
        this.ClickAddButton = page.locator('#btnAction')
        this.ClickConfirmOk = page.getByText('OK!', {exact:true})
        this.ClickAlertOk = page.locator('button.ajs-button.btn.btn-primary')
        this.SearchPanel = page.locator('.glyphicon.glyphicon-search.ewIcon')
        this.SearchTextBox = page.locator('#psearch')
        this.SearchButton = page.locator('#btnsubmit')
        this.CustomerTable = page.locator('.table.ewTable tbody tr:nth-child(1) td:nth-child(5) div span span')  
    }
    //write a method for addsuppliers
    async addCustomerDetails(cname:string,Address:string,city:string,country:string,cperson:string,pnum:string,email:string,mnum:string,notes:string)
    {
        await this.ClickCustomers.waitFor()
        await this.ClickCustomers.click()
        await this.ClickAddIcon.waitFor()
        await this.ClickAddIcon.click()
        await this.CustomerNumber.waitFor()
        const Exp_Num = await this.CustomerNumber.inputValue()
        await this.CustomerName.fill(cname)
        await this.CAddress.fill(Address)
        await this.CCity.fill(city)
        await this.CCountry.fill(country)
        await this.CContactPerson.fill(cperson)
        await this.CPhoneNumber.fill(pnum)
        await this.CEmail.fill(email)
        await this.CMobileNumber.fill(mnum)
        await this.CNotes.fill(notes)
        await this.ClickAddButton.click()
        await this.ClickConfirmOk.waitFor()
        await this.ClickConfirmOk.click()
        await this.ClickAlertOk.waitFor()
        await this.ClickAlertOk.click()
        await this.SearchPanel.waitFor()
        if(! await this.SearchTextBox.isVisible())
        await this.SearchPanel.click()
        await this.SearchTextBox.waitFor()
        await this.SearchTextBox.fill(Exp_Num)
        await this.SearchButton.click()
        const Act_Num = await this.CustomerTable.innerText()
        if((await Act_Num).match(Exp_Num))
        {
            console.log(`Customer number found in table ${Act_Num}  ${Exp_Num} `)
        }
        else
        {
            console.log(`Customer number not found in table ${Act_Num}  ${Exp_Num } `)
        }
    }

}