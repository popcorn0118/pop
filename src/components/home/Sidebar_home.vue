<template>
    <div>
        <!-- 左側選單 (List group) -->
        <div class="list-group sticky-top">
            <a 
                class="list-group-item list-group-item-action" 
                data-toggle="list" 
                href="#list-gift"
                v-for="item in products"
                :key="item.id"
                @click="productsItem($event)">
                {{ item }}
            </a>

            <!-- <router-link to="/home/products" class="list-group-item list-group-item-action active" data-toggle="list"><i class="fa fa-suitcase" aria-hidden="true"></i> 藝術</router-link>
            <a class="list-group-item list-group-item-action" data-toggle="list" href="#list-gift">
                <i class="fa fa-gift" aria-hidden="true"></i> 禮品區</a>
            <a href="#" class="list-group-item list-group-item-action disabled">
                <i class="fa fa-film" aria-hidden="true"></i> 影音商品</a>
            <a href="#" class="list-group-item list-group-item-action disabled">
                <i class="fa fa-paw" aria-hidden="true"></i> 寵物專用</a>
            <a href="#" class="list-group-item list-group-item-action disabled">
                <i class="fa fa-tree" aria-hidden="true"></i> 居家環境</a> -->
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Sidebar_home',
        data() {
            return {
                products: [],
                product: {},
                is_category: ''
            }
        },
        methods: {
            getProducts() {
                    const vm = this;
                    const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`;
                    vm.isLoading = true;
                    this.$http.get(url).then((response) => {
                        const proArr = response.data.products;
                        const thisProducts = this.products;
                        const qq = [];
                        const items = Array.from(proArr);
                        items.forEach(function(item, index){
                            qq.push(item.category);
                        });
                        const deduped = qq.filter(function(element, index, arr){
                            return arr.indexOf(element) === index;
                        });
                        vm.products = deduped;
                        vm.isLoading = false;
                    });
                },
                productsItem(e){
                    // this.is_category = e.path[0].textContent
                    // const qq = this.is_category
                    // console.log(e.path[0].textContent)
                    // this.$emit('qq', e)
                     this.$emit('childMethod', e)
                }
            },
        created() {
            this.getProducts();
        },
    }
</script>