<script>
    let { person } = $props();
</script>

<div class="card">
    <div class="card-body">
        <div>Name: {person.vorname} {person.nachname}</div>
        <div>Geb. {person.geburtsdatum}</div>
        <div>Geb.: {person.riege}</div>
    </div>
</div>

<style>
    .card-body {
        justify-content: flex-end;
        padding: 5px;
    }
    .card {
        display: flex;
        justify-content: flex-end;
        flex-direction: column;
        border: 1px solid grey;
        padding-bottom: 10px;
        margin-bottom: 10px;
    }

    div {
        color:black;
    }
</style>