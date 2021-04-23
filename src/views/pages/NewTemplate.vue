<template>
  <div>
      <MultiColumnTemplate :new="true" v-if="$route.params.type === 'multi'"> </MultiColumnTemplate>
      <NotFound v-else/>
  </div>
</template>

<script>
import NotFound from "../pages/404.vue";
import MultiColumnTemplate from "../components/cms/MultiColumnTemplate.vue";
export default {
    components: { NotFound, MultiColumnTemplate }
}
</script>

<style>

</style>