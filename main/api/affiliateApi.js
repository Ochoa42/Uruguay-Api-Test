import endpoints from "../endpoints.js";
import { createApiClass } from "./createEntitiAPI";


export const affiliatesApi = createApiClass(endpoints.features.affiliate);