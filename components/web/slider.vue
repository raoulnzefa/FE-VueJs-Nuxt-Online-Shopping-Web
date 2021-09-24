<template>
<section class="pb-5" style="background: rgb(255, 255, 255);">
  <div class="container">
    <div class="row align-items-center">
      <div class="col-md-8 mb-6 mb-md-0">
        <client-only>
          <VueSlickCarousel v-bind="slickOptions" class="slick-slider" style="background: rgb(255, 255, 255);">
            <div v-for="(slider, id) in sliders" :class="{ active: id==0 }" :key='slider.id' class="box">
              <div class="card border-0 hover-shine">
                <img :src="slider.image"/>
              </div>
            </div>
          </VueSlickCarousel>
        </client-only>
      </div>
      <div class="col-md-4 text-center">
        <span class="d-block fs-30 text-primary lh-1"><i class="fab fa-instagram" style="font-size:40px;color:#000;"></i></span>
          <p class="lh-13 mb-0" style="font-weight:900;color:#000;font-size:25px;">@andaristudio</p>
          <a href="#" class="lh-12" style="color:#000;text-decoration: none;">Follow us on Instagram</a>
      </div>
    </div>
  </div>
</section>
</template>

<script>
export default {
  data() {
    return {
      slickOptions: {
        dots: false,
        arrows: false,
        infinite: true,
        slidesToScroll: 3,
        slidesToShow: 3,
        accessibility: true,
        // variableWidth: true,
        // variableHeight: true,
        // centerMode: true,
        // cssEase: 'linear',
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToScroll: 3,
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToScroll: 3,
              slidesToShow: 3,
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
    await this.$store.dispatch('web/slider/getSlidersData')
  },
  //computed
  computed: {
    //sliders
    sliders() {
      return this.$store.state.web.slider.sliders
    }
  }
}
</script>

<style scoped>
.hover-shine{position:relative;overflow:hidden}.hover-shine::before{position:absolute;top:0;left:-100%;z-index:2;display:block;content:'';width:50%;height:100%;background:linear-gradient(to right,rgba(255,255,255,0) 0%,rgba(255,255,255,0.3) 100%);-webkit-transform:skewX(-25deg);transform:skewX(-25deg)}.hover-shine:hover::before{-webkit-animation:shine 1s;animation:shine 1s}@-webkit-keyframes shine{100%{left:125%}}@keyframes shine{100%{left:125%}}
</style>