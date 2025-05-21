import { activitesApi } from "../main/api/activitesApi";
import { createActivity } from "../main/cases/activityCases";
import { affiliatesApi } from "../main/api/affiliateApi";
import configuration from "../configuration.json"
import environment from "../environment.json"
import { convertToFormData } from "../core/utils/convertFormDate";

let idActivity;
let activitiName;
let description;
const timeError=30000
describe("Activity API Integration Tests", () => {

    test("Verificar la creacion de la actividad para todas las organizaciones.", async () => {
        const org = [1,2,3,4,5,6,8,11,35]
        description = "Actividad para todas las organizaciones"
        const response = await activitesApi.create("activitysCreate", {}, createActivity(org,2,"T","P",description));
        idActivity = response.data.data.id;
        activitiName = response.data.data.name;
        expect(response).not.toBeNull();
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty("success", true);
    },timeError);

    test("Verificar la segmentación para todos los afiliados de las organizaciones.", async () => {
        const affiliates = environment[configuration.environment].accounts.sharedAccount.AffiliatesOrg;
    
        const promises = affiliates.map(async (affiliate) => {
            const affiliateData = convertToFormData(affiliate);
    
            const loginResponse = await affiliatesApi.create("affiliatesLogin", {}, affiliateData);
            expect(loginResponse).not.toBeNull();
            expect(loginResponse.status).toBe(200);
            expect(loginResponse.data).toHaveProperty("success", true);
    
            const token = `Bearer ${loginResponse.data.data.token}`;
            const userCi = loginResponse.data.data.user.ci;
    
            const response = await activitesApi.get("activitiesL", {}, token);
            const activities = response.data.data;
    
            expect(response).not.toBeNull();
            expect(response.status).toBe(200);
            expect(response.data).toHaveProperty("success", true);
            expect(response.data).toHaveProperty("data");
            expect(Array.isArray(activities)).toBe(true);
    
            const activityExists = activities.some(activity => activity.id === idActivity);
            expect(activityExists).toBe(true);
    
            console.log(`Afiliado ${userCi} recibió la actividad ${activitiName} correctamente.`);
        });
        await Promise.all(promises);
    },timeError);


    test("Verificar la creacion de la actividad para las organizaciones STO,LRN,PDP.", async () => {
        const org = [1,2,3]
        description = "Actividad para las organizaciones STO,LRN,PDP"
        const response = await activitesApi.create("activitysCreate", {}, createActivity(org,2,"T","P",description));
        idActivity = response.data.data.id;
        activitiName=response.data.data.name;
        expect(response).not.toBeNull();
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty("success", true);
    },timeError);

    test("Verificar la segmentación para los afiliados de las organizaciones STO, LRN, PDP.", async () => {
        const affiliates = environment[configuration.environment].accounts.sharedAccount.AffiliatesOrg;
    
        const promises = affiliates.map(async (affiliate, index) => {
            const affiliateData = convertToFormData(affiliate);
    
            const loginResponse = await affiliatesApi.create("affiliatesLogin", {}, affiliateData);
            expect(loginResponse).not.toBeNull();
            expect(loginResponse.status).toBe(200);
            expect(loginResponse.data).toHaveProperty("success", true);
    
            const token = `Bearer ${loginResponse.data.data.token}`;
            const userCi = loginResponse.data.data.user.ci;
    
            const response = await activitesApi.get("activitiesL", {}, token);
            const activities = response.data.data;
    
            expect(response).not.toBeNull();
            expect(response.status).toBe(200);
            expect(response.data).toHaveProperty("success", true);
            expect(response.data).toHaveProperty("data");
            expect(Array.isArray(activities)).toBe(true);
    
            const activityExists = activities.some(activity => activity.id === idActivity);
    
            if (index < 3) {
                expect(activityExists).toBe(true);
                console.log(`Afiliado ${userCi} (Permitido) recibió la actividad ${activitiName} correctamente.`);
            } else {
                expect(activityExists).toBe(false);
                console.log(`Afiliado ${userCi} (No permitido) NO debe recibir la actividad ${activitiName}.`);
            }
        });
        await Promise.all(promises);
    },timeError);

    test("Verificar la creacion de la actividad para las organizaciones AIEA,CNC,DDR,SMR.", async () => {
        const org = [4,5,6,8]
        description = "Actividad para todas las organizaciones las organizaciones AIEA,CNC,DDR,SMR"
        const response = await activitesApi.create("activitysCreate", {}, createActivity(org,2,"T","P",description));
        idActivity = response.data.data.id;
        activitiName=response.data.data.name;
        expect(response).not.toBeNull();
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty("success", true);
    },timeError);
    
    test("Verificar la segmentación para los afiliados de las organizaciones AIEA,CNC,DDR,SMR.", async () => {
        const affiliates = environment[configuration.environment].accounts.sharedAccount.AffiliatesOrg;
    
        const promises = affiliates.map(async (affiliate, index) => {
            const affiliateData = convertToFormData(affiliate);
    
            const loginResponse = await affiliatesApi.create("affiliatesLogin", {}, affiliateData);
            expect(loginResponse).not.toBeNull();
            expect(loginResponse.status).toBe(200);
            expect(loginResponse.data).toHaveProperty("success", true);
    
            const token = `Bearer ${loginResponse.data.data.token}`;
            const userCi = loginResponse.data.data.user.ci;
    
            const response = await activitesApi.get("activitiesL", {}, token);
            const activities = response.data.data;
    
            expect(response).not.toBeNull();
            expect(response.status).toBe(200);
            expect(response.data).toHaveProperty("success", true);
            expect(response.data).toHaveProperty("data");
            expect(Array.isArray(activities)).toBe(true);
    
            const activityExists = activities.some(activity => activity.id === idActivity);
    
            if (index > 2 && index < 7) {
                expect(activityExists).toBe(true);
                console.log(`Afiliado ${userCi} (Permitido) recibió la actividad ${activitiName} correctamente.`);
            } else {
                expect(activityExists).toBe(false);
                console.log(`Afiliado ${userCi} (No permitido) NO debe recibir la actividad ${activitiName}.`);
            }
        });
        await Promise.all(promises);
    },timeError);
})
    // test("Verificar la creacion de la actividad para todos los destinos.", async () => {
    //     const AllDestiny = []
    //     description = "Actividad para todos los destinos"
    //     const response = await activitesApi.create("activitysCreate", {}, createActivity(AllDestiny,0,"T","P",description));
    //     const responseTask = await activitesApi.getTask(idActivity);
    //     expect(response).not.toBeNull();
    //     expect(response.status).toBe(200);
    //     expect(response.data).toHaveProperty("success", true);
    // });