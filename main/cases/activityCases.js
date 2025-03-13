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

export const activityAllOrg = {
    "lDestiny": [4,5,11,6,2,35,3,8,1],
    "destiny": 2,
    "begin_at": formatDate(beginAt),
    "end_at": formatDate(endAt),
    "activity_type": "T",
    "activity_mode": "P",
    "address": "Urubo",
    "location": "https://maps.app.goo.gl/BzB6BDg2uETrPcXm6",
    "volunteer_count": "10",
    "date_limit": formatDate(dateLimit),
    "name": "Mi actividad para todas las organizaciones",
    "description": "mi descripcion para todas las organizaciones",
    "coordinator_id": "99d1f463-c2bb-4174-99f3-dd82171c7ff1",
    "avatar": {
        "ext": "webp",
        "file": imagenes.MARIOBROSS
    }
}

export const activityAllDestiny = {
    "lDestiny": [],
    "destiny": 0,
    "begin_at": formatDate(beginAt),
    "end_at": formatDate(endAt),
    "activity_type": "R",
    "activity_mode": "P",
    "address": "Urubo",
    "location": "https://maps.app.goo.gl/BzB6BDg2uETrPcXm6",
    "volunteer_count": "10",
    "date_limit": formatDate(dateLimit),
    "name": "Mi actividad para todos los destinos",
    "description": "mi descripcion para todos los destinos",
    "coordinator_id": "99d1f463-c2bb-4174-99f3-dd82171c7ff1",
    "avatar": {
        "ext": "webp",
        "file": imagenes.MODELO1
    }
}