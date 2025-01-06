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
  addToEinsatz: async ({ request }) => {
    const data = await request.formData();
    console.log("FormData received:", Array.from(data.entries()));
    let beziehung = {
      person_id: data.get("id"),
      einsatz_id: data.get("einsatz_id"),
    };
    await db.addPersonToEinsatz(beziehung);
  },
};