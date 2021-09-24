<template>
<div class="fade-in">
  <!-- slider -->
  <Banner />
  <!-- end slider -->
  <!-- category -->
  <client-only>
    <VueSlickCarousel v-bind="slickOptions" class="slick-slider" style="background: rgb(255, 255, 255);">
      <div v-for="(category, id) in categories" :class="{ active: id==0 }" :key='category.id' class="box">
        <div class="card border-0">
          <img :src="category.image"/>
          <div class="card-img-overlay d-inline-flex align-items-end justify-content-center">
            <div class="d-grid gap-3 d-sm-flex justify-content-sm-center">
                <nuxt-link :to="{name: 'categories-slug', params:{slug: category.slug}}" class="btn btn-outline-light btn-lg px-4 shadow-none" >{{ category.name}}</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </VueSlickCarousel>
  </client-only>
  <!-- end category -->

  <!-- product -->
  <div class="py-lg-12 py-11 pt-5" style="background: rgb(255, 255, 255);">
    <div class="container">
      <h2 class="mb-8 text-center mb-5" style="font-weight:700;font-style:bold;color:#000;font-size:35px;">Product Collection</h2>
        <div class="row">
          <div class="col-lg-3 col-md-4 col-sm-6" v-for="product in products.data" :key="product.id">
              <!-- Single Product Item Start -->
              <div class="single-product-item text-center">
                  <div class="products-images">
                      <a href="#" class="product-thumbnail">
                          <img :src="product.image" class="img-fluid" alt="Product Images" width="300" height="300">
                          <!-- <span class="ribbon out-of-stock ">Out Of Stock</span> -->
                      </a>
                      <div class="product-actions">
                          <nuxt-link :to="{name: 'products-slug', params: {slug: product.slug}}" data-bs-toggle="modal" data-bs-target="#prodect-modal"><i class="far fa-eye" style="color:#a66332;"></i><span class="tool-tip">Quick View</span></nuxt-link>
                          <a href="#"><i class="fa fa-shopping-basket" style="color:#a66332;"></i> <span class="tool-tip">Add to cart</span></a>
                          <nuxt-link :to="{name: 'categories-slug', params: {slug: product.category.slug}}" class="text-muted" data-abc="true">
                            <i class="fa fa-th-list" style="color:#a66332;"></i> <span class="tool-tip">{{ product.category.name }}</span>
                          </nuxt-link>
                      </div>
                  </div>
                  <div class="product-content">
                      <h6 class="prodect-title mt-3"><nuxt-link :to="{name: 'products-slug', params: {slug: product.slug}}" style="color:#000;text-decoration: none;">{{ product.title }}</nuxt-link></h6>
                      <div class="prodect-price" v-if="product.discount > 0">
                        <h6 class="mb-0 font-weight-semibold"><s class="text-red">IDR. {{ formatPrice(product.price) }}</s> / <strong>{{ product.discount }} %</strong></h6>
                        <h5 class="mb-0 font-weight-semibold">IDR. {{ formatPrice(calculateDiscount(product)) }}</h5>
                      </div>
                      <div class="prodect-price" v-if="product.discount == 0">
                        <h5 class="mb-0 font-weight-semibold">IDR. {{ product.price }}</h5>
                      </div>
                  </div>
                  <client-only>
                    <vue-star-rating class="mb-4"
                    :rating="parseFloat(product.reviews_avg_rating)" :increment="0.5" :star-size="20" :read-only="true" :show-rating="false" :inline="true"></vue-star-rating>
                    (<strong>{{ product.reviews_count }}</strong> review)
                  </client-only>
              </div><!-- Single Product Item End -->
          </div>
        </div>
         <div class="row justify-content-center mt-4 pb-5">
            <div class="text-center">
              <nuxt-link :to="{name: 'products'}" class="btn btn-lg btn-outline-light" style="border-radius:0px;color:#000;">
                Show More
              </nuxt-link>
            </div>
          </div>
      </div>
    </div>
    <!-- end product -->
    
    <div> 
        <Slider />
    </div>
</div>
</template>

<script>
import Banner from '@/components/web/banner.vue'
import Slider from '@/components/web/slider.vue'
export default {
  //register components
  components: {
    Banner,
    Slider
  },
  //meta
  head() {
    return {
    title: '@andaristudio - Creative graphic design, Bullet Journal and Illustrations!',
      meta: [
        {
          hid: 'og:title',
          name: 'og:title',
          content: '@andaristudio - Creative graphic design, Bullet Journal and Illustrations!'
        },
        {
          hid: 'og:site_name',
          name: 'og:site_name',
          content: '@andaristudio - Creative graphic design, Bullet Journal and Illustrations!'
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: 'images/logo2.png'
        },
        {
          hid: 'description',
          name: 'description',
          content: 'Officially Online Store Aesthetic Stuff'
        },
      ]
    }
  },
  data() {
    return {
      slickOptions: {
        dots: false,
        arrows: false,
        infinite: true,
        slidesToScroll: 4,
        slidesToShow: 4,
        accessibility: true,
        variableWidth: true,
        variableHeight: true,
        centerMode: true,
        cssEase: 'linear',
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToScroll: 2,
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 992,
            settings: {
              slidesToScroll: 2,
              slidesToShow: 2,
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
    await this.$store.dispatch('web/category/getCategoriesData')
  },
  //hook "asyncData"
  async asyncData({ store }) {
    await store.dispatch('web/product/getProductsData')
  },
  //computed
  computed: {
    //categories
    categories() {
      return this.$store.state.web.category.categories
    },
    //products
    products() {
      return this.$store.state.web.product.products
    },
  }

}
</script>

<style scoped>
.slick-slider{
  margin-left:-15px;
  margin-right:-15px
}
.slick-slider .box{
  background-color:transparent!important;
  font-size:1rem
}
.slick-slider .box:focus{
  outline:none
}
.slick-slider img{
  max-width:100%
}
.slick-slider :focus{
  outline:none
}
.btn-outline-light{
  border: none;
  border-radius: 0px;
  color:#000;
  font-weight: 500;
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