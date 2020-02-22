import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import Vuelidate from 'vuelidate'

Vue.use(VueResource);
Vue.use(Vuelidate);

new Vue({
  render: h => h(App),
}).$mount('#app')
