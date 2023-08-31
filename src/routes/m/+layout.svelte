<script lang="ts">

    import Header from '$lib/components/theme/header/Header.svelte';
    import Footer from '$lib/components/theme/footer/Footer.svelte';
</script>
<Header />
<main id="content">
<slot/>
</main>

<Footer />