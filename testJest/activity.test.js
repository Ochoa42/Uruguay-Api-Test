import { activitesApi } from "../main/api/activitesApi";
import { activityAllDestiny, createActivity } from "../main/cases/activityCases";
import { data } from "../core/utils/EntityData";
import endpoints from "../main/endpoints";
import { affiliatesApi } from "../main/api/affiliateApi";
import configuration from "../configuration.json"
import environment from "../environment.json"
import { convertToFormData } from "../core/utils/convertFormDate";

let idActivity;
const afil = "Bearer 1221|C6HqeFwcGvFZHPstmHFOcR4xh0LyGBNhtJkiST1jb39e2b90"
let description;
describe("Activity API Integration Tests", () => {

    test("Verificar la creacion de la actividad para todas las organizaciones.", async () => {
        const org = [1,2,3,4,5,6,8,11,35]
        description = "Actividad para todas las organizaciones"
        const response = await activitesApi.create("activitysCreate", {}, createActivity(org,2,"T","P",description));
        idActivity = response.data.data.id;
        expect(response).not.toBeNull();
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty("success", true);
    });

    test("Verificar la segmentación para todos los afiliados de las organizaciones.", async () => {
        const orgIds = [1, 2, 3, 4, 5, 6, 8, 11, 35]; // IDs de organizaciones
        const affiliates = environment[configuration.environment].accounts.sharedAccount.AffiliatesOrg; // Lista de afiliados
    
        for (let i = 0; i < orgIds.length; i++) {
            // Obtener afiliado en la posición correspondiente
            const affiliateData = convertToFormData(affiliates[i]);
    
            // Iniciar sesión con el afiliado y obtener el token
            const loginResponse = await affiliatesApi.create("affiliatesLogin", {}, affiliateData);
            expect(loginResponse).not.toBeNull();
            expect(loginResponse.status).toBe(200);
            expect(loginResponse.data).toHaveProperty("success", true);
    
            const token = `Bearer ${loginResponse.data.data.token}`;
            const userId = loginResponse.data.data.user.id;
    
            // Hacer la solicitud de actividades con el token del afiliado
            const response = await activitesApi.get("activitiesL", {}, token);
            const activities = response.data.data;
    
            expect(response).not.toBeNull();
            expect(response.status).toBe(200);
            expect(response.data).toHaveProperty("success", true);
            expect(response.data).toHaveProperty("data");
            expect(Array.isArray(activities)).toBe(true);
    
            // Verificar que todas las actividades pertenecen a la organización del afiliado
            const filteredActivities = activities.filter(activity => orgIds.includes(activity.organizationId));
            expect(filteredActivities.length).toBeGreaterThan(0);
    
            console.log(`✅ Afiliado ${userId} recibió ${filteredActivities.length} actividades correctamente.`);
        }
    });


    // test("Verificar la creacion de la actividad para todos los destinos.", async () => {
    //     const AllDestiny = []
    //     description = "Actividad para todos los destinos"
    //     const response = await activitesApi.create("activitysCreate", {}, createActivity(AllDestiny,0,"T","P",description));
    //     const responseTask = await activitesApi.getTask(idActivity);
    //     expect(response).not.toBeNull();
    //     expect(response.status).toBe(200);
    //     expect(response.data).toHaveProperty("success", true);
    // });


})