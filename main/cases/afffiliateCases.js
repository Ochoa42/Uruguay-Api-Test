import { faker } from '@faker-js/faker';
const fakerPerson = faker
import configuration from "../../configuration.json"
import environment from "../../environment.json"

export const afffiliatePreRegister =(sponsorId,nextUser,list,dpto,mun,bar,position) => {
    const affiliates = environment[configuration.environment].accounts.sharedAccount.Affiliates;
    const data = {
        "name":fakerPerson.person.firstName(),
        "middle_name": fakerPerson.person.middleName(),
        "last_name": fakerPerson.person.lastName(),
        "mother_last_name":fakerPerson.person.lastName(),
        "ci": nextUser,//affiliates[nexUser].email,
        "sponsor_id": sponsorId,
        "prefix_phone": "591",
        "phone": "78175728",
        "gender": fakerPerson.person.gender(),
        "lista_id": list,
        "dpto_id": dpto,
        "mun_id": mun,
        "barrio_id": bar,
        "position":position,
        
    } 
    return data
}

export const verifyAffiliate=(education_id) => {
    dataUpdate = {
    "is_verify": "A",
    "birthday": "1988-09-10",
    "email": fakerPerson.internet.exampleEmail(),
    "address":fakerPerson.location.direction(),
    "education_id": education_id,
    }
    return dataUpdate
}