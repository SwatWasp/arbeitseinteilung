<script>
    import "/src/styles/layout.css";
    let { children } = $props();
</script>

<nav class="navbar navbar-expand-lg bg-body-tertiary bg-dark">
    <div class="container-fluid">
        <a class="navbar-brand" href="/"
            ><img
                src="https://stvdo.ch/wp-content/uploads/2017/11/Logo.svg"
                alt="Logo"
            /></a
        >
        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a
                        class="nav-link active"
                        aria-current="page"
                        href="/personen">Personen</a
                    >
                </li>
                <li class="nav-item">
                    <a
                        class="nav-link active"
                        aria-current="page"
                        href="/einsaetze">Einsätze</a
                    >
                </li>
            </ul>
        </div>
    </div>
</nav>

<div class="content">
    {@render children()}
</div>
