// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay'; //loading套件
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap'
import VeeValidate from 'vee-validate';
import zhTwValidate from 'vee-validate/dist/locale/zh_TW'; 

import App from './App';
import router from './router';
import './bus';
import currencyFirty from './filters/currency';
import dateFilter from './filters/date';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);

Vue.use(VeeValidate);
VeeValidate.Validator.localize('zhTw', zhTwValidate) //email 中文語系

Vue.component('Loading', Loading); //loading套件
Vue.filter('currency', currencyFirty); //金額 + "$"
Vue.filter('date', dateFilter); //日期轉換 yyyy-mm-dd 

axios.defaults.withCredentials = true; //存在前端cookies

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  console.log('to', to, 'from', from, 'next', next);
  if (to.meta.requiresAuth) {
    // console.log('這裡需要驗證喔')
    const api = `${process.env.APIPATH}/api/user/check`
        const vm = this;
        axios.post(api, vm.user).then((response) => {
            console.log(response.data)
            if (response.data.success) {
                // vm.$router.push('/') //登入成功轉到首頁
                next();
            } else {
              next({
                path: '/login',
              });
            }
        });
  } else {
    next();
  }
})