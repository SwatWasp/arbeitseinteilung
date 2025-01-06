<script>
  export let data;
  import "/src/styles/zurueck.css";
  import "/src/styles/bilder.css";
  import EinsatzDisplay from "$lib/Components/EinsatzDisplay.svelte";
  let person = data.person;
  let einsaetze = data.einsaetze;
</script>

<div class="row">
  <div class="col-auto zurueck">
    <a href="/personen" class="btn btn-primary link">Zurück</a>
  </div>
  <div class="col">
    <form method="POST" action="?/delete">
      <input type="hidden" name="id" value={person._id} />
      <button class="btn btn-danger">Person löschen</button>
    </form>
  </div>
</div>

<div class="row mt-3">
  <div class="col-9">
    <h1>{person.vorname} {person.nachname}</h1>
    <p>Geb. {person.geburtsdatum}</p>
    <p>Riege: {person.riege}</p>
    <p>Typ: {person.typ}</p>
    <h4>Bemerkungen:</h4>
    <form method="POST" action="?/update">
      <div class="row mb-1">
        <div class="col-auto">
          <label for="lapvariante" class="col-form-label">LAP Variante:</label>
        </div>
        <div class="col-auto">
          <input type="number" name="lapvariante" class="form-control" value={person.lapvariante} />
        </div>
      </div>
      <div>
        <div class="mb-2">
          <input type="hidden" name="id" value={person._id} />
          <textarea name="bemerkungen" class="form-control" rows="3"
            >{person.bemerkungen}</textarea
          >
        </div>
        <button type="submit" class="btn btn-secondary"
          >Änderungen Speichern</button
        >
      </div>
    </form>
  </div>
  <div class="col">
    <img
      src="/images/platzhalterPerson.jpg"
      alt="Bild von {person.vorname} {person.nachname}"
      class="bild"
    />
  </div>
</div>
<div class="row mt-3">
  {#each einsaetze as einsatz}
      <div class="col-sm-12 col-md-6 col-lg-3 mb-2 gx-2">
          <EinsatzDisplay {einsatz}></EinsatzDisplay>
      </div>
  {/each}
</div>