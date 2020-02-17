import Vue from "vue";
import App from "./app.vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify, {
  // iconfont: 'mdi' // 'md' || 'mdi' || 'fa' || 'fa4'
});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  vuetify: new Vuetify()
}).$mount("#app");
