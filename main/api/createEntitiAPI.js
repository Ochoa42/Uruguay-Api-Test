import RequestManager from "../../core/requestManager";

export function createApiClass(endpointGroup) {
    class ApiClass {
        static #instance = null;
        #reqManager;

        constructor() {
            if (ApiClass.#instance) {
                return ApiClass.#instance;
            }

            this.#reqManager = RequestManager.getInstance();
            ApiClass.#instance = this;
        }

        static getInstance() {
            if (!ApiClass.#instance) {
                new ApiClass();
            }
            return ApiClass.#instance;
        }

        async request(method, endpointKey, pathParams = {}, body = null, authorization = null) {
            if (!endpointGroup.urls[endpointKey]) {
                throw new Error(`Endpoint '${endpointKey}' not defined`);
            }

            // Si no se pasa un token, usamos el predeterminado de RequestManager
            const authToken = authorization || this.#reqManager.getDefaultAuthorization();
            const req = this.#createRequest(method, endpointGroup.urls[endpointKey], pathParams, body, authToken);
            return this.#sendRequest(req);
        }

        async create(endpointKey, pathParams, body, authorization = null) {
            return this.request("post", endpointKey, pathParams, body, authorization);
        }

        async get(endpointKey, pathParams, authorization = null) {
            return this.request("get", endpointKey, pathParams, null, authorization);
        }

        async update(endpointKey, pathParams, body, authorization = null) {
            return this.request("put", endpointKey, pathParams, body, authorization);
        }

        async delete(endpointKey, pathParams, authorization = null) {
            return this.request("delete", endpointKey, pathParams, null, authorization);
        }

        #createRequest(method, endpoint, pathParams, body, authorization) {
            return {
                url: this.#replaceUrlParams(endpoint, pathParams),
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorization,
                },
                ...(body ? { data: body } : {})
            };
        }

        async #sendRequest(req) {
            try {
                return await this.#reqManager.sendRequest(req);
            } catch (error) {
                return error.response;
            }
        }

        #replaceUrlParams(url, params) {
            return url.replace(/{(.*?)}/g, (match, key) => params[key] || match);
        }
    }

    return new ApiClass();
}
