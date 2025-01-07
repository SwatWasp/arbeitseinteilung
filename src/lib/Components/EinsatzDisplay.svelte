<script>
    import "/src/styles/display.css";
    let { einsatz } = $props();
</script>

<div class="display-card">
    <div>
        <div>
            <a class="title" href={"/einsaetze/" + einsatz._id}
                >{einsatz.aufgabe}</a
            >
        </div>
        <div>{einsatz.datum}, {einsatz.zeitVon} - {einsatz.zeitBis} Uhr</div>
        <div>Ressort: {einsatz.ressort}</div>
    </div>
</div>
