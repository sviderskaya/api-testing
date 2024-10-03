import { test, expect } from "@playwright/test";
import { PET_DATA, updatedPetData, nonExistentPetId } from "../data/petData";

const baseURL = 'https://petstore.swagger.io/v2/pet';

// negative test
test.describe('Negative tests', () => {
    test('Get pet with non-existent pet id', async ({ request }) => {
        const response = await request.get(`${baseURL}/${nonExistentPetId}`);

        expect(response.status()).toEqual(404);
        const body = await response.json();
        expect(body.message).toEqual('Pet not found');
    });

    test('Delete pet with non-existent pet id', async ({ request }) => {
        const response = await request.delete(`${baseURL}/${nonExistentPetId}`);
        expect(response.status()).toEqual(404);
    })
});

// positive test
test.describe('Pet endpoint flow', () => {
    let petId: number;
    let petName: string;

    test('Add a new pet to the store using the POST request', async ({ request }) => {
        const response = await request.post(baseURL, {
            data: PET_DATA
        })
        const body = await response.json();
        expect(response.status()).toEqual(200);
        petId = body.id;
        petName = body.name;

        await test.step('Get a pet by ID using the GET request', async () => {
            expect(petId).toBeDefined();
            expect(petName).toBeDefined();

            const response = await request.get(`${baseURL}/${petId}`);
            const petData = await response.json();

            expect(response.status()).toEqual(200);
            expect(petData.id).toEqual(petId);
            expect(petData.name).toEqual(petName);
        });

        await test.step('Update a pet using the PUT request', async () => {
            const response = await request.put(baseURL, {
                data: updatedPetData
            });
            const updatedPet = await response.json();

            expect(response.status()).toEqual(200);
            expect(updatedPet.name).toEqual(updatedPetData.name);
            expect(updatedPet.status).toEqual(updatedPetData.status);
        });

        await test.step('Delete a pet using the DELETE request', async () => {
            const response = await request.delete(`${baseURL}/${petId}`)

            expect(response.status()).toEqual(200);
        });

        await test.step('Validate that the pet was successfully removed', async () => {
            const response = await request.get(`${baseURL}/${petId}`);

            expect(response.status()).toEqual(404);
        });
    });
});