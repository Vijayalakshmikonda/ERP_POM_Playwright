import { AdminLogin } from "../Pages/AdminLogin";
import { AdminLogout } from "../Pages/AdminLogout";
import { AddSuppliers } from "../Pages/AddSuppliers";
import { AddCustomers } from "../Pages/AddCustomers";
import test from "@playwright/test";
let login:AdminLogin
let sup:AddSuppliers
let cus:AddCustomers
let logout:AdminLogout
test.beforeEach(async({page})=>{
    login=new AdminLogin(page)
    await login.ERPurl(process.env.BASE_URL!)
    await login.ERPLogin(process.env.BASE_USER!,process.env.BASE_PASS!)
})
test.describe('ERP Management Modules',()=>{
    //Executing Supplier Test
    test('Validate Supplier Module',async({page})=>{
        sup=new AddSuppliers(page)
        await sup.addSupplierDetails('Naga','Discovery Gardens','Dubai','UAE','Sathya','582587711','ravi@gmail.com','14587452','Supplier Added')
    })
    //Executing Customer Test
    test('Validate Customer Module', async({page})=>{
        cus=new AddCustomers(page)
        await cus.addCustomerDetails('vijaya','Gardens','Dubai','UAE','NLsatya','58745488','Satya@gmail.com','254785','Customer Added')
    })
})
test.afterEach(async({page})=>{
    logout=new AdminLogout(page)
    await logout.ERPLogout()
    page.close()
})
