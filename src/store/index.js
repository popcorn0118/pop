// 彙整所有 Vuex 檔
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import $ from 'jquery';
Vue.use(Vuex);
// import prouuctsModules from './products';

export default new Vuex.Store({
    strict: true, // 嚴謹模式
    state: {
        products: [],
        product: {},
        isLoading: false,
        cart: {
            carts: [],
        },
        categories: [],
        status: {
            loadingItem: ''
        },
    },
    actions: { //操作行為
        // payload(這裡的 status) 載荷
        // 非同步行為寫在這 Ajax
        updatedLoading(context, status) { // 固定的參數, 接收傳入的參數(自訂)
            //https://vuex.vuejs.org/zh/api/#actions
                context.commit('LOADING', status);     
        },
        getCart(context) {
            context.commit('LOADING', true);
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
            axios.get(url).then((response) => {
                if (response.data.data.carts) {
                context.commit('CART', response.data.data);
                }
                context.commit('LOADING', false);
                console.log('取得購物車', response.data.data);
            });
        },
        removeCart(context, id) {
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
            context.commit('LOADING', true);
            axios.delete(url).then((response) => {
                context.commit('LOADING', false);
                context.dispatch('getCart'); //vm.getCart();
                console.log('刪除購物車項目', response);
            });
        },
        addtoCart(context, { id, qty }) {
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
            context.commit('LOADING', true);
            context.commit('LOADINGITEM', id);
            const item = {
                product_id: id,
                qty,
            };
            axios.post(url, { data: item }).then((response) => {
                context.commit('LOADING', false);
                context.dispatch('getCart');
                console.log('加入購物車:', response);
                context.commit('LOADINGITEM', '');
            });
        },
        getProducts(context, id) {
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
            context.commit('LOADING', true, { root: true });
            context.commit('LOADINGITEM', id);
            axios.get(url).then((response) => {
                context.commit('PRODUCTS', response.data.products);
                context.commit('CATEGORIES', response.data.products);  
                console.log('取得產品列表:', response);
                context.commit('LOADING', false, { root: true });
                context.commit('LOADINGITEM', '');
            });
        },
        getProduct(context, id) { //取得單一商品
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
            context.commit('LOADINGITEM', id);
            axios.get(url).then((response) => {
                context.commit('PRODUCT', response.data.product);
                $('#productModal').modal('show');
                console.log('取得產品id:', response)
                context.commit('LOADINGITEM', '');
            });
        },
    },
    mutations: { //操作資料狀態,建議使用常數 - 都大寫
        // 第一個參數總是 state
        // 同步行為寫在這
        LOADING(state, status) {
            state.isLoading = status;
        },
        LOADINGITEM(state, status) {
            state.status.loadingItem = status;
        },
        CART(state, payload) {
            state.cart = payload;
        },
        PRODUCTS(state, payload) {
            state.products = payload;
        },
        PRODUCT(state, payload) {
            state.product = payload;
        },
        CATEGORIES(state, payload) {
            const categories = new Set();
            payload.forEach((item) => {
                categories.add(item.category);
            });
            state.categories = Array.from(categories);
        },
    },
    getters: {
        // 引用
        // computed: {
        //     ...mapGetters([...])
        // }
        isLoading: state => state.isLoading,
        loadingItem: state => state.status.loadingItem,
        cart: state => state.cart,
        categories: state => state.categories,
        products: state => state.products,
        product: state => state.product,
    },
    // modules: {
    //     prouuctsModules,
    // }
});