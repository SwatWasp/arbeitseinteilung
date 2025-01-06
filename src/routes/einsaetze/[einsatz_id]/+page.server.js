import db from "$lib/db.js";
import { redirect } from "@sveltejs/kit";

export async function load({ params }) {
  return {
    einsatz: await db.getEinsatz(params.einsatz_id),
  };
}

export const actions = {
  update: async ({request}) => {
    let data = await request.formData();
    let id = data.get("id");
    let einsatz = {
      _id: id,
      aufgabe: data.get("aufgabe"),
      datum: data.get("datum"),
      zeitVon: data.get("zeitVon"),
      zeitBis: data.get("zeitBis"),
      ressort: data.get("ressort"),
      anzahl: data.get("anzahl"),
      typ: data.get("typ")
    }
    await db.updateEinsatz(einsatz);
  },
  delete: async ({ request }) => {
    const data = await request.formData();

    await db.deleteEinsatz(data.get("id"));
    redirect(303, "/einsaetze");
  },
}