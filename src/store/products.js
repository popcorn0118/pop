import axios from 'axios';
// state 屬於模組區域變數
// actions, mutations, getters 是屬於全域變數
export default {
    namespaced: true, // actions, mutations, getters 也都變成區域變數
    state: {
        products: [],
        categories: [],
    },
    actions: { //操作行為
        // payload(這裡的 status) 載荷
        // 非同步行為寫在這 Ajax
        getProducts(context) {
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
            context.commit('LOADING', true, { root: true });
            axios.get(url).then((response) => {
                context.commit('PRODUCTS', response.data.products);
                context.commit('CATEGORIES', response.data.products);  
                console.log('取得產品列表:', response);
                context.commit('LOADING', false, { root: true });
            });
        },
    },
    mutations: { //操作資料狀態,建議使用常數 - 都大寫
        // 第一個參數總是 state
        // 同步行為寫在這
        PRODUCTS(state, payload) {
            state.products = payload;
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
        categories: state => state.categories,
        products: state => state.products,
    }
}