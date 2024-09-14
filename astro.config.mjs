import { defineConfig } from 'astro/config'
// import netlify from '@astrojs/netlify'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import node from '@astrojs/node'
/* https://docs.netlify.com/configure-builds/environment-variables/#read-only-variables */
const NETLIFY_DEPLOY_URL =
	process.env.CONTEXT === 'production'
		? process.env.URL
		: process.env.DEPLOY_PRIME_URL

// https://astro.build/config
export default defineConfig({
	site: NETLIFY_DEPLOY_URL || 'https://localhost:4321',
	output: 'hybrid',
	adapter: node({
		mode: 'standalone',
	}),
	integrations: [
		react(),
		tailwind({ applyBaseStyles: true }),
		(await import('astro-compress')).default({
			CSS: false,
			HTML: true,
			Image: false,
			JavaScript: false,
			SVG: false,
			Path: ['./dist/client/bug/'],
		}),
	],
	devToolbar: { enabled: false },
	experimental: {
		serverIslands: true,
	},
})
