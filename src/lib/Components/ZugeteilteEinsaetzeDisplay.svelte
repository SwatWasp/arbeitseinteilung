<script>
    import "/src/styles/display.css";
    let { einsatz } = $props();
</script>

<div class="display-card">
    <div class="card-body row">
        <div class="col-10">
            <div class="title">
                <a href={"/einsaetze/" + einsatz._id}>{einsatz.aufgabe}</a>
            </div>
            <div>{einsatz.datum}, {einsatz.zeitVon} - {einsatz.zeitBis} Uhr</div>
            <div>Ressort: {einsatz.ressort}</div>
        </div>
        <div class="col position-relative">
            <form method="POST" action="?/removeFromEinsatz">
                <input type="hidden" name="einsatz_id" value={einsatz._id} />
                <button type="submit" class="btn btn-danger">-</button>
            </form>
        </div>
    </div>
</div>