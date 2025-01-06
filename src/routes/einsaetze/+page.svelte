<script>
    import { goto } from "$app/navigation";
    import EinsatzDisplay from "$lib/Components/EinsatzDisplay.svelte";
    import PersonDisplay from "$lib/Components/EinsatzDisplay.svelte";
    let { data } = $props();
    let einsaetze = data.einsaetze;
</script>
<h1>Einsätze</h1>
<div>
    <a href="/einsaetze/create" class="btn btn-success">Einsatz hinzufügen</a>
</div>

<div class="row mt-3">
    {#each einsaetze as einsatz}
        <div class="col-sm-12 col-md-6 col-lg-3 mb-2 gx-2">
            <EinsatzDisplay {einsatz}></EinsatzDisplay>
        </div>
    {/each}
</div>