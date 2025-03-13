import { faker } from '@faker-js/faker';
export const fakerData = faker
export function generarId() {
    return Math.floor(1000000 + Math.random() * 9000000).toString();
}