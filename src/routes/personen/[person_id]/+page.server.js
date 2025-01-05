import db from "$lib/db.js";
import { redirect } from "@sveltejs/kit";

export async function load({ params }) {
  return {
    person: await db.getPerson(params.person_id),
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
  }
}