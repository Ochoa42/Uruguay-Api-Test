import { createApiClass } from "../../core/requestManager.js";
import endpoints from "../endpoints";


const surveyApi = createApiClass (endpoints.features.surveys);
export default surveyApi;