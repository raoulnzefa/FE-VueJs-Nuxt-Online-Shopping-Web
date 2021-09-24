<template>
   <ol class="breadcrumb d-flex border-0">
    <li class="item">
      <nuxt-link :to="'/'" class="title" style="text-decoration:none;">
      <i class="lnr lnr-home"></i>
        Home
      </nuxt-link>
    </li>
    <li v-for="(item, i) in crumbs" :key="i" class="item">
      <nuxt-link :to="item.to" class="title" style="text-decoration:none;">
        {{ item.title }}
      </nuxt-link>
    </li>
  </ol>
</template>

<script>
export default {
  computed: {
    crumbs () {
      const pathArray = this.$route.path.split('/')
      pathArray.shift()
      const breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {
        breadcrumbArray.push({
          to: breadcrumbArray[idx - 1]
            ? '/' + breadcrumbArray[idx - 1].path + '/' + path
            : '/' + path,
          title: path
        })
        return breadcrumbArray
      }, [])
      return breadcrumbs
    }
  }
}
</script>

<style scoped>
.breadcrumb {
  flex-wrap: wrap;
  padding: .5rem 0rem;
  margin-bottom: 1.5rem;
  list-style: none;
  border-radius: 0;
  border-bottom: 1px solid;
  background-color: transparent;
  border-color: #d8dbe0;
  justify-content: center;
  align-items: center;
}
@media (max-width: 414px){
.breadcrumb{
  justify-content: left;
  align-items: flex-end;
}
}
ol {
  list-style: none;
}
li {
  display: inline;
}
li:after {
  content: ' » ';
  display: inline;
  font-size: 0.9em;
  color: #aaa;
  padding: 0 0.5em 0 0.15em;
}
li:last-child:after {
  content: '';
}
li a {
  color: black;
}
li a.nuxt-link-exact-active.nuxt-link-active {
  color: grey;
}
</style>