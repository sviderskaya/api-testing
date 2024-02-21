import { test, expect, APIResponse } from "@playwright/test";
import axios from 'axios'

// GET
test("get all users", async ({ request }) => {
    const issues = await request.get(`https://reqres.in/api/users?page=2`);
    expect(issues.status()).toBe(200)

    const responseBody = await issues.json()

    expect(responseBody["page"]).toBe(2)
    expect(responseBody["per_page"]).toBe(6)
    expect(responseBody["total"]).toBe(12)
    expect(responseBody["total_pages"]).toBe(2)
    expect(responseBody["data"]).toHaveLength(6)
    expect(responseBody["data"]).toContainEqual(expect.objectContaining({
        "id": 7,
        "email": "michael.lawson@reqres.in",
        "first_name": "Michael",
        "last_name": "Lawson",
        "avatar": "https://reqres.in/img/faces/7-image.jpg"
    }))
})

// PUT
test("update user name", async ({ request }) => {
    const urlPut = 'https://reqres.in/api/users/2';

    const putData = {
        name: 'John Doe PUT',
        job: 'Software Engineer PUT',
    };

    axios.put(urlPut, putData)
        .then(response => {
            console.log('Status Code:', response.status);
            console.log('Response Data:', response.data);
        })
        .catch(error => {
            console.error('Error:', error.response.status, error.response.data);
        });
})

// PATCH
test("adding new information to the user", async ({ request }) => {
    const urlPatch = 'https://reqres.in/api/users/2';

    const dataBeforePatch = {
        name: 'John Doe Updated',
        job: 'Software Engineer Updated',
    };

    const dataAfterPatch = {
        ...dataBeforePatch,
        "updatedAt": new Date().toISOString()
    }

    axios.patch(urlPatch, dataAfterPatch)
        .then(response => {
            console.log('Status Code:', response.status);
            console.log('Response Data:', response.data);
        })
        .catch(error => {
            console.error('Error:', error.response.status, error.response.data);
        });
})

// DELETE
test("delete user", async ({ request }) => {
    const urlDelete = await request.delete(`https://reqres.in/api/users?page=2`)
    expect(urlDelete.status()).toBe(204)
})