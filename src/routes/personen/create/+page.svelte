<script>
    import "/src/styles/zurueck.css";
    let { form } = $props();
</script>

<div class="zurueck mb-3">
    <a href="/personen" class="btn btn-primary link">Zurück</a>
</div>

<h1 class="mb-3">Person erfassen</h1>
<form method="POST" action="?/create">
    <div class="row mb-3">
        <div class="col">
            <label for="" class="form-label">Vorname</label>
            <input name="vorname" class="form-control" type="text" />
        </div>
        <div class="col">
            <label for="" class="form-label">Nachname</label>
            <input name="nachname" class="form-control" type="text" />
        </div>
    </div>
    <div class="row mb-3">
        <div class="col">
            <label for="" class="form-label">Geburtsdatum</label>
            <input name="geburtsdatum" class="form-control" type="date" />
        </div>
        <div class="col">
            <label for="" class="form-label">Riege</label>
            <input name="riege" class="form-control" type="text" />
        </div>
    </div>
    <div class="row mb-3">
        <div class="col">
            <label for="" class="form-label">Typ</label>
            <input name="typ" class="form-control" type="text" />
        </div>
        <div class="col">
            <label for="" class="form-label">LAP Variante</label>
            <input name="lapvariante" class="form-control" type="number" />
        </div>
    </div>
    <div class="mb-3">
        <label for="" class="form-label">Bemerkungen</label>
        <textarea name="bemerkungen" class="form-control" type="text" rows="3"
        ></textarea>
    </div>
    <button type="submit" class="btn btn-success">Person hinzufügen</button>
</form>
