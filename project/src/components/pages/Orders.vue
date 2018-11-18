<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <table class="table mt-4">
            <thead>
                <th width="130" class="text-center">購買時間</th>
                <th width="300" class="text-center">E-mail</th>
                <th class="text-center">購買項目</th>
                <th width="130" class="text-center">應付金額</th>
                <th width="130" class="text-center">是否付款</th>
            </thead>
            <tbody>
                <tr v-for="item in orders" :key="item.id">
                    <td>{{ item.paid_date | data }}</td>
                    <td>{{ item.user.email }}</td>
                    <td>
                        <ul>
                            <li v-for="(pro, i) in item.products" :key="i">
                                {{ pro.product.title }} 數量：{{ pro.qty }} {{ pro.product.unit }}
                            </li>
                        </ul>
                    </td>
                    <td class="text-right">{{ item.total | currency }}</td>
                    <td　class="text-center">
                        <strong v-if="item.is_paid" class="text-success">已付款</strong>
                        <span v-else class="text-muted">尚未起用</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            orders:[], // 取得訂單列表
            isLoading: false,
        }
    },
    methods: {
        getOrders(page = 1) { //ES6 參數預設值 1，沒帶入數值時使用
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/orders?page=${page}`
            vm.isLoading = true
            this.$http.get(api).then((response) => {
                vm.isLoading = false
                console.log(response)
                vm.orders = response.data.orders
                // vm.pagination = response.data.pagination
            })
        },
    },
    created() { 
        this.getOrders()
        console.log(this.getOrders())
    },
}
</script>