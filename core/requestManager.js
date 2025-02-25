import axios from "axios";
import environmentsJson from "../environment.json" with { type: "json" };
import configurationJson from "../configuration.json" with { type: "json" };
import { logger } from "./utils/loggerManager.js";
import { response } from "express";

/**
 * @class RequestManager
 * @description Singleton class to manage HTTP requests.
 */
class RequestManager {

    /**
     * @type {string}
     * @private
     * @description Base URL for API requests, determined by the current environment configuration.
     */
    #baseUrl;

    /**
     * @type {axios.AxiosInstance}
     * @private
     * @description Axios instance with default configuration.
     */
    #axiosInstance;

    /**
     * The single instance of the class.
     * @type {RequestManager|null}
     * @private
     */
    static #instance = null;

    /**
     * Private constructor to prevent direct instantiation.
     * Initializes the base URL and the Axios instance with default settings.
     * @throws {Error} If an instance of RequestManager already exists.
     */
    constructor() {
        if (RequestManager.#instance) {
            throw new Error("You cannot create multiple instances of this class.");
        }
        RequestManager.#instance = this;

        this.#baseUrl = environmentsJson[configurationJson.environment].apiBaseUrl;
        this.#axiosInstance = axios.create({
            baseURL: this.#baseUrl,
            timeout: configurationJson.timeout,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${environmentsJson[configurationJson.environment].accounts.sharedAccount.apiKey.value}`
            }
            
        });
    }

    /**
     * Get the single instance of the class.
     * If the instance does not exist, it creates one.
     * @returns {RequestManager} The single instance of the class.
     */
    static getInstance() {
        if (!RequestManager.#instance) {
            RequestManager.#instance = new RequestManager();
        }
        return RequestManager.#instance;
    }

    /**
     * Send an HTTP request using Axios.
     * If headers are provided in the request data, the authorization token is set.
     * @param {Object} reqData - The request data.
     * @param {string} reqData.url - The endpoint URL, relative to the base URL.
     * @param {string} [reqData.method='get'] - The HTTP method (get, post, put, delete, etc.).
     * @param {Object} [reqData.headers={}] - HTTP headers.
     * @param {Object} [reqData.params={}] - URL query parameters.
     * @param {Object} [reqData.data={}] - Request body data (for methods like post and put).
     * @returns {Promise} A promise that resolves to the Axios response.
     * @throws {Error} If an error occurs while sending the request.
     */
    async sendRequest(reqData) {
        try {
            logger.info(`RequestManager.sendRequest: ${reqData.method.toUpperCase()} ${reqData.url} `);

            const response = await this.#axiosInstance.request(reqData);

            logger.info(`Response: ${response.status} `);

        return response;
        } catch (error) {
            //errorLogger.error(`RequestManager.sendRequest Error: ${response.message}`);
            return error.response;
        }
    }

    /**
     * Set a new Authorization token.
     * Updates the Authorization header for the Axios instance.
     * @param {string} token - The new Authorization token.
     */
    setAuthorizationToken(token) {
        this.#axiosInstance.defaults.headers["Authorization"] = token;
    }

    getDefaultAuthorization() {
        return this.#axiosInstance.defaults.headers["Authorization"];
    }
    // Método estático solo para propósitos de prueba
    static resetInstance() {
        RequestManager.#instance = null;
    }
}

export default RequestManager;
