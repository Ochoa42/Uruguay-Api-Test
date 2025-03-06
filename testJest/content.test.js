import { createContentforAll } from "../main/cases/contentCases.js";
import { contentApi } from "../main/api/contentApi";

describe("Content API Integration Tests", () => {

  const token = "Bearer 1175|k1H3Zr2Pl2PejEbS7J9XvvphW30s3BMV6nx5MPNIa3d7ddbc"

  test("Verificar la creacion de las noticias.", async () => {
    console.log("mi create conten", createContentforAll);
    const response = await contentApi.create("contenstCreate", {}, createContentforAll);
    console.log("mi body",response.data)
    expect(response).not.toBeNull();
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty("success", true);
  });

  
});
