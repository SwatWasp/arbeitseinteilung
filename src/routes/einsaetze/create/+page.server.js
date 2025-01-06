import db from "$lib/db.js";
import { redirect } from "@sveltejs/kit";

export const actions = {
  create: async ({ request }) => {
    const data = await request.formData();
    const datRoh = data.get("datum");
    const [jahr, monat, tag] = datRoh.split("-");
    const datClean = `${tag}.${monat}.${jahr}`;
    let einsatz = {
        aufgabe: data.get("aufgabe"),
        datum: datClean,
        zeitVon: data.get("zeitVon"),
        zeitBis: data.get("zeitBis"),
        ressort: data.get("ressort"),
        anzahl: data.get("anzahl"),
        typ: data.get("typ"),
        treffpunkt: data.get("treffpunkt")
    };
    const neuerEinsatzId = await db.createEinsatz(einsatz);

    throw redirect(303, `/einsaetze/${neuerEinsatzId}`);
    },
};