import { Locator,Page } from "@playwright/test";
import { count } from "node:console";
export class AddSuppliers{
    //Declare variables for suppliers module
    page : Page
    ClickSuppliers : Locator
    ClickAddIcon : Locator
    SupplierNumber : Locator
    SupplierName : Locator
    SAddress : Locator
    SCity : Locator
    SCountry : Locator
    SContactPerson : Locator
    SPhoneNumber : Locator
    SEmail : Locator
    SMobileNumber : Locator
    SNotes : Locator
    ClickAddButton : Locator
    ClickConfirmOk : Locator
    ClickAlertOk : Locator
    SearchPanel : Locator
    SearchTextBox : Locator
    SearchButton : Locator
    SupplierTable : Locator
    constructor(page:Page){
        //Initialize variables 
        this.page = page
        this.ClickSuppliers = page.locator('li#mi_a_suppliers')
        this.ClickAddIcon = page.locator("span[data-caption='Add']").first()
        this.SupplierNumber = page.locator('#x_Supplier_Number')
        this.SupplierName = page.locator('#x_Supplier_Name')
        this.SAddress = page.locator('#x_Address')
        this.SCity = page.locator('#x_City')
        this.SCountry = page.locator('#x_Country')
        this.SContactPerson = page.locator('#x_Contact_Person')
        this.SPhoneNumber = page.locator('#x_Phone_Number')
        this.SEmail = page.locator('#x__Email')
        this.SMobileNumber = page.locator('#x_Mobile_Number')
        this.SNotes = page.locator('#x_Notes')
        this.ClickAddButton = page.locator('#btnAction')
        this.ClickConfirmOk = page.getByText('OK!', {exact:true})
        this.ClickAlertOk = page.locator('.ajs-button.btn.btn-primary')
        this.SearchPanel = page.locator('.glyphicon.glyphicon-search.ewIcon')
        this.SearchTextBox = page.locator('#psearch')
        this.SearchButton = page.locator('#btnsubmit')
        this.SupplierTable = page.locator('.table.ewTable tbody tr:nth-child(1) td:nth-child(6) div span span')  
    }
    //write a method for addsuppliers
    async addSupplierDetails(sname:string,Address:string,city:string,country:string,cperson:string,pnum:string,email:string,mnum:string,notes:string)
    {
        await this.ClickSuppliers.waitFor()
        await this.ClickSuppliers.click()
        await this.ClickAddIcon.waitFor()
        await this.ClickAddIcon.click()
        await this.SupplierNumber.waitFor()
        const Exp_Num = await this.SupplierNumber.inputValue()
        await this.SupplierName.fill(sname)
        await this.SAddress.fill(Address)
        await this.SCity.fill(city)
        await this.SCountry.fill(country)
        await this.SContactPerson.fill(cperson)
        await this.SPhoneNumber.fill(String(pnum))
        await this.SEmail.fill(email)
        await this.SMobileNumber.fill(String(mnum))
        await this.SNotes.fill(notes)
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
        const Act_Num = await this.SupplierTable.innerText()
        if((await Act_Num).match(Exp_Num))
        {
            console.log(`Supplier number found in table ${Act_Num}  ${Exp_Num} `)
        }
        else
        {
            console.log(`Supplier number not found in table ${Act_Num}  ${Exp_Num }`)
        }
    }

}