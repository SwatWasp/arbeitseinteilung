import db from '$lib/db.js';

export async function load(params) {
    return {
        personen: await db.getPersonen()
    }
}