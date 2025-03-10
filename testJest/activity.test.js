import { activitesApi } from "../main/api/activitesApi";
import { activityAllDestiny, activityAllOrg } from "../main/cases/activityCases";


describe("Activity API Integration Tests", () => {

    let idActivity;
    const afil = "Bearer 1221|C6HqeFwcGvFZHPstmHFOcR4xh0LyGBNhtJkiST1jb39e2b90"

    test("Verificar la creacion de la actividad para todas las organizaciones.", async () => {
        const response = await activitesApi.create("activitysCreate", {}, activityAllOrg);
        idActivity = response.data.data.id;
        expect(response).not.toBeNull();
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty("success", true);
    });

    test("Verificar la creacion de la actividad para todos los destinos.", async () => {
        const response = await activitesApi.create("activitysCreate", {}, activityAllDestiny);
        expect(response).not.toBeNull();
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty("success", true);
    });

    test("Verificar la segmentacion a los afiliados.", async () => {
        const response = await activitesApi.get("activitiesL", {},afil);
        const activities = response.data.data; 
        expect(response).not.toBeNull();
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty("success", true);
        expect(response.data).toHaveProperty("data");
        expect(Array.isArray(activities)).toBe(true);
        const activityExists = activities.some(activity => activity.id === idActivity);
        expect(activityExists).toBe(true);
    });
})