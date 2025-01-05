import { MongoClient, ObjectId } from "mongodb"; // See https://www.mongodb.com/docs/drivers/node/current/quick-start/
import { DB_URI } from "$env/static/private";
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

    // You can specify a query/filter here
    // See https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/query-document/
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
  try {
    const collection = db.collection("personen");
    const query = { _id: new ObjectId(id) }; // filter by id
    person = await collection.findOne(query);

    if (!person) {
      console.log("No person with id " + id);
      // TODO: errorhandling
    } else {
      person._id = person._id.toString(); // convert ObjectId to String
    }
  } catch (error) {
    // TODO: errorhandling
    console.log(error.message);
  }
  return person;
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
      console.log("Person it Id " + id + " wurde angepasst.");
      return id;
    }
  } catch (error) {
    // TODO: errorhandling
    console.log(error.message);
  }
  return null;
}

// export all functions so that they can be used in other files
export default {
  getPersonen,
  getPerson,
  updatePerson,
};