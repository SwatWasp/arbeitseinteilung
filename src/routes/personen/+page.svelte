<script>
    import { goto } from "$app/navigation";
    import PersonDisplay from "$lib/Components/PersonDisplay.svelte";
    let { data } = $props();
    let personen = data.personen;
</script>
<h1>Personen</h1>

<div class="row mt-3">
    {#each personen as person}
        <div class="col-sm-6 col-md-4 col-lg-3 mb-2 gx-2">
            <PersonDisplay {person}></PersonDisplay>
        </div>
    {/each}
</div>