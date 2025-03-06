import endpoints from "../endpoints.js";
import { createApiClass } from "./createEntitiAPI";


export const contentApi = createApiClass(endpoints.features.contents);
