<template>
  <div>
    <h1 class="text-4xl">
      Use this menu builder for creating a multi level menu
    </h1>
    <ul style="list-style-type: disc !important;">
      <li>Test</li>
    </ul>

    <div @click="add($event)" class="cursor-pointer">Click to add a new item</div>
    <MenuBuilder :menuList=list  @updateList="update"/>
  </div>
</template>

<script>
import MenuBuilder from '../components/menu/MenuBuilder/MenuBuilder.vue';
import {
  MAX_TOP_LEVEL_MENU_ITEMS
} from "../../constants/menu";
import { findFormatted } from "../../helpers/helpers"
export default {
  components: { MenuBuilder },
  data() {
    return {
      list: [],
      id: 0
    }
  },
  methods: {
    add(event) {
      event.preventDefault();
      if (this.list.length < MAX_TOP_LEVEL_MENU_ITEMS) {
        if(this.id == 0){
          this.list.push({ id: this.id, name: `Test ${this.id}`, menuList: [], update: this.update });
          this.id = this.id + 1;
        }
        else{
          this.list.push({ id: this.id, name: `Test ${this.id}`, menuList:[], update: this.update });
          this.id = this.id + 1;
        }
      }
    },
    update(index, id, meta, data){
      let path = findFormatted('menuList', this.list, id);
      path = this.remove_first_occurrence(path, 'menuList');
      path = path.replace('["id"]', "");
      if(meta == 'input') {
        //This is dangerous, but for the sake of the example, I'll leave this here.
        eval('this.list' + path).input = data.target.value;
      }
      
    },
    
    remove_first_occurrence(str, searchstr)       {
      let index = str.indexOf(searchstr);
      if (index === -1) {
        return str;
      }
      return str.slice(0, index) + str.slice(index + searchstr.length);
    }
  },
  
}
</script>

<style></style>
