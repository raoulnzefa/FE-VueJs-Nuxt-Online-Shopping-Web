<template>
  <main class="c-main">
    <div class="container-fluid">
      <div class="fade-in">
        <div class="row">
          <div class="col-md-12">
            <div class="card border-0 rounded shadow-sm border-top">
              <div class="card-header">
                <span class="font-weight-bold"><i class="fa fa-folder"></i> EDIT PRODUCT GALLERY</span>
              </div>
              <div class="card-body">
                <form @submit.prevent="updateGallery">
                  <div class="form-group">
                    <label>IMAGE</label>
                    <input type="file" @change="handleFileChange" class="form-control">
                  </div>
                  <div class="form-group">
                      <label>PRODUCT</label>
                      <select class="form-control" v-model="gallery.product_id">
                        <option value="">-- select product --</option>
                        <option v-for="product in products" :key="product.id" :value="product.id">{{ product.title }}</option>
                      </select>
                      <div v-if="validation.product_id" class="mt-2">
                        <b-alert show variant="danger">{{ validation.product_id[0] }}</b-alert>
                      </div>                      
                  </div>
                  <button class="btn btn-info mr-1 btn-submit" type="submit"><i class="fa fa-paper-plane"></i> UPDATE</button>
                  <button class="btn btn-primary btn-reset" type="reset"><i class="fa fa-redo"></i> RESET</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
 export default {
    //layout
    layout: 'admin',
    //meta
    head() {
      return {
        title: 'Edit Product Gallery - Administrator',
      }
    },
    data() {
      return {
        //state gallery
        gallery: {
          image: '',
          product_id: '',
        },
        //state validation
        validation: []
      }
    },
    //hook "asyncData"
    async asyncData({ store }) {
      //get list all products
      await store.dispatch('admin/product/getListAllProducts')
    },
    //computed
    computed: {
      //products
      products() {
        return this.$store.state.admin.product.products
      },
    },
    //mounted
    mounted() {
      this.gallery.product_id =
      this.$store.state.admin.gallery.gallery.product_id
    },
    //method
    methods: {
      //handle file upload
      handleFileChange(e) {
        //get image
        let image = this.gallery.image = e.target.files[0]
        //check fileType
        if (!image.type.match('image.*')) {
          //if fileType not allowed, then clear value and set null
          e.target.value = ''
          //set state "gallery.image" to null
          this.gallery.image = null
          //show sweet alert
          this.$swal.fire({
            title: 'OOPS!',
            text: "Format File Tidak Didukung!",
            icon: 'error',
            showConfirmButton: false,
            timer: 2000
          })
        }
      },
      //method "updateGallery"
      async updateGallery() {
          //define formData
          let formData = new FormData();
          formData.append('image', this.gallery.image)
          formData.append('product_id', this.gallery.product_id)
          formData.append("_method", "PATCH")
          //sending data to action "updateGallery" vuex
          await this.$store.dispatch('admin/gallery/updateGallery', {
            galleryId: this.$route.params.id,
            payload: formData
          })
          //success
          .then(() => {
              //sweet alert
              this.$swal.fire({
                title: 'BERHASIL!',
                text: "Data Berhasil Diupdate!",
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
              })
              //redirect route "admin-galleries"
              this.$router.push({
                name: 'admin-galleries'
              })
          })
          //error
          .catch(error => {
            //assign error to state "validation"
            this.validation = error.response.data
          })
      }
    }
 }
</script>