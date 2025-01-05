import db from "$lib/db.js";
import { redirect } from "@sveltejs/kit";

export const actions = {
  create: async ({ request }) => {
    const data = await request.formData();
    const gebRoh = data.get("geburtsdatum");
    const [jahr, monat, tag] = gebRoh.split("-");
    const gebClean = `${tag}.${monat}.${jahr}`;
    let person = {
      vorname: data.get("vorname"),
      nachname: data.get("nachname"),
      geburtsdatum: gebClean,
      riege: data.get("riege"),
      typ: data.get("typ"),
      lapvariante: data.get("lapvariante"),
      bemerkungen: data.get("bemerkungen"),
    };
    const neuePersonId = await db.createPerson(person);

    throw redirect(303, `/personen/${neuePersonId}`);
    },
};