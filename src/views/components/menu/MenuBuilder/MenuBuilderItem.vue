<template>
  <div class="ml-2">
      <div>Text Field</div>
      <input @input="update('input', $event)" :value="data ? data.textUrl : ''" class="cursor-pointer border-2 border-solid"/>
  </div>
</template>

<script>
export default {
/**
 * Lets consider what we're watching here.... 
 * We want to modify the specific item mentioned
 */
  props: ["itemIndex", "itemId", "data"],
  data (){
    return {

    }
  },
  methods: {
    update(meta, data){
      console.log('occurs');
      this.$emit("updateMenuItem", this.itemIndex, this.itemId, meta, data);
    }
  }
}
</script>

<style>

</style>