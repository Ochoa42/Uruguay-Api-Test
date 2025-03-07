import endpoints from "../endpoints.js";
import { createApiClass } from "./createEntitiAPI";


export const activitesApi = createApiClass(endpoints.features.activitys);