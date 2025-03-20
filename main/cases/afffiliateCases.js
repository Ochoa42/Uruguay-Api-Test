import configuration from "../../configuration.json"
import { fakerData} from "../../core/utils/dependencies";
import environment from "../../environment.json"
import { generarId } from "../../core/utils/dependencies";

export const afffiliatePreRegister = (sponsorId, position, list = 1, dpto = 1, mun = 1,nextUser = null, bar = null) => {
    const generateAffiliateData = (ciValue) => ({
        name: fakerData.person.firstName(),
        middle_name: fakerData.person.middleName(),
        last_name: fakerData.person.lastName(),
        mother_last_name: fakerData.person.lastName(),
        ci: ciValue,
        sponsor_id: sponsorId,
        prefix_phone: "591",
        phone: fakerData.phone.number('7#######'),
        lista_id: list,
        dpto_id: dpto,
        mun_id: mun,
        barrio_id: bar,
        position,
    });

    if (nextUser === null) {
        return generateAffiliateData(generarId());
    }

    const affiliates = environment[configuration.environment].accounts.sharedAccount.Affiliates;
    return generateAffiliateData(affiliates[nextUser].email);
};

export const verifyAffiliate=(education_id) => {
    const dataUpdate = {
    "is_verify": "A",
    "birthday": "1988-09-10",
    "email": fakerData.internet.exampleEmail(),
    "address":fakerData.location.streetAddress({useFullAddress: true}),
    "education_id": education_id,
    "gender": "M",
    }
    return dataUpdate
}