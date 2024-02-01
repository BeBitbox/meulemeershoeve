// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: {
    strict: false
  },
  modules: [
    '@vee-validate/nuxt',
    '@nuxt/ui'
  ],
  veeValidate: {
    // disable or enable auto imports
    autoImports: true,
    // Use different names for components
    componentNames: {
      Form: 'VeeForm',
      Field: 'VeeField',
      FieldArray: 'VeeFieldArray',
      ErrorMessage: 'VeeErrorMessage',
    },
  },
  app: {
    head: {
      title: 'Meulemeershoeve | Puppy\s te koop | Berner Sennen | Golden Retriever | Aalter',
      htmlAttrs: {
        lang: 'nl-BE'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'robots', content: 'all' },
        {
          name: 'keywords',
          content: 'Meulemeershoeve, Barelstraat 12, 9880 Aalter, Berner Sennen puppies, Golden Retriever puppies, honden te koop, hondenkwekerij, puppy\'s te koop, Berner Sennen kopen, Golden Retriever kopen, rashonden, Belgische hondenfokker, huisdieren, familievriendelijke honden, hondenopvoeding'
        },
        {
          hid: 'description',
          name: 'description',
          content: 'Meulemeershoeve in Aalter, een vertrouwde adres voor liefhebbers van Berner Sennen en Golden Retriever puppies. Met jarenlange ervaring in het fokken van kwalitatieve, gezonde en familievriendelijke honden, bieden wij de perfecte aanvulling voor uw gezin.'
        },

        { 'http-equiv': 'Cache-Control', content: 'public' },
        { name: 'geo.placename', content: 'Meulemeershoeve' },
      ],
      link: [
        { rel: 'canonical', href: 'https://meulemeershoeve.be' },
        { rel: 'alternate', href: 'https://meulemeershoeve.be', hreflang: 'x-default' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Nunito' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Lora' }
      ]
    },
  },
  css: [
    '~/assets/style/main.scss',
    '~/assets/style/reset.scss',
  ]
})
