<script>
	import '../app.css';
</script>

<header class="flex justify-between items-center py-4 bg-primary">
	<h1 class="text-white">My App</h1>
	<nav class="flex">
		<a href="#" class="text-white">Home</a>
		<a href="#" class="text-white">About</a>
		<a href="#" class="text-white">Contact</a>
	</nav>
</header>

<main class="py-4">
	<slot />
</main>

<footer class="py-4 bg-secondary">
	<p class="text-center text-white">Copyright 2023</p>
</footer>
