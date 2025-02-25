import { createApiClass } from "../../core/requestManager.js";
import endpoints from "../endpoints";


const eventsApi = createApiClass (endpoints.features.events);
export default eventsApi;