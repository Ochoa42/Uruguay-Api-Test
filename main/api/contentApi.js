import { createApiClass } from "../../core/requestManager.js";
import endpoints from "../endpoints";


const contentApi = createApiClass (endpoints.features.contents);
export default contentApi;