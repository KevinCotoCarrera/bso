// @ts-check
import { defineConfig, envField } from 'astro/config';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  experimental : {
      env: {
          schema: {
              STRAPI_URL: envField.string({
                  context: 'server',
                  access: 'secret',
                  optional: false,
              }),
              TOKEN: envField.string({
                  context: 'server',
                  access: 'secret',
                  optional: false,

              })
          }
      }
	},

  redirects: {
      '/': '/login'
	},

  output: 'server',

  adapter: node({
    mode: 'standalone'
  })
});