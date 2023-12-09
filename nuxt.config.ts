// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path';

export default defineNuxtConfig({
  alias: {
    "@":resolve(__dirname,"/")
  },
  css:["./assets/main.scss"],
  server: {
    port: 8000, // default: 3000
    host: '0.0.0.0' // default: localhost
  }
})

// devtools: { enabled: true },
