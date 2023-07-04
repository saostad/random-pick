import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		preprocess({
			postcss: true
		})
	],
	vitePlugin: {
		inspector: true
	},
	kit: {
		alias: {
			$components: 'src/components',
			$helpers: 'src/helpers',
			$i18n: 'src/i18n',
			$lib: 'src/lib',
			$services: 'src/services',
			$types: 'src/types',
			$stores: 'src/stores'
		},
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
	}
};

export default config;
