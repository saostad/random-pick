<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	interface Gtag {
		(command: 'config', targetId: string, config?: any): void;
		(command: 'event', eventName: string, eventParameters?: any): void;
		(command: 'set', config: any): void;
		(command: string, ...args: any[]): void;
	}

	let gtag: Gtag | undefined;

	onMount(async () => {
		if (typeof window !== 'undefined') {
			// Load Google Analytics script
			const script = document.createElement('script');
			script.src = 'https://www.googletagmanager.com/gtag/js?id=G-R0425FNC9X';
			script.async = true;
			document.head.appendChild(script);

			// Initialize Google Analytics
			window.dataLayer = window.dataLayer || [];
			gtag = function (...args: any[]) {
				window.dataLayer.push(arguments);
			} as Gtag;
			gtag('js', new Date());
			gtag('config', 'G-R0425FNC9X');
		}
	});

	// Update Google Analytics when the page changes
	$: {
		if (gtag) {
			gtag('config', 'G-R0425FNC9X', {
				page_title: document.title,
				page_path: $page.url.href
			});
		}
	}
</script>
