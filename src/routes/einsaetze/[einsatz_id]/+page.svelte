<script>
    export let data;
    import "/src/styles/zurueck.css";
    import "/src/styles/bilder.css";
    import PersonDisplay from "$lib/Components/PersonDisplay.svelte";
    let einsatz = data.einsatz;
    let personen = data.personen;
</script>
  
  <div class="row">
    <div class="col-auto zurueck">
      <a href="/einsaetze" class="btn btn-primary link">Zurück</a>
    </div>
    <div class="col">
      <form method="POST" action="?/delete">
        <input type="hidden" name="id" value={einsatz._id} />
        <button class="btn btn-danger">Einsatz löschen</button>
      </form>
    </div>
  </div>
  <div class="row mt-3">
    <div class="col-9">
        <form method="POST" action="?/update">
            <div class="mb-3">
               <input type="text" name="aufgabe" class="form-control fs-1" value={einsatz.aufgabe} />
            </div>
            <div class="row mb-1">
                <div class="col-2">
                    <label for="datum" class="col-form-label">Datum:</label>
                </div>
                <div class="col-auto">
                    <input type="text" name="datum" class="form-control" value={einsatz.datum} />
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-2">
                    <label for="zeitVon" class="col-form-label">Zeit von:</label>
                </div>
                <div class="col-auto">
                    <input type="text" name="zeitVon" class="form-control" value={einsatz.zeitVon} />
                </div>
                <div class="col-auto">
                    <label for="zeitBis" class="col-form-label"> bis:</label>
                </div>
                <div class="col-auto">
                    <input type="text" name="zeitBis" class="form-control" value={einsatz.zeitBis} />
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-2">
                    <label for="ressort" class="col-form-label">Ressort:</label>
                </div>
                <div class="col-auto">
                    <input type="text" name="ressort" class="form-control" value={einsatz.ressort} />
                </div>
            </div>
            <div class="row mb-2">
                <div class="col-2">
                    <label for="anzahl" class="col-form-label">benötigt:</label>
                </div>
                <div class="col-auto">
                    <input type="number" name="anzahl" class="form-control" value={einsatz.anzahl} />
                </div>
                <div class="col-auto">
                    <label for="typ" class="col-form-label"> Typ:</label>
                </div>
                <div class="col-auto">
                    <input type="text" name="typ" class="form-control" value={einsatz.typ} />
                </div>
            </div>
            <input type="hidden" name="id" value={einsatz._id} />
            <button type="submit" class="btn btn-secondary">Änderungen Speichern</button>
        </form>
    </div>
    <div class="col">
      <img
        src="/images/platzhalterStandort.png"
        alt="Einsatzstandort"
        class="bild"
      />
      <h4 class="text-center">{einsatz.treffpunkt}</h4>
    </div>
  </div>  
  <div class="row mt-3">
    {#each personen as person}
        <div class="col-sm-6 col-md-4 col-lg-3 mb-2 gx-2">
            <PersonDisplay {person}></PersonDisplay>
        </div>
    {/each}
</div>