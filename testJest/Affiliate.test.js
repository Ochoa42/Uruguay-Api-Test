import { convertToFormData } from "../core/utils/convertFormDate";
import { affiliatesApi } from "../main/api/affiliateApi";
import { afffiliatePreRegister, verifyAffiliate } from "../main/cases/afffiliateCases";
import configuration from "../configuration.json"
import environment from "../environment.json"
import { entities } from "../core/utils/img/entities";
import { data } from "../core/utils/EntityData";

const affiliates = environment[configuration.environment].accounts.sharedAccount.Affiliates;
let userSession = 22
let nextAffiliateRed = 23
let userId;
const bodyConvert = convertToFormData(affiliates[userSession])
let token

describe("Affiliate API login test", () => {
    test("affiliate login ", async () => {
        let otherUserSession = {
            "email":"303051",
            "password":"3051"
        }
        otherUserSession = convertToFormData(otherUserSession)
        const response = await affiliatesApi.create("affiliatesLogin",{},otherUserSession);
        console.log("mi response", response)
        expect(response).not.toBeNull();
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty("success", true);
        userId = response.data.data.user.id
        token =`Bearer ${response.data.data.token}`
    })

    test("affiliate account verify" , async () => {
        const responseData = verifyAffiliate(1)
        const response = await affiliatesApi.update("affiliateVerify",{userId:userId},responseData,token);
        expect(response).not.toBeNull();
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty("success", true);
    })

    test("Patrocinador realiza el preregistro desde la red", async () => { 
        const responseData = afffiliatePreRegister(userId,0)
        console.log("datos randoms:",responseData)
        const response = await affiliatesApi.create("affiliatePreregisterRed",{},responseData,token)
        expect(response).not.toBeNull();
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty("success", true);
        expect(response.data).not.toHaveProperty("name","Ya existe un registro de esta persona en este Partido")
    })
})