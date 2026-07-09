import { AdminLogin } from "../Pages/AdminLogin";
import { AdminLogout } from "../Pages/AdminLogout";
import { AddSuppliers } from "../Pages/AddSuppliers";
import { AddCustomers } from "../Pages/AddCustomers";
import test from "@playwright/test";
import data from "../TestData/ERPData.json";
let login : AdminLogin
let supplier : AddSuppliers
let customer : AddCustomers
let logout : AdminLogout
//console.log(data.Suppliers)
//console.log(data.Customers)

//Precondition beforeeach
test.beforeEach(async({page})=>{
    login = new AdminLogin(page)
    await login.ERPurl(process.env.BASE_URL!)
    await login.ERPLogin(process.env.BASE_USER!,process.env.BASE_PASS!)
})
//Tests 
test.describe("ERP Management modules", ()=>{
    //supplir test
for(const sup of data.Suppliers)
    {
        test(`Validate Supplier module ${sup.SupplierName} `,async({page})=>{
            supplier = new AddSuppliers(page)
            await supplier.addSupplierDetails(sup.SupplierName,sup.Address,sup.City,sup.Country,sup.ContactPerson,sup.PhoneNumber,sup.Email,sup.MobileNumber,sup.Notes)
        })
    }
    //Customer test
    for(const cus of data.Customers)
    {
        test(`Validate Customer Module ${cus.CustomerName} `, async({page})=>{
            customer = new AddCustomers(page)
            await customer.addCustomerDetails(cus.CustomerName,cus.Address,cus.City,cus.Country,cus.ContactPerson,cus.PhoneNumber,cus.Email,cus.MobileNumber,cus.Notes)
        })
    }
})
//post condition Aftereach
test.afterEach(async({page})=>{
    logout = new AdminLogout(page)
    await logout.ERPLogout()
    page.close()
})