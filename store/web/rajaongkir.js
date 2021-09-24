//state
export const state = () => ({
 //provinces
 provinces: [],
 //citoes
 citoes: [],
 //costs ongkir
 costs: []
})

//mutations
export const mutations = {
    //mutation "SET_PROVINCES_DATA"
    SET_PROVINCES_DATA(state, payload) {
    //set value state "provinces"
    state.provinces = payload
    },
    //mutation "SET_CItoES_DATA"
    SET_CItoES_DATA(state, payload) {
    //set value state "citoes"
    state.citoes = payload
    },
    //mutation "SET_COSTS_DATA"
    SET_COSTS_DATA(state, payload) {
    //set value state "costs"
    state.costs = payload
    },
}

//actions
export const actions = {
    //get provinces data
    getProvincesData({ commit }) {
        //set promise
        return new Promise((resolve, reject) => {
          //fetching Rest API "/api/web/rajaongkir/provinces" with method "GET"
          this.$axios.get('/api/web/rajaongkir/provinces')
          //success
          .then((response) => {
              //commit to mutation "SET_PROVINCES_DATA"
              commit('SET_PROVINCES_DATA', response.data.data)
              //resolve promise
              resolve()
          })
        })
    },
    //get citoes data
    getCitoesData({ commit }, payload) {
      //set promise
      return new Promise((resolve, reject) => {
        //fetching Rest API "/api/web/rajaongkir/citoes" with method "POST"
        this.$axios.post('/api/web/rajaongkir/citoes', payload)
        //success
        .then((response) => {
            //commit to mutation "SET_CItoES_DATA"
            commit('SET_CItoES_DATA', response.data.data)
            //resolve promise
            resolve()
        })
      })
    },
    //getOngkirData
    getOngkirData({ commit }, payload) {
      //set promise
      return new Promise((resolve, reject) => {
        //fetching Rest API "/api/web/rajaongkir/checkOngkir" with method "POST"
        this.$axios.post('/api/web/rajaongkir/checkOngkir', payload)
        //success
        .then((response) => {
          //commit to mutation "SET_COSTS_DATA"
          commit('SET_COSTS_DATA', response.data.data)
          //resolve promise
          resolve()
        })
      })
    }
}