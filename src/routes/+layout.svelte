<script>
    let { children } = $props();
    import "./layout.css";
</script>

<ul class="nav">
    <li>
        <img src="https://stvdo.ch/wp-content/uploads/2017/11/Logo.svg" alt="Logo">
    </li>
    <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="/">Home</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="/personen">Personen</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="/einsaetze">Einsätze</a>
    </li>
</ul>

<div class="container mt-4">
    {@render children()}
</div>
