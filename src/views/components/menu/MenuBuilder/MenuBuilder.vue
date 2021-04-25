<template>
  <draggable
    class="dragArea"
    tag="ul"
    :list="menuList"
    :group="{ name: 'g1' }"
    item-key="name"
  >
    <!-- v-slot inherited prop element from draggable -->
    <template #item="{element, index}">
      <li>
        <!-- Now we're working with fire! Time to create the MenuItem -->
        <!-- <MenuBuilderItem :itemId=element.id :itemIndex=index @updateMenuItem="update"/> -->
        <div class="ml-2">
          {{ element.id }}
          <input
            @input="update(index, element.id, 'input', $event, element)"
            :value="element.input ? element.input : ''"
            class="border-2 border-solid"
          />
        </div>

        <!-- This creates the ability to have a deeper nested structure -->
        <nested-draggable :menuList="element.menuList" />
      </li>
    </template>
  </draggable>
</template>

<script>
/**
 * Menu Builder
 * Allows a user to select different pages that will then appear on the header bar or menu modal
 */
import // MAX_MENU_LEVELS,
"../../../../constants/menu";
import draggable from "vuedraggable";
// import MenuBuilderItem from "./MenuBuilderItem.vue"

export default {
  components: { draggable },
  order: 3,
  props: ["menuList", "updateList"],
  name: "nested-draggable",
  data() {
    return {
      id: 0,
    };
  },
  created() {
    //Assume that the data has already been sent with the appropriate levels nested
  },
  methods: {
    update(index, id, meta, data, element) {
      if (this.updateList) {
        this.$emit("updateList", index, id, meta, data);
      } else {
        element.update(index, id, meta, data);
      }
    },
  },
};
</script>

<style scoped>
.dragArea {
  min-height: 50px;
  outline: 1px dashed;
  margin-left: 10px;
}
</style>
