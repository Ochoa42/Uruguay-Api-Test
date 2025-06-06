import { convertToFormData } from "../core/utils/convertFormDate";
import { affiliatesApi } from "../main/api/affiliateApi";
import { afffiliatePreRegister, verifyAffiliate } from "../main/cases/afffiliateCases";
import configuration from "../configuration.json"
import environment from "../environment.json"
const timeError = 30000
const affiliates = environment[configuration.environment].accounts.sharedAccount.Affiliates;
let userSession = 52
let nextAffiliateRed = 53
let userId;
const bodyConvert = convertToFormData(affiliates[userSession])
let token

describe("Affiliate API login test", () => {
    test("affiliate login ", async () => {
        let otherUserSession = {
            "email":"303057",
            "password":"3057"
        }
        otherUserSession = convertToFormData(otherUserSession)
        const response = await affiliatesApi.create("affiliatesLogin",{},otherUserSession);
        console.log("mi response", response.data)
        expect(response).not.toBeNull();
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty("success", true);
        userId = response.data.data.user.id
        token =`Bearer ${response.data.data.token}`
    },timeError)

    test("affiliate account verify" , async () => {
        const responseData = verifyAffiliate(1)
        const response = await affiliatesApi.update("affiliateVerify",{userId:userId},responseData,token);
        expect(response).not.toBeNull();
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty("success", true);
    },timeError)

    test("Patrocinador realiza el preregistro desde la red", async () => { 
        //const responseDataParams = afffiliatePreRegister(userId,0,1,19,122,nextAffiliateRed)
        const responseDataParams = afffiliatePreRegister(userId,0,1,1,1)
        console.log("responseDataParams",responseDataParams)
        const response = await affiliatesApi.create("affiliatePreregisterRed",{},responseDataParams,token)
        expect(response).not.toBeNull();
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty("success", true);
        expect(response.data).not.toHaveProperty("name","Ya existe un registro de esta persona en este Partido")
    },timeError)
})