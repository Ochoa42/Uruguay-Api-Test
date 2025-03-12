// import { createContentforAll, createContentforOrg, createContentforOrg2, createContentforOrg3, createContentforOrgAll } from "../main/cases/contentCases.js";
// import { contentApi } from "../main/api/contentApi";

// describe("Content API Integration Tests", () => {

// test("Verificar la creacion de las noticias para todos los destinos.", async () => {
//     const response = await contentApi.create("contenstCreate", {}, createContentforAll);
//     expect(response).not.toBeNull();
//     expect(response.status).toBe(200);
//     expect(response.data).toHaveProperty("success", true);
// });

// test("Verificar la creacion de las noticias para las organizaciones PDP,LRN,STO.", async () => {
//     const response = await contentApi.create("contenstCreate", {}, createContentforOrg);
//     expect(response).not.toBeNull();
//     expect(response.status).toBe(200);
//     expect(response.data).toHaveProperty("success", true);
// });

// test("Verificar la creacion de las noticias para las organizaciones AIEA,CNC,DDR.", async () => {
//     const response = await contentApi.create("contenstCreate", {}, createContentforOrg2);
//     expect(response).not.toBeNull();
//     expect(response.status).toBe(200);
//     expect(response.data).toHaveProperty("success", true);
// });

// test("Verificar la creacion de las noticias para las organizaciones SMR,CNJ,ODP.", async () => {
//     const response = await contentApi.create("contenstCreate", {}, createContentforOrg3);
//     expect(response).not.toBeNull();
//     expect(response.status).toBe(200);
//     expect(response.data).toHaveProperty("success", true);
// });

// test("Verificar la creacion de las noticias para todas las organizaciones.", async () => {
//     const response = await contentApi.create("contenstCreate", {}, createContentforOrgAll);
//     expect(response).not.toBeNull();
//     expect(response.status).toBe(200);
//     expect(response.data).toHaveProperty("success", true);
// });

// test("Verificar la creacion de las noticias para todas las organizaciones con un error.", async () => {
//     const response = await contentApi.create("contenstCreate", {}, createContentforOrgAll);
//     expect(response).not.toBeNull();
//     expect(response.status).toBe(200);
//     expect(response.data).toHaveProperty("success", true);
// })

// });
