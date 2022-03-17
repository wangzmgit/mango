import Vue from 'vue';
import App from './App.vue';
import VueClipboard from 'vue-clipboard2';
import { notification, Modal, Button, Input } from "ant-design-vue";

Vue.config.productionTip = false;
Vue.prototype.$notification = notification;

Vue.use(Modal);
Vue.use(VueClipboard);
Vue.component(Input.name, Input);
Vue.component(Button.name, Button);
Vue.component(Input.TextArea.name, Input.TextArea);

new Vue({
  render: h => h(App),
}).$mount('#app')
