<template>  
  <div class="pt-5 pb-4" style="background: rgb(255, 255, 255);">
    <div class="container" style="background: rgb(255, 255, 255);">
      <Breadcrumbs />
      <div class="row">
        <div class="col-md-5 mb-4" style="background: rgb(255, 255, 255);">
          <div class="card border-0 rounded no-shadow">
            <div class="card-body">
              <client-only>
                <VueSlickCarousel v-bind="slickOptions" class="slick-slider" style="background: rgb(255, 255, 255);">
                  <div v-for="(gallery, id) in product.galleries" :class="{ active: id==0 }" :key='gallery.id' class="box">
                    <div class="card border-0">
                      <img :src="gallery.image"/>
                    </div>
                  </div>
                </VueSlickCarousel>
              </client-only>
            </div>
            <div class="thumbnails">
              <div v-for="(gallery, id) in product.galleries" :class="{ active: id==0 }" :key='gallery.id' class="thumbnail-image">
                 <img :src="gallery.image"/>
              </div>
            </div> 
          </div>
        </div>
        <div class="col-md-7" style="background: rgb(255, 255, 255);">
          <div class="card border-0 rounded no-shadow">
            <div class="card-body">
              <h4>{{ product.title }}</h4>
              <hr>
              <div class="product-price" v-if="product.discount > 0">
                <h6 class="mb-0 font-weight-semibold"><s class="text-red">IDR. {{ formatPrice(product.price) }}</s> / <strong>{{ product.discount }} %</strong></h6>
                <h5 class="mb-0 font-weight-semibold mt-3 text-success">IDR. {{ formatPrice(calculateDiscount(product)) }}</h5>
              </div>
              <div class="product-price" v-if="product.discount == 0">
                <h5 class="mb-0 font-weight-semibold mt-3 text-success">IDR. {{ product.price }}</h5>
              </div>
              <div class="mt-3">
                <div v-html="product.description"></div>
              </div>
              <div class="table-responsive">
                <table class="table table-sm table-borderless mb-0">
                  <tbody>
                    <client-only>
                      <tr>
                        <th class="pl-0 w-25" scope="row" style="color:#000;"><strong>Category</strong></th>
                        <td><strong style="color:#000;">{{ product.category.name }}</strong></td>
                      </tr>
                      <tr>
                        <th class="pl-0 w-25" scope="row" style="color:#000;"><strong>Weight</strong></th>
                        <td><strong style="color:#000;">{{ product.weight }}</strong> gram</td>
                      </tr>
                      <tr>
                        <th class="pl-0 w-25" scope="row" style="color:#000;"><strong>Stock</strong></th>
                        <td><strong style="color:#000;">{{ product.stock }}</strong></td>
                      </tr>
                    </client-only>
                  </tbody>
                </table>
              </div>
              <hr>
              <button @click="addToCart(product.id, calculateDiscount(product), product.weight)" 
                class="btn btn-lg btn-light border-0 shadow-sm" style="font-weight:600;color:#000;"><i class="lnr lnr-cart mr-2"></i>Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="card-body">
        <h5 class="mt-3" style="color:#000;"><i class="far fa-star mr-2"></i>Recommended Products</h5>
        <hr>
        <div class="row">
          <div class="col-lg-3 col-md-4 col-sm-6 mt-3" v-for="product in related" :key="product.id">
              <!-- Single Product Item Start -->
              <div class="single-product-item text-center">
                  <div class="products-images">
                      <a href="#" class="product-thumbnail">
                          <img :src="product.image" class="img-fluid" alt="Product Images" width="300" height="300">
                          <!-- <span class="ribbon out-of-stock ">Out Of Stock</span> -->
                      </a>
                      <div class="product-actions">
                          <nuxt-link :to="{name: 'products-slug', params: {slug: product.slug}}" data-bs-toggle="modal" data-bs-target="#prodect-modal"><i class="far fa-eye" style="color:#a66332;"></i><span class="tool-tip">Quick View</span></nuxt-link>
                          <a @click="addToCart(product.id, calculateDiscount(product), product.weight)" ><i class="fa fa-shopping-basket" style="color:#a66332;"></i> <span class="tool-tip">Add to cart</span></a>
                          <nuxt-link :to="{name: 'categories-slug', params: {slug: product.category.slug}}" class="text-muted" data-abc="true">
                            <i class="fa fa-th-list" style="color:#a66332;"></i> <span class="tool-tip">{{ product.category.name }}</span>
                          </nuxt-link>
                      </div>
                  </div>
                  <div class="product-content">
                      <h6 class="prodect-title mt-3"><nuxt-link :to="{name: 'products-slug', params: {slug: product.slug}}" style="color:#000;text-decoration: none;">{{ product.title }}</nuxt-link></h6>
                      <div class="prodect-price">
                          <span class="new-price">IDR. {{ formatPrice(product.price) }}</span> 
                      </div>
                        <client-only>
                          <vue-star-rating class="mb-4"
                          :rating="parseFloat(product.reviews_avg_rating)" :increment="0.5" :star-size="20" :read-only="true" :show-rating="false" :inline="true"></vue-star-rating>
                          (<strong>{{ product.reviews_count }}</strong> reviews)
                        </client-only>
                  </div>
              </div>
              <!-- Single Product Item End -->
          </div>
        </div>
      </div>
      <div class="row mt-4" style="background: rgb(255, 255, 255);">
        <div class="col-md-12" style="background: rgb(255, 255, 255);">
          <div class="card border-0 rounded shadow-none">
            <div class="card-body">
              <h5 style="color:#000;"><i class="far fa-comments mr-2"></i> Review Products (  <strong>{{ product.reviews_count }}</strong> reviews )</h5>
              <hr>
              <div class="card bg-light shadow-sm rounded" v-for="review in product.reviews" :key="review.id">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-1">
                      <div class="review-avatar avatar-sm">
                        <img :src="`https://ui-avatars.com/api/?name=${review.customer.name}&amp;background=4e73df&amp;color=ffffff&amp;size=100`">
                      </div>
                    </div>
                    <div class="col-md-11">
                    <client-only>
                      <vue-star-rating class="mb-2" :rating="review.rating" :star-size="20" :read-only="true" :show-rating="false"></vue-star-rating>
                    </client-only>
                    <strong><span class="text-dark">{{ review.customer.name }}</span></strong>
                    <div class="description mt-2">
                      <span style="color: rgb(119, 118, 118);font-size:15px;font-style:italic">{{ review.review }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Breadcrumbs from '@/components/web/breadcrumbs.vue'
export default {
    //meta
    head() {
      return {
      title: `${this.product.title} - Creative graphic design, Bullet Journal and Illustrations!`,
        meta: [
          {
            hid: 'og:title',
            name: 'og:title',
            content: `${this.product.title} - Creative graphic design, Bullet Journal and Illustrations!`,
          },
          {
            hid: 'og:site_name',
            name: 'og:site_name',
            content: `${this.product.title} - Creative graphic design, Bullet Journal and Illustrations!`,
          },
          {
            hid: 'og:image',
            name: 'og:image',
            content: this.product.image
          },
          {
            hid: 'description',
            name: 'description',
            content: `${this.product.title.substr(0, 30)}...`,
          },
        ]
      }
    },
    //register components
    components: {
      Breadcrumbs
    },
    data() {
    return {
      slickOptions: {
        dots: false,
        autoplay: true,
        arrows: false,
        infinite: true,
        slidesToScroll: 1,
        slidesToShow: 1,
        accessibility: true,
        // variableWidth: true,
        // variableHeight: true,
        // centerMode: true,
        cssEase: 'linear',
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToScroll: 1,
              slidesToShow: 1,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToScroll: 1,
              slidesToShow: 1,
            },
          },
        ],
      }
    }
  },
  //hook "fetch"
  async fetch() {
    //fething sliders on Rest API
    await this.$store.dispatch('web/gallery/getGalleriesData')
  },
  //hook "asyncData"
  async asyncData({ store, route }) {
    await store.dispatch('web/product/getDetailProduct',
    route.params.slug)
  },
  //computed
  computed: {
    //galleries
    galleries() {
      return this.$store.state.web.gallery.galleries
    },
    //product
    product() {
      return this.$store.state.web.product.product
    },
    //related
    related() {
      return this.$store.state.web.product.related
    },
  },
  //method
  methods: {
    //method "addToCart"
    async addToCart(productId, price, weight) {
      //check loggedIn "false"
      if (!this.$auth.loggedIn) {
        //redirect
        return this.$router.push({
          name: 'customer-login'
        })
      }
      //check customer role
      if (this.$auth.strategy.name != "customer") {
        //redirect
        return this.$router.push({
          name: 'customer-login'
        })
      }
      //dispatch to action "storeCart" vuex
      await this.$store.dispatch('web/cart/storeCart', {
        product_id: productId,
        price: price,
        qty: 1,
        weight: weight
      })
      //success add to cart
      .then(() => {
        //sweet alert
        this.$swal.fire({
          title: 'SUCCESS!',
          text: "Product Added Successfully To Cart!",
          icon: 'success',
          showConfirmButton: false,
          timer: 3000
        })
      })
    }
  }
}
</script>

<style scoped>
.thumbnails {
    display: flex;
    justify-content: space-evenly;
    flex-direction: row;
}
.thumbnail-image {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 2px;
}
.thumbnail-image > img {
    width: 100%;
    height: 100px;
    height: auto;
    transition: all 250ms;
}
.thumbnail-image:hover > img, 
.thumbnail-image.active > img {
    opacity: 0.6;
    box-shadow: 2px 2px 6px 1px rgba(0,0,0, 0.5);
}
.single-product-item .product-actions{
  position:absolute;
  top:50%;
  left:50%;
  -webkit-transform:translate(-50%, -50%);
  -ms-transform:translate(-50%, -50%);
  transform:translate(-50%, -50%);
  display:-webkit-box;
  display:-webkit-flex;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-align:center;
  -webkit-align-items:center;
  -ms-flex-align:center;
  align-items:center
}
.single-product-item .product-actions a{
  width:45px;
  height:45px;
  line-height:48px;
  background-color:#fff;
  text-align:center;
  border-radius:50%;
  font-size:20px;
  margin-left:7px;
  margin-right:7px;
  color:#000;
  -webkit-transition:.5s;
  -o-transition:.5s;
  transition:.5s;
  opacity:0;
  -webkit-transform:translateY(20px);
  -ms-transform:translateY(20px);
  transform:translateY(20px)
}
.single-product-item .product-actions a:nth-child(1){
  -webkit-transition-delay:0s;
  -o-transition-delay:0s;
  transition-delay:0s
}
.single-product-item .product-actions a:nth-child(2){
  -webkit-transition-delay:.15s;
  -o-transition-delay:.15s;
  transition-delay:.15s
}
.single-product-item .product-actions a:nth-child(3){
  -webkit-transition-delay:.3s;
  -o-transition-delay:.3s;
  transition-delay:.3s
}
.single-product-item .product-actions a .tool-tip{
  position:absolute;
  background:#000;
  text-align:center;
  padding:8px 12px;
  z-index:3;
  opacity:0;
  visibility:hidden;
  -webkit-transition:opacity .6s, margin .3s;
  -o-transition:opacity .6s, margin .3s;
  transition:opacity .6s, margin .3s;
  white-space:pre;
  font-size:13px;
  line-height:14px;
  top:-30px;
  left:50%;
  -webkit-transform:translateX(-50%);
  -ms-transform:translateX(-50%);
  transform:translateX(-50%);
  color:#fff;
  border-radius:2px
}
.single-product-item .product-actions a .tool-tip::after{
  border-color:rgba(0,0,0,0) rgba(0,0,0,0) rgba(0,0,0,0) #000;
  border-style:solid;
  border-width:5px 0 5px 5px;
  content:"";
  height:0;
  position:absolute;
  bottom:10px;
  left:50%;
  width:0;
  bottom:-6px;
  -webkit-transform:
  translateX(-50%) rotate(90deg);
  -ms-transform:translateX(-50%) rotate(90deg);
  transform:translateX(-50%) rotate(90deg)
}
.single-product-item .product-actions a:hover{
  color:#dcb14a
}
.single-product-item .product-actions a:hover .tool-tip{
  visibility:visible;
  opacity:1;
  top:-35px
}
.single-product-item:hover .product-thumbnail::after{
  opacity:1;visibility:visible
}
.single-product-item:hover .product-actions a{
  -webkit-transform:translateY(0);
  -ms-transform:translateY(0);
  transform:translateY(0);
  opacity:1
}
.single-product-item:hover .product-actions a:nth-child(1){
  -webkit-transition-delay:0s;
  -o-transition-delay:0s;
  transition-delay:0s
}
.single-product-item:hover .product-actions a:nth-child(2){
  -webkit-transition-delay:.15s;
  -o-transition-delay:.15s;
  transition-delay:.15s
}
.single-product-item:hover .product-actions a:nth-child(3){
  -webkit-transition-delay:.3s;
  -o-transition-delay:.3s;
  transition-delay:.3s
}
</style>