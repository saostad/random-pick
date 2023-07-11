<script lang="ts">
	import { locale } from '$i18n/i18n-svelte';
</script>

<h2>Products</h2>

<ul>
	<li>
		<a href={`/${$locale}/products/random-number`}>Generate a Random Number</a>
	</li>
	<li>
		<a href={`/${$locale}/products/random-name`}>Choose a Random Name</a>
	</li>
</ul>
