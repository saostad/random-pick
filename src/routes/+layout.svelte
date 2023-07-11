<script>
	import Footer from '$components/layout/Footer.svelte';
	import Header from '$components/layout/Header.svelte';
	import '../app.css';
</script>

<Header />

<main class="md:container md:mx-auto">
	<article class="prose lg:prose-xl">
		<slot />
	</article>
</main>

<Footer />
