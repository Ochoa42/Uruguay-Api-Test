import { imagenes } from "../../core/utils/img/formatWebp";
import { fakerData } from "../../core/utils/dependencies";
const today = new Date();
const beginAt = new Date();
beginAt.setDate(today.getDate() + 2);

const endAt = new Date(beginAt);
endAt.setDate(beginAt.getDate() + 5);

const dateLimit = new Date(beginAt);
dateLimit.setDate(today.getDate() + 1);

const formatDate = (date) => date.toISOString().slice(0, 19).replace('T', ' ');

export const createActivity=(lDestiny,destiny,activity_type,activity_mode,forDestiny)=> {
    const body = {
        "lDestiny": lDestiny,//[4,5,11,6,2,35,3,8,1],
        "destiny": destiny,//2,
        "begin_at": formatDate(beginAt),
        "end_at": formatDate(endAt),
        "activity_type": activity_type,//"T",
        "activity_mode": activity_mode,//"P",
        "address": fakerData.location.streetAddress({useFullAddress: true}),
        "location": "https://maps.app.goo.gl/BzB6BDg2uETrPcXm6",
        "volunteer_count": "10",
        "date_limit": formatDate(dateLimit),
        "name": fakerData.lorem.lines(2),
        "description": forDestiny,//"Mi actividad para todas las organizaciones",
        "coordinator_id": "99d1f463-c2bb-4174-99f3-dd82171c7ff1",
        "avatar": {
            "ext": "webp",
            "file": imagenes.MARIOBROSS
        }
    }
    return body;
}

// export const activityAllDestiny = {
//     "lDestiny": [],
//     "destiny": 0,
//     "begin_at": formatDate(beginAt),
//     "end_at": formatDate(endAt),
//     "activity_type": "R",
//     "activity_mode": "P",
//     "address": "Urubo",
//     "location": "https://maps.app.goo.gl/BzB6BDg2uETrPcXm6",
//     "volunteer_count": "10",
//     "date_limit": formatDate(dateLimit),
//     "name": fakerData.lorem.lines(2),
//     "description": "mi descripcion para todos los destinos",
//     "coordinator_id": "99d1f463-c2bb-4174-99f3-dd82171c7ff1",
//     "avatar": {
//         "ext": "webp",
//         "file": imagenes.MODELO1
//     }
// }

export const createTask=(beginAt,endAt,coordinatorId,activity_id)=>{
    const task = {
    "description": fakerData.lorem.lines(5),
    "volunteer_count": "15",
    "points": "100",
    "begin_at": beginAt,
    "end_at": endAt,
    "requirements": fakerData.lorem.paragraphs(),
    "address": fakerData.location.streetAddress({useFullAddress: true}),
    "location": "https://www.google.com/maps/place/Residencial+No+te+Olvides/@-17.787483,-63.1896334,18.15z/data=!4m6!3m5!1s0x93f1e8054c4756d1:0xaf2333efd5242437!8m2!3d-17.7871032!4d-63.1923894!16s%2Fg%2F11h9wkygcm?entry=ttu&g_ep=EgoyMDI0MDgyNy4wIKXMDSoASAFQAw%3D%3D",
    "coordinator_id": coordinatorId,
    "activity_id": activity_id
    }
    return task
}