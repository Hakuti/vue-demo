<template>
  <Header class="sticky top-0 z-50"/>
  <router-view></router-view>
</template>

<script>
import Header from './views/components/Header.vue'


export default {
  name: 'App',
  components: {
   Header
  },
  setup(){
    
  },
  created() {
      
       
   
  },

}
</script>

<style>

</style>
