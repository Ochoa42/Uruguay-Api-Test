import configuration from "../configuration.json" assert { type: "json" };
import environments from "../environment.json" assert { type: "json" };

const apiKey =
  environments[configuration.environment].accounts.sharedAccount.apiKey;

const authenticatorManager = {
  apiKey: {
    headers: {
      Authorization: apiKey.value,
      "Content-Type": "application/json",
    },
  },
  bearer: {
    headers: {
      Authorization: `bearer ${apiKey.value}`,
      "Content-Type": "application/json",
    },
  },
  invalidApiKey: {
    headers: {
      Authorization: "pk_96750223_PWX6GN8YQOHIQ9P0PXE60EFYD40P7SWE",
      "Content-Type": "application/json",
    },
  },
};
export default authenticatorManager;
