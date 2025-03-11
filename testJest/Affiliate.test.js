import { convertToFormData } from "../core/utils/convertFormDate";
import { affiliatesApi } from "../main/api/affiliateApi";
import { afffiliatePreRegister } from "../main/cases/afffiliateCases";
import configuration from "../configuration.json"
import environment from "../environment.json"

const affiliateLogin = environment[configuration.environment].accounts.sharedAccount.Affiliates;
let affiliateId;
let verifyAffiliate;
let affiliateData
const bodyConvert = convertToFormData(affiliateLogin[0])

describe("Affiliate API login test", () => {

    test("affiliate login ", async () => {
        console.log("mi body conver",bodyConvert)
        const response = await affiliatesApi.create("affiliatesLogin",{},bodyConvert);
        affiliateData = response.data.data
        affiliateId = response.data.data.user.id

    })

    test("affiliate account verify" , async () => {
        verifyAffiliate = {
            "is_verify": "A",
            "name": affiliateData.user.name,
            "middle_name": null,
            "last_name": affiliateData.user.last_name,
            "mother_last_name": affiliateData.user.mother_last_name,
            "address": affiliateData.user.address,
            "phone": affiliateData.user,phone,
            "prefix_phone": affiliateData.user.prefix_phone,
            "birthday": affiliateData.user.birthday,
            "gender": "M",
            "education_id": 1,
            "credential": "JKL345",
            "email": `${affiliateData.user.name}@gmail.com`,
            "lista_id": 1,
            "dpto_id": 1,
            "mun_id": 1,
            "barrio_id": null,
            "barrio":null
        }
        const response = await affiliatesApi.create("affiliatesVerify",{},verifyAffiliate);
    })

    // test('should first', async () => { 
    //     const response = await affiliatesApi.create("affiliatePreregisterRed",{},)
    //     expect(response).not.toBeNull();
    //     expect(response.status).toBe(200);
    // })
})