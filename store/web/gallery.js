//state
export const state = () => ({
 //galleries
 Galleries: [],
 //gallery
 gallery: {},

})

//mutations
export const mutations = {
    //mutation "SET_GALLERIES_DATA"
    SET_GALLERIES_DATA(state, payload) {
    //set value state "galleries"
    state.galleries = payload
    },
    //mutation "SET_GALLERY_DATA"
    SET_GALLERY_DATA(state, payload) {
    //set value state "gallery"
    state.gallery = payload
    },
}

//actions
export const actions = {
    //get galleries data
    getGalleriesData({ commit }) {
      //set promise
      return new Promise((resolve, reject) => {
        //fetching Rest API "/api/web/galleries" with method "GET"
        this.$axios.get('/api/web/galleries')
        //success
        .then((response) => {
          //commit to mutation "SET_GALLERIES_DATA"
          commit('SET_GALLERIES_DATA', response.data.data)
          //resolve promise
          resolve()
        })

      })

    },
    //get detail gallery
    getDetailGallery({ commit }, payload) {
      //set promise
      return new Promise((resolve, reject) => {
        //get to Rest API "/api/web/galleries/:slug" with method "GET"
        this.$axios.get(`/api/web/galleries/${payload}`)
        //success
        .then(response => {
            //commit to mutation "SET_CATEGORY_DATA"
            commit('SET_GALLERY_DATA', response.data.data)
            //resolve promise
            resolve()
        })
      })
    },
}