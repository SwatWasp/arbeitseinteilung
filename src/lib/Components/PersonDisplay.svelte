<script>
    import "/src/styles/display.css";
    let { person } = $props();
</script>

<div class="person-card">
    <div class="card-body row">
        <div class="col-10">
            <div class="title">
                <a href={"/personen/" + person._id}>{person.vorname} {person.nachname}</a>
            </div>
            <div>Geb. {person.geburtsdatum}</div>
            <div>{person.riege}</div>
        </div>
        <div class="col position-relative">
            <div class="fs-1 position-absolute top-50 translate-middle">
                <div class="type">{person.typ}</div>
            </div>
        </div>
    </div>
</div>