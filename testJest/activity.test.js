import { activitesApi } from "../main/api/activitesApi";
import { activityAllOrg } from "../main/cases/activityCases";


describe("Activity API Integration Tests", () => {

    let idActivity;

    test("Verificar la creacion de la actividad para todos los destinos.", async () => {
        const response = await activitesApi.create("activitysCreate", {}, activityAllOrg);
        idActivity = response.data.id;
        expect(response).not.toBeNull();
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty("success", true);
    });

    test("Verificar la segmentacion a los afiliados.", async () => {
        const response = await activitesApi.get("activitiesL", {}, "Bearer 1218|KMpjFZ3pjrot9UnEUNV00hGRlCaH7Ly37WtuC6I21864b2f5");
        console.log("response:",response.data)
        expect(response).not.toBeNull();
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty("success", true);
        expect(response.data).toHaveProperty("data");
        const activityExists = response.data.some(activity => activity.id === idActivity);
        expect(activityExists).toBe(true);
    });
})