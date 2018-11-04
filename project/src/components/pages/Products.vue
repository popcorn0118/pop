<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <div class="text-right mt-4">
            <button class="btn btn-primary" @click="openModel(true)">建立新的商品</button>
        </div>
        <table class="table mt-4">
            <thead>
                <th width="80">編號</th>
                <th width="120">分類</th>
                <th>產品名稱</th>
                <th width="120">原價</th>
                <th width="120">售價</th>
                <th width="120">是否啟用</th>
                <th width="80">編輯</th>
                <th width="80">刪除</th>
            </thead>
            <tbody>
                <tr v-for="item in products" :key="item.id">
                    <td>{{ item.num }}</td>
                    <td>{{ item.category }}</td>
                    <td>{{ item.title }}</td>
                    <td class="text-right">
                        {{ item.origin_price | currency }}
                    </td>
                    <td class="text-right">
                        {{ item.price | currency }}
                    </td>
                    <td>
                        <span v-if="item.is_enabled" class="text-success">啟用</span>
                        <span v-else>未啟用</span>
                    </td>
                    <td>
                        <button class="btn btn-outline-primary btn-sm" 
                        @click="openModel(false, item)" >編輯</button>
                    </td>
                    <td>
                        <button class="btn btn-outline-danger btn-sm" 
                         @click="openDeleteModel(item)">刪除</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item"
                :class="{'disabled': !pagination.has_pre}"
                @click.prevent="getProducts(pagination.current_page - 1)" 
                >
                    <a class="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        <span class="sr-only">Previous</span>
                    </a>
                </li>
                <li class="page-item" 
                v-for="page in pagination.total_pages" 
                :key="page"
                :class="{'active': pagination.current_page === page }"
                @click.prevent="getProducts(page)"
                >
                    <a class="page-link" href="#">{{ page }}</a>
                </li>
                <li class="page-item"
                :class="{'disabled': !pagination.has_next}"
                @click.prevent="getProducts(pagination.current_page + 1)"
                >
                    <a class="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                        <span class="sr-only">Next</span>
                    </a>
                </li>
            </ul>
        </nav>

        <!-- Modal -->
        <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content border-0">
                    <div class="modal-header bg-dark text-white">
                        <h5 class="modal-title" id="exampleModalLabel">
                        <span>新增產品</span>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                            <label for="image">輸入圖片網址</label>
                            <input type="text" class="form-control" id="image"
                                v-model="tempProduct.imageUrl"
                                placeholder="請輸入圖片連結">
                            </div>
                            <div class="form-group">
                            <label for="customFile">或 上傳圖片
                                <i class="fas fa-spinner fa-spin" v-if="status.fileUpLoading"></i>
                            </label>
                            <input type="file" id="customFile" class="form-control"
                                ref="files" @change="uploadFile">
                            </div>
                            <img class="img-fluid" :src="tempProduct.imageUrl" alt="">
                        </div>
                        <div class="col-sm-8">
                            <div class="form-group">
                            <label for="title">標題</label>
                            <input type="text" class="form-control" id="title"
                                v-model="tempProduct.title"
                                placeholder="請輸入標題">
                            </div>

                            <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="category">分類</label>
                                <input type="text" class="form-control" id="category"
                                v-model="tempProduct.category"
                                placeholder="請輸入分類">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="price">單位</label>
                                <input type="unit" class="form-control" id="unit"
                                v-model="tempProduct.unit"
                                placeholder="請輸入單位">
                            </div>
                            </div>

                            <div class="form-row">
                            <div class="form-group col-md-6">
                            <label for="origin_price">原價</label>
                                <input type="number" class="form-control" id="origin_price"
                                v-model="tempProduct.origin_price"
                                placeholder="請輸入原價">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="price">售價</label>
                                <input type="number" class="form-control" id="price"
                                v-model="tempProduct.price"
                                placeholder="請輸入售價">
                            </div>
                            </div>
                            <hr>

                            <div class="form-group">
                            <label for="description">產品描述</label>
                            <textarea type="text" class="form-control" id="description"
                                v-model="tempProduct.description"
                                placeholder="請輸入產品描述"></textarea>
                            </div>
                            <div class="form-group">
                            <label for="content">說明內容</label>
                            <textarea type="text" class="form-control" id="content"
                                v-model="tempProduct.content"
                                placeholder="請輸入產品說明內容"></textarea>
                            </div>
                            <div class="form-group">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox"
                                v-model="tempProduct.is_enabled"
                                :true-value="1"
                                :false-value="0"
                                id="is_enabled">
                                <label class="form-check-label" for="is_enabled">
                                是否啟用
                                </label>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content border-0">
                    <div class="modal-header bg-danger text-white">
                        <h5 class="modal-title" id="exampleModalLabel">
                        <span>刪除產品</span>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        是否刪除 <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal"
                        @click="closeDeleteModel"
                        >取消</button>
                        <button type="button" class="btn btn-danger"
                        @click="deleteProduct"
                        >確認刪除</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import $ from 'jquery';

export default {
    data () {
        return {
            products:[], // 取得商品列表
            tempProduct: {}, //商品建立
            pagination: {}, //分頁
            isNew: false,
            isLoading: false,
            status: {
                fileUpLoading: false
            } 
        };
    },
    methods: {
        getProducts(page = 1) { //ES6 參數預設值 1，沒帶入數值時使用
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${page}`
            vm.isLoading = true
            this.$http.get(api).then((response) => {
                vm.isLoading = false
                console.log('getProducts:',response.data)
                vm.products = response.data.products
                vm.pagination = response.data.pagination
            })
        },
        openModel(isNew, item) {
            if (isNew) {
                this.tempProduct = {}
                this.isNew = true
            } else {
                this.tempProduct = Object.assign({}, item) //ES6 避免傳參考 item直會傳到 Object.assign({}
                this.isNew = false
            }
            $('#productModal').modal('show')
        },
        openDeleteModel(item) {
            this.tempProduct = item
            $('#delProductModal').modal('show')
        },
        closeDeleteModel() {
            $('#delProductModal').modal('hide')
        },

        updateProduct() {
            const vm = this
            let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product`
            let httpMethod = 'post'
            if (!vm.isNew) {
                api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`
                httpMethod = 'put'
            }
            this.$http[httpMethod](api, { data: vm.tempProduct }).then((response) => { // data: vm.tempProduct  <-  參照 API 格式
                console.log(response.data)
                // vm.products = response.data.products
                if(response.data.success){
                    $('#productModal').modal('hide')
                    vm.getProducts()
                } else {
                    $('#productModal').modal('hide')
                    vm.getProducts()
                    console.log('新增失敗')
                }
            })
        },
        deleteProduct() {
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
            this.$http.delete(api).then((response) => {
                $('#delProductModal').modal('hide')
                vm.getProducts()
            })
        },
        uploadFile() {
            console.log(this) // https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData
            const uploadedFile = this.$refs.files.files[0];
            const vm = this
            const formData = new FormData()
            formData.append('file-to-upload', uploadedFile)
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/upload`
            vm.status.fileUpLoading = true
            this.$http.post(url, formData, {
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            }).then((response) => {
                console.log(response.data)
                vm.status.fileUpLoading = false
                if (response.data.success) {
                    // vm.tempProduct.imageUrl = response.data.imageUrl;
                vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl) //將路徑強制寫入，就有雙向綁定
                } else {
                    this.$bus.$emit('messsage:push', response.data.message, 'danger')
                }
            })
        },
    },
    created() { //直接觸發
        this.getProducts()
        // this.updateProduct()
    },
}
</script>