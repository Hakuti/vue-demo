import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/pages/Home.vue";
import NotFound from "@/views/pages/404.vue";
import NewTemplate from "@/views/pages/NewTemplate.vue";
// import axios from "axios";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path:"/template/:type/new",
    name: "new-page",
    component: NewTemplate,
    meta: {
      title: 'Create a new page',
    }
  },
  {
    path: '/:catchAll(.*)',
    name: "NotFound",
    component: NotFound
  },
];



const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;