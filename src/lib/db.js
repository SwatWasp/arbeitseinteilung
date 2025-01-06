import { MongoClient, ObjectId } from "mongodb"; // See https://www.mongodb.com/docs/drivers/node/current/quick-start/
import { DB_URI } from "$env/static/private";
import { json } from '@sveltejs/kit';
import { get } from "svelte/store";

const client = new MongoClient(DB_URI);

await client.connect();
const db = client.db("arbeitseinteilung"); // select database

//////////////////////////////////////////
// Personen
//////////////////////////////////////////

// Alle Personen anzeigen
async function getPersonen() {
  let personen = [];
  try {
    const collection = db.collection("personen");

    const query = {};

    // Get all objects that match the query
    personen = await collection.find(query).toArray();
    personen.forEach((person) => {
      person._id = person._id.toString(); // convert ObjectId to String
    });
  } catch (error) {
    console.log(error);
    // TODO: errorhandling
  }
  return personen;
}

// Get person by id
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
      // TODO: errorhandling
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
    // TODO: errorhandling
    console.log(error.message);
  }
  return {person, einsaetze, offeneEinsaetze};
}

// returns: id of the updated person or null, if person could not be updated
async function updatePerson(person) {
  try {
    let id = person._id;
    delete person._id; // delete the _id from the object, because the _id cannot be updated
    const collection = db.collection("personen");
    const query = { _id: new ObjectId(id) }; // filter by id
    const result = await collection.updateOne(query, { $set: person });

    if (result.matchedCount === 0) {
      console.log("Keine Person mit Id " + id);
      // TODO: errorhandling
    } else {
      console.log("Person mit Id " + id + " wurde angepasst.");
      return id;
    }
  } catch (error) {
    // TODO: errorhandling
    console.log(error.message);
  }
  return null;
}

async function createPerson(person) {
  try {
    const collection = db.collection("personen");
    const result = await collection.insertOne(person);
    return result.insertedId.toString(); // convert ObjectId to String
  } catch (error) {
    // TODO: errorhandling
    console.log(error.message);
  }
  return null;
}


async function deletePerson(id) {
  try {
    const collection = db.collection("personen");
    const query = { _id: new ObjectId(id) }; // filter by id
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      console.log("Keine Person mit Id " + id);
    } else {
      console.log("Person mit Id " + id + "wurde gelöscht.");
      return id;
    }
  } catch (error) {
    // TODO: errorhandling
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

    // Get all objects that match the query
    einsaetze = await collection.find(query).toArray();
    einsaetze.forEach((einsatz) => {
      einsatz._id = einsatz._id.toString(); // convert ObjectId to String
    });
  } catch (error) {
    console.log(error);
    // TODO: errorhandling
  }
  return einsaetze;
}

// Get einsatz by id
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
      // TODO: errorhandling
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
    // TODO: errorhandling
    console.log(error.message);
  }
  return {einsatz, personen};
}

// returns: id of the updated einsatz or null, if einsatz could not be updated
async function updateEinsatz(einsatz) {
  try {
    let id = einsatz._id;
    delete einsatz._id; // delete the _id from the object, because the _id cannot be updated
    const collection = db.collection("einsaetze");
    const query = { _id: new ObjectId(id) }; // filter by id
    const result = await collection.updateOne(query, { $set: einsatz });

    if (result.matchedCount === 0) {
      console.log("Kein Einsatz mit Id " + id);
      // TODO: errorhandling
    } else {
      console.log("Einsatz mit Id " + id + " wurde angepasst.");
      return id;
    }
  } catch (error) {
    // TODO: errorhandling
    console.log(error.message);
  }
  return null;
}

async function createEinsatz(einsatz) {
  try {
    const collection = db.collection("einsaetze");
    const result = await collection.insertOne(einsatz);
    return result.insertedId.toString(); // convert ObjectId to String
  } catch (error) {
    // TODO: errorhandling
    console.log(error.message);
  }
  return null;
}

async function deleteEinsatz(id) {
  try {
    const collection = db.collection("einsaetze");
    const query = { _id: new ObjectId(id) }; // filter by id
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      console.log("Kein Einsatz mit Id " + id);
    } else {
      console.log("Einsatz mit Id " + id + "wurde gelöscht.");
      return id;
    }
  } catch (error) {
    // TODO: errorhandling
    console.log(error.message);
  }
  return null;
}


//////////////////////////////////////////
// Beziehungen
//////////////////////////////////////////

async function addPersonToEinsatz(beziehung) {
  try {
    beziehung.person_id = new ObjectId(beziehung.person_id);
    beziehung.einsatz_id = new ObjectId(beziehung.einsatz_id);

    const collection = db.collection("personen_einsaetze");
    const result = await collection.insertOne(beziehung);
    return result.insertedId.toString();
  } catch (error) {
    // TODO: errorhandling
    console.log(error.message);
  }
  return null;
}

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

// export all functions so that they can be used in other files
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