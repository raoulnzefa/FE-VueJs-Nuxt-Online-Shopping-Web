//state
export const state = () => ({
 //galleries
 galleries: [],
 //page
 page: 1,
 //gallery
 gallery: {}
})

//mutations
export const mutations = {
    //mutation "SET_GALLERIES_DATA"
    SET_GALLERIES_DATA(state, payload) {
    //set value state "galleries"
    state.galleries = payload
    },
    //mutation "SET_PAGE"
    SET_PAGE(state, payload) {
    //set value state "page"
    state.page = payload
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
    getGalleriesData({ commit, state }, payload) {
        //search
        let search = payload ? payload : ''
        //set promise
        return new Promise((resolve, reject) => {
            //fetching Rest API "/api/admin/galleries" with method "GET"
            this.$axios.get(`/api/admin/galleries?q=${search}&page=${state.page}`)
            //success
            .then((response) => {
                //commit to mutation "SET_GALLERIES_DATA"
                commit('SET_GALLERIES_DATA', response.data.data)
                //resolve promise
                resolve()
            })
        })
    },

    //store gallery
    storeGallery({ dispatch, commit }, payload) {
        //set promise
        return new Promise((resolve, reject) => {
        //store to Rest API "/api/admin/galleries" with method "POST"
        this.$axios.post('/api/admin/galleries', payload)
            //success
            .then(() => {
                //dispatch actoon "getGalleriesData"
                dispatch('getGalleriesData')
                //resolve promise
                resolve()
            })
            //error
            .catch(error => {
                reject(error)
            })
        })
    },

    //get detail gallery
    getDetailGallery({ commit }, payload) {
        //set promise
        return new Promise((resolve, reject) => {
        //get to Rest API "/api/admin/galleries/:id" with method "GET"
        this.$axios.get(`/api/admin/galleries/${payload}`)
            //success
            .then(response => {
                //commit to mutation "SET_GALLERY_DATA"
                commit('SET_GALLERY_DATA', response.data.data)
                //resolve promise
                resolve()
            })
        })
    },

    //update gallery
    updateGallery({ dispatch, commit }, { galleryId, payload }) {
        //set promise
        return new Promise((resolve, reject) => {
        //store to Rest API "/api/admin/galleries/:id" with method "POST"
        this.$axios.post(`/api/admin/galleries/${galleryId}`, payload)
            //success
            .then(() => {
                //dispatch actoon "getGalleriesData"
                dispatch('getGalleriesData')
                //resolve promise
                resolve()
            })
            //error
            .catch(error => {
                reject(error)
            })
        })
    },

    //destroy gallery
    destroyGallery({ dispatch, commit }, payload) {
        //set promise
        return new Promise((resolve, reject) => {
            //delete to Rest API "/api/admin/galleries/:id" with method "DELETE"
            this.$axios.delete(`/api/admin/galleries/${payload}`)
            //success
            .then(() => {
                //dispatch actoon "getGalleriesData"
                dispatch('getGalleriesData')
                //resolve promise
                resolve()
            })
        })
    },


}
