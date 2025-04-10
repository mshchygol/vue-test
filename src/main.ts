import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { SnackbarService, Vue3Snackbar } from "vue3-snackbar";
import "vue3-snackbar/styles";

const app = createApp(App);

app.use(SnackbarService);
app.component("vue3-snackbar", Vue3Snackbar);
app.use(router);
app.use(createPinia());

app.mount("#app");
