<template>
  <div class="c-app">
    <div class="c-sidebar c-sidebar-dark c-sidebar-fixed c-sidebar-lg-show" id="sidebar">
      <div class="c-sidebar-brand d-lg-down-none">
        <img src="/images/logo2.png" class="bg-light" width="260">
      </div>
      <!-- sidebar -->
      <Sidebar />
      <!-- end sidebar -->
    </div>
    <div class="c-wrapper c-fixed-components">
        <!-- header -->
        <Header />
        <!-- end header -->
        <div class="c-body">
            <!-- content -->
            <Nuxt />
            <!-- end content -->
            <footer class="c-footer">
              <div><strong>@andaristudio</strong> &copy; 2021 - andaristudio.com</div>
              <div class="ml-auto">Template by&nbsp;<a href="https://coreui.io/">CoreUI</a></div>
            </footer>
        </div>
    </div>
 </div>
</template>

<script>
 import Header from '@/components/admin/header.vue'
 import Sidebar from '@/components/admin/sidebar.vue'
 export default {
    //middleware
    middleware: 'isAdmin',
    //register components
    components: {
    Header,
    Sidebar
    }
 }
</script>
<style>
</style>
