export default {
  // Target Deployment
  target: 'server',
  //rendering mode SSR
  ssr: true,

  loading: {
    color: 'white', // <-- color
    height: '5px' // <-- height
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-ecommerce',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/images/logo3.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css'},
      { rel: 'stylesheet', href: 'https://cdn.linearicons.com/free/1.0.0/icon-font.min.css'},

    ],
    script: [
        { src: '/js/coreui.bundle.min.js' },
        { src: 'https://app.sandbox.midtrans.com/snap/snap.js', 'data-client-key': 'SB-Mid-client-kzP9_OY4MvFYFnTV' },
    ]

  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/style.min.css',
    '@/assets/css/custom.css',
    'vue-slick-carousel/dist/vue-slick-carousel.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vue-star-rating.js', mode: 'client' },
    { src: '~/plugins/chart.js', mode: 'client' },
    { src: '~/plugins/mixins.js' },
    { src: '~/plugins/vue-slick-carousel.js', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/pwa', 
  ],

  pwa: {
    meta: {
      title: '@andaristudio - Creative graphic design, Bullet Journal and Illustrations!',
      author: '@andaristudio'
    },
    manifest: {
      name: 'Andaristudio',
      short_name: 'andaristudio',
      description: 'Officially Online Store Aesthetic Stuff',
      lang: 'en'
    },
    icon: {
      fileName: 'images/logo3.png',
      sizes: [64, 120, 144, 152, 192, 384, 512]
    }
  },


  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    //https://dev.auth.nuxtjs.org/
    '@nuxtjs/auth-next',
    //https://github.com/avil13/vue-sweetalert2
    'vue-sweetalert2/nuxt',
  ],

  auth: {
    strategies: {
      //strategy "admin"
      admin: {
        scheme: 'local',
        token: {
            property: 'token',
            required: true,
            type: 'Bearer'
        },
        user: {
            property: 'user',
            // autoFetch: true
        },
        endpoints: {
            login: {
              url: '/api/admin/login',
              method: 'post',
              propertyName: 'token'
            },
            logout: {
              url: '/api/admin/logout',
              method: 'post'
            },
            user: {
              url: '/api/admin/user',
              method: 'get',
              propertyName: 'user'
            }
        },
      },
      //strategy "customer"
      customer: {
        scheme: 'local',
        token: {
            property: 'token',
            required: true,
            type: 'Bearer'
        },
        user: {
            property: 'user',
            // autoFetch: true
        },
        endpoints: {
            login: {
              url: '/api/customer/login',
              method: 'post',
              propertyName: 'token'
            },
            logout: {
              url: '/api/customer/logout',
              method: 'post'
            },
            user: {
              url: '/api/customer/user',
              method: 'get',
              propertyName: 'user'
            }
        },
      },
    },
  },



  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'http://localhost:8000'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
