import { MongoClient, ObjectId } from "mongodb";
import { DB_URI } from "$env/static/private";
import { json } from '@sveltejs/kit';
import { get } from "svelte/store";

const client = new MongoClient(DB_URI);

await client.connect();
const db = client.db("arbeitseinteilung");

//////////////////////////////////////////
// Personen
//////////////////////////////////////////

// Alle Personen anzeigen
async function getPersonen() {
  let personen = [];
  try {
    const collection = db.collection("personen");

    const query = {};

    personen = await collection.find(query).toArray();
    personen.forEach((person) => {
      person._id = person._id.toString();
    });
  } catch (error) {
    console.log(error);
  }
  return personen;
}

// Person anhand der Id anzeigen
async function getPerson(id) {
  let person = null;
  let beziehungen = [];
  let einsaetze = [];
  let offeneEinsaetze = [];
  try {
    const collection1 = db.collection("personen");
    const query1 = { _id: new ObjectId(id) };
    person = await collection1.findOne(query1);

    if (!person) {
      console.log("No person with id " + id);
    } else {
      person._id = person._id.toString();
    }

    const collection2 = db.collection("personen_einsaetze");
    const query2 = { person_id: new ObjectId(id) };
    const beziehungen = await collection2.find(query2).toArray();

    if (beziehungen.length > 0) {
      const collection3 = db.collection("einsaetze");
      einsaetze = await Promise.all(
        beziehungen.map(async (beziehung) => {
          const query3 = { _id: beziehung.einsatz_id };
          const einsatz = await collection3.findOne(query3);
          if (einsatz) {
            einsatz._id = einsatz._id.toString();
          }
          return einsatz;
      })
      );
      const excludeIds = beziehungen.map(beziehung => beziehung.einsatz_id);
      const query4 = { _id: { $nin: excludeIds } };
      offeneEinsaetze = await collection3.find(query4).toArray();
      offeneEinsaetze = offeneEinsaetze.map(einsatz => {
        einsatz._id = einsatz._id.toString();
        return einsatz;
      });
    } else {
      const collection3 = db.collection("einsaetze");
      const excludeIds = beziehungen.map(beziehung => beziehung.einsatz_id);
      const query4 = { _id: { $nin: excludeIds } };
      offeneEinsaetze = await collection3.find(query4).toArray();
      offeneEinsaetze = offeneEinsaetze.map(einsatz => {
        einsatz._id = einsatz._id.toString();
        return einsatz;
      });
    }
  } catch (error) {
    console.log(error.message);
  }
  return {person, einsaetze, offeneEinsaetze};
}

// Daten einer Person updaten
async function updatePerson(person) {
  try {
    let id = person._id;
    delete person._id; // _id löschen, da es nicht geändert werden kann
    const collection = db.collection("personen");
    const query = { _id: new ObjectId(id) };
    const result = await collection.updateOne(query, { $set: person });

    if (result.matchedCount === 0) {
      console.log("Keine Person mit Id " + id);
    } else {
      console.log("Person mit Id " + id + " wurde angepasst.");
      return id;
    }
  } catch (error) {
    console.log(error.message);
  }
  return null;
}

// Person erstellen
async function createPerson(person) {
  try {
    const collection = db.collection("personen");
    const result = await collection.insertOne(person);
    return result.insertedId.toString();
  } catch (error) {
    console.log(error.message);
  }
  return null;
}

// Person löschen
async function deletePerson(id) {
  try {
    const collection = db.collection("personen");
    const query = { _id: new ObjectId(id) };
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      console.log("Keine Person mit Id " + id);
    } else {
      console.log("Person mit Id " + id + "wurde gelöscht.");
      return id;
    }
  } catch (error) {
    console.log(error.message);
  }
  return null;
}


//////////////////////////////////////////
// Einsätze
//////////////////////////////////////////

// Alle Einsätze anzeigen
async function getEinsaetze() {
  let einsaetze = [];
  try {
    const collection = db.collection("einsaetze");

    const query = {};

    einsaetze = await collection.find(query).toArray();
    einsaetze.forEach((einsatz) => {
      einsatz._id = einsatz._id.toString();
    });
  } catch (error) {
    console.log(error);
  }
  return einsaetze;
}

// Einsatz anhand der Id anzeigen
async function getEinsatz(id) {
  let einsatz = null;
  let beziehungen = [];
  let personen = [];
  try {
    const collection1 = db.collection("einsaetze");
    const query1 = { _id: new ObjectId(id) };
    einsatz = await collection1.findOne(query1);

    if (!einsatz) {
      console.log("No einsatz with id " + id);
    } else {
      einsatz._id = einsatz._id.toString();
    }

    const collection2 = db.collection("personen_einsaetze");
    const query2 = { einsatz_id: new ObjectId(id) };
    const beziehungen = await collection2.find(query2).toArray();

    if (beziehungen.length > 0) {
      const collection3 = db.collection("personen");
      personen = await Promise.all(
        beziehungen.map(async (beziehung) => {
          const query3 = { _id: beziehung.person_id };
          const person = await collection3.findOne(query3);
          if (person) {
            person._id = person._id.toString();
          }
          return person;
      })
      );
    }

  } catch (error) {
    console.log(error.message);
  }
  return {einsatz, personen};
}

// Daten eines Einsatzes updaten
async function updateEinsatz(einsatz) {
  try {
    let id = einsatz._id;
    delete einsatz._id; // _id löschen, da es nicht geändert werden kann
    const collection = db.collection("einsaetze");
    const query = { _id: new ObjectId(id) };
    const result = await collection.updateOne(query, { $set: einsatz });

    if (result.matchedCount === 0) {
      console.log("Kein Einsatz mit Id " + id);
    } else {
      console.log("Einsatz mit Id " + id + " wurde angepasst.");
      return id;
    }
  } catch (error) {
    console.log(error.message);
  }
  return null;
}

// Einsatz erstellen
async function createEinsatz(einsatz) {
  try {
    const collection = db.collection("einsaetze");
    const result = await collection.insertOne(einsatz);
    return result.insertedId.toString();
  } catch (error) {
    console.log(error.message);
  }
  return null;
}

// Einsatz löschen
async function deleteEinsatz(id) {
  try {
    const collection = db.collection("einsaetze");
    const query = { _id: new ObjectId(id) };
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      console.log("Kein Einsatz mit Id " + id);
    } else {
      console.log("Einsatz mit Id " + id + "wurde gelöscht.");
      return id;
    }
  } catch (error) {
    console.log(error.message);
  }
  return null;
}


//////////////////////////////////////////
// Beziehungen
//////////////////////////////////////////

// Einen Einsatz einer Person zuweisen
async function addPersonToEinsatz(beziehung) {
  try {
    beziehung.person_id = new ObjectId(beziehung.person_id);
    beziehung.einsatz_id = new ObjectId(beziehung.einsatz_id);

    const collection = db.collection("personen_einsaetze");
    const result = await collection.insertOne(beziehung);
    return result.insertedId.toString();
  } catch (error) {
    console.log(error.message);
  }
  return null;
}

// Einen Einsatz von einer Person entfernen
async function removePersonFromEinsatz(beziehung) {
  try {
    beziehung.person_id = new ObjectId(beziehung.person_id);
    beziehung.einsatz_id = new ObjectId(beziehung.einsatz_id);

    const collection = db.collection("personen_einsaetze");
    const result = await collection.deleteOne(beziehung);

    if (result.deletedCount === 0) {
      console.log("Keine Beziehung gefunden.");
    } else {
      console.log("Beziehung wurde gelöscht.");
      return beziehung;
    }
  } catch (error) {
    console.log(error.message);
  }
  return null;
}

// Export aller Funktionen
export default {
  getPersonen,
  getPerson,
  updatePerson,
  createPerson,
  deletePerson,
  getEinsaetze,
  getEinsatz,
  updateEinsatz,
  createEinsatz,
  deleteEinsatz,
  addPersonToEinsatz,
  removePersonFromEinsatz
};