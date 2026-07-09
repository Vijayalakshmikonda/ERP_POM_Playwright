import test from "@playwright/test";
import { AdminLogin } from "../Pages/AdminLogin";
import { AddSuppliers } from "../Pages/AddSuppliers";
import { AddCustomers } from "../Pages/AddCustomers";
import { AdminLogout } from "../Pages/AdminLogout";
import { ExcelUtility } from "../Utils/ExcelUtility";
import path from "path";
// const supplier=ExcelUtility.getExcelData("./TestData/ERPDataExcel.xlsx","SuppliersData")
// console.log(supplier)
// const customer = ExcelUtility.getExcelData("./TestData/ERPDataExcel.xlsx","CustomersData")
// console.log(customer)
let login : AdminLogin
let suppliers : AddSuppliers
let customers : AddCustomers
let logout : AdminLogout
//store excel data
let supdata : any
let cusdata : any
//read path of excel file
let filepath = path.join(__dirname,'../TestData/ERPDataExcel.xlsx')
try{
    supdata=ExcelUtility.getExcelData(filepath,"SuppliersData")
    cusdata=ExcelUtility.getExcelData(filepath,"CustomersData")
    //console.log(supdata)
    //console.log(cusdata)
}
catch(error)
{
console.log(error)
}
test.beforeEach(async({page})=>{
    login = new AdminLogin(page)
    await login.ERPurl(process.env.BASE_URL!)
    await login.ERPLogin(process.env.BASE_USER!,process.env.BASE_PASS!)
})
test.describe('Excelfile',()=>{
    //Suppliers Module
    for (const data of supdata){
    test(`Validate MultipleData ${data.SupplierName}`,async({page})=>{
        suppliers = new AddSuppliers(page)
        await suppliers.addSupplierDetails(data.SupplierName,
            data.Address,
            data.City,
            data.Country,
            data.ContactPerson,
            data.PhoneNumber,
            data.Email,
            data.Mobile,
            data.Notes)
    })
    }
    for(const data of cusdata){
        test(`Validate CustomerMultipledata ${data.CustomerName}`,async({page})=>{
            customers = new AddCustomers(page)
            await customers.addCustomerDetails(data.CustomerName,
                data.Address,
                data.City,
                data.Country,
                data.ContactPerson,
                data.PhoneNumber,
                data.Email,
                data.Mobile,
                data.Notes)
        })
    }
})
test.afterEach(async({page})=>{
    logout=new AdminLogout(page)
    await logout.ERPLogout()
    page.close()
})

