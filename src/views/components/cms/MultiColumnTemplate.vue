<template>
  <div class="mx-5 md:mx-10">
    <div class="container mx-auto">
      <h1 class="text-4xl my-4">Multi Column Template</h1>
      <Builder @updateBlocks="updateMeta($event, 'blocks')" @updateColumns="updateMeta($event, 'columns')" :blocks="(typeof page.meta.blocks != 'undefined') ? page.meta.blocks : []" :columns="(typeof page.meta.columns != 'undefined') ? page.meta.columns : 2" />

    </div>
  </div>
</template>

<script>
import Builder from "./Builder.vue"

export default {
  components: { Builder },
  props: ["new"],
  data(){
    return {
      page: !this.new ? this.$route.meta.page : { status: 'active', meta: { blocks: [], columns: 2 } }
    }
  },
  created(){
  },
  methods: {
    /**
     * Updates meta data of page.
     * Updates include blocks, columns, and any other data attached.
     */
    updateMeta(e, meta){
      if(typeof this.page.meta == 'undefined'){
        this.page.meta = {}
      }
      this.page.meta[meta] = e;
    },
  }
}
</script>

<style>

</style>