import { faker } from '@faker-js/faker';

export const category = {
    id: faker.number.int({ min: 1, max: 50 }),
    name: faker.animal.type()
};

export const PET_DATA = {
    id: faker.number.int({ min: 1, max: 1000 }),
    category: category,
    name: faker.animal.dog(),
    photoUrls: [
        faker.image.url(),
    ],
    tags: [
        {
            id: faker.number.int({ min: 1, max: 50 }),
            name: faker.animal.type(),
        }
    ],
    status: "available",
};

export const updatedPetData = {
    ...PET_DATA,
    name: faker.animal.cat(),
    status: "sold"
};

export const nonExistentPetId = 1234567890;