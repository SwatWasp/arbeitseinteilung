<script>
    import { goto } from "$app/navigation";
    import PersonDisplay from "$lib/Components/PersonDisplay.svelte";
    let { data } = $props();
    let personen = data.personen;
</script>

<div id="personencard">
    {#each personen as person}
        <div>
            <PersonDisplay {person}></PersonDisplay>
        </div>
    {/each}
</div>

<style>
    #personencard {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
</style>