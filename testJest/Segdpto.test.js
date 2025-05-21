import { activitesApi } from "../main/api/activitesApi";
import { createActivity } from "../main/cases/activityCases";
import { affiliatesApi } from "../main/api/affiliateApi";
import configuration from "../configuration.json"
import environment from "../environment.json"
import { convertToFormData, getElementsAtCustomIndices } from "../core/utils/convertFormDate";

let idActivity;
let activitiName;
let description;
const timeError = 30000
const affiliates = getElementsAtCustomIndices (environment[configuration.environment].accounts.sharedAccount.Affiliates)
describe("Activity API Integration Tests", () => {

    test("Verificar la creacion de la actividad para todos los departamentos.", async () => {
        const dpto = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]
        description = "Actividad para todos los departamentos"
        const response = await activitesApi.create("activitysCreate", {}, createActivity(dpto,3,"T","P",description));
        idActivity = response.data.data.id;
        activitiName = response.data.data.name;
        expect(response).not.toBeNull();
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty("success", true);
    },timeError);

    test("Verificar la segmentación para todos los afiliados de los departamentos.", async () => {
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
    }, timeError);

    test("Verificar la creacion de la actividad para los departamentos Artigas, Canelones, Cerro Largo, Colonia.", async () => {
        const dpto = [1,2,3,4]
        description = "Actividad para los departamentos Artigas, Canelones, Cerro Largo, Colonia"
        const response = await activitesApi.create("activitysCreate", {}, createActivity(dpto,3,"T","P",description));
        idActivity = response.data.data.id;
        activitiName = response.data.data.name;
        expect(response).not.toBeNull();
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty("success", true);
    });

    test("Verificar la segmentación para los afiliados de los departamentos Artigas, Canelones, Cerro Largo, Colonia.", async () => {
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
    
            if ( index < 4) {
                expect(activityExists).toBe(true);
                console.log(`Afiliado ${userCi} (Permitido) recibió la actividad ${activitiName} correctamente.`);
            } else {
                expect(activityExists).toBe(false);
                console.log(`Afiliado ${userCi} (No permitido) NO debe recibir la actividad ${activitiName}.`);
            }
        });
        await Promise.all(promises);
    },timeError);

    test("Verificar la creacion de la actividad para los departamentos Durazno, Flores, Florida, Lavalleja", async () => {
        const dpto = [5,6,7,8]
        description = "Actividad para los departamentos Artigas, Canelones, Cerro Largo, Colonia"
        const response = await activitesApi.create("activitysCreate", {}, createActivity(dpto,3,"T","P",description));
        idActivity = response.data.data.id;
        activitiName = response.data.data.name;
        expect(response).not.toBeNull();
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty("success", true);
    },timeError);

    test("Verificar la segmentación para los afiliados de los departamentos Durazno, Flores, Florida, Lavalleja", async () => {
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
    
            if (index > 3 && index < 8) {
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