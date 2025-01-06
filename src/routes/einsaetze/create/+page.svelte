<script>
    import "/src/styles/zurueck.css";
    let { form } = $props();
</script>

<div class="zurueck mb-3">
    <a href="/einsaetze" class="btn btn-primary link">Zurück</a>
</div>

<h1 class="mb-3">Einsatz erfassen</h1>
<form method="POST" action="?/create">
    <div class="row mb-3">
        <div class="col">
            <label for="" class="form-label">Einsatzbezeichnung</label>
            <input name="aufgabe" class="form-control" type="text" />
        </div>
        <div class="col">
            <label for="" class="form-label">Ressort</label>
            <input name="ressort" class="form-control" type="text" />
        </div>
    </div>
    <div class="row mb-3">
        <div class="col-6">
            <label for="" class="form-label">Datum</label>
            <input name="datum" class="form-control" type="date" />
        </div>
        <div class="col">
            <label for="" class="form-label">Zeit von:</label>
            <input name="zeitVon" class="form-control" type="text" />
        </div>
        <div class="col">
            <label for="" class="form-label">bis:</label>
            <input name="zeitBis" class="form-control" type="text" />
        </div>
    </div>
    <div class="row mb-3">
        <div class="col-6">
            <label for="" class="form-label">Treffpunkt</label>
            <input name="treffpunkt" class="form-control" type="text" />
        </div>
        <div class="col">
            <label for="" class="form-label">Anzahl</label>
            <input name="anzahl" class="form-control" type="number" />
        </div>
        <div class="col">
            <label for="" class="form-label">Typ</label>
            <input name="typ" class="form-control" type="text" />
        </div>
    </div>
    <button type="submit" class="btn btn-success">Einsatz hinzufügen</button>
</form>
