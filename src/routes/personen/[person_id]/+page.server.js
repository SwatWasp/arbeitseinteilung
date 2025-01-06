import db from "$lib/db.js";
import { redirect } from "@sveltejs/kit";

export async function load({ params }) {
  const {person, einsaetze, offeneEinsaetze} = await db.getPerson(params.person_id);
  return {
    person,
    einsaetze,
    offeneEinsaetze
  };
}

export const actions = {
  update: async ({request}) => {
    let data = await request.formData();
    let id = data.get("id");
    let person = {
      _id: id,
      lapvariante: data.get("lapvariante"),
      bemerkungen: data.get("bemerkungen")      
    }
    await db.updatePerson(person);
  },
  delete: async ({ request }) => {
    const data = await request.formData();

    await db.deletePerson(data.get("id"));
    redirect(303, "/personen");
  },
  addToEinsatz: async ({ request, params }) => {
    const data = await request.formData();
    let beziehung = {
      person_id: params.person_id,
      einsatz_id: data.get("einsatz_id"),
    };
    await db.addPersonToEinsatz(beziehung);
  },
  removeFromEinsatz: async ({ request, params }) => {
    const data = await request.formData();
    let beziehung = {
      person_id: params.person_id,
      einsatz_id: data.get("einsatz_id"),
    };
    await db.removePersonFromEinsatz(beziehung);
  }
};