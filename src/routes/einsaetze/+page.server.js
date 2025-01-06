import db from '$lib/db.js';

export async function load(params) {
    return {
        einsaetze: await db.getEinsaetze()
    }
}