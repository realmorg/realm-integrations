import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import AccountView from "./views/AccountView.vue";
import SubscribedView from "./views/SubscribedView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: AccountView },
    { path: "/subscribed", component: SubscribedView },
  ],
});

createApp(App).use(router).mount("#app");
