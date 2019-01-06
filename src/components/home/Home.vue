<template>
  <div>
      <nav class="navbar navbar-light bg-light">
      <router-link class="navbar-brand" to="/">
        <i class="fa fa-heart text-info" aria-hidden="true"></i>
        六角血拼賣賣
      </router-link>
      <!-- 購物車內的數量 (Button 內包含 icon, 數量 badge) -->
      <div class="dropdown ml-auto">
        <button class="btn btn-sm btn-cart" data-toggle="dropdown" data-flip="false">
          <i class="fa fa-shopping-cart text-dark fa-2x" aria-hidden="true"></i>
          <span class="badge badge-pill badge-danger">{{cart.carts.length}}</span>
          <span class="sr-only">unread messages</span>
        </button>
        <div class="dropdown-menu dropdown-menu-right p-3" style="min-width: 300px"
          data-offset="400">
          <h6>已選擇商品</h6>
          <table class="table table-sm">
            <tbody>
              <tr v-for="item in cart.carts" :key="item.id" v-if="cart.carts.length">
                <td class="align-middle text-center">
                  <a href="#" class="text-muted" @click.prevent="removeCart(item.id)">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                  </a>
                </td>
                <td class="align-middle">{{ item.product.title }}</td>
                <td class="align-middle">{{ item.qty }}{{item.product.unit}}</td>
                <td class="align-middle text-right">{{item.total}}</td>
              </tr>
            </tbody>
          </table>
          <button class="btn btn-primary btn-block">
            <i class="fa fa-cart-plus" aria-hidden="true"></i> 結帳去
          </button>
        </div>
      </div>
    </nav>
    <div class="jumbotron jumbotron-fluid jumbotron-bg d-flex align-items-end">
      <div class="container">
        <div class="p-3 bg-lighter">
          <h1 class="display-3 font-weight-bold">買到剁手手！最後出清</h1>
          <p class="lead">This is a modified jumbotron that occupies
            the entire horizontal space of its parent.</p>
        </div>
      </div>
    </div>
    <div class="container main-content mb-3">
      <div class="row">
        <div class="col-md-3">
          <!-- 左側選單 (List group) -->
          <div class="list-group sticky-top">
            <a class="list-group-item list-group-item-action"
              href="#"
              @click.prevent="searchText = item"
              :class="{ 'active': item === searchText}"
              v-for="item in categories" :key="item">
              <i class="fa fa-street-view" aria-hidden="true"></i>
              {{ item }}
            </a>
            <a href="#" class="list-group-item list-group-item-action"
              @click.prevent="searchText = ''"
              :class="{ 'active': searchText === ''}">
              全部顯示
            </a>
          </div>
        </div>
        
        <!-- 子頁面 -->
        <div class="col-md-9">
          <div class="d-flex mb-4">
            <!-- Search bar -->
            <form class="form-inline my-3 my-lg-0">
              <div class="input-group">
                <input class="form-control" type="text" v-model="searchText"
                  placeholder="Search" aria-label="Search">
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary" type="button"
                    @click="searchText = ''">
                    <i class="fa fa-times"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        
        <template v-if="is_product">
            <div>
                <loading :active.sync="isLoading"></loading>
                <div>
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">{{ product.title }}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <img :src="product.imageUrl" class="img-fluid" alt="">
                                <blockquote class="blockquote mt-3">
                                    <p class="mb-0">{{ product.content }}</p>
                                    <footer class="blockquote-footer text-right">{{ product.description }}</footer>
                                </blockquote>
                                <div class="d-flex justify-content-between align-items-baseline">
                                    <div class="h4" v-if="!product.price">{{ product.origin_price }} 元</div>
                                    <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
                                    <div class="h4" v-if="product.price">現在只要 {{ product.price }} 元</div>
                                </div>
                                <select name="" class="form-control mt-3" v-model="product.num">
                                <option :value="num" v-for="num in 10" :key="num">
                                    選購 {{num}} {{product.unit}}
                                </option>
                                </select>
                            </div>
                            <div class="modal-footer">
                                <div class="text-muted text-nowrap mr-3">
                                小計 <strong>{{ product.num * product.price }}</strong> 元
                                </div>
                                <button type="button" class="btn btn-primary"
                                @click="addtoCart(product.id, product.num)">
                                <i class="fas fa-spinner fa-spin" v-if="product.id === loadingItem"></i>
                                加到購物車
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <button @click="goBack">回上一頁</button>
            </div>
        </template>

        <template v-else>
            <div class="row mt-4">
                <div class="col-md-4 mb-4" v-for="item in filterData" :key="item.id">
                    <div class="card border-0 shadow-sm">
                        <div style="height: 150px; background-size: cover; background-position: center"
                            :style="{backgroundImage: `url(${item.imageUrl})`}"
                        >
                        </div>
                        <div class="card-body">
                            <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
                            <h5 class="card-title">
                                <a href="#" class="text-dark">{{ item.title }}</a>
                            </h5>
                            <p class="card-text">{{ item.content }}</p>
                            <div class="d-flex justify-content-between align-items-baseline">
                                <!-- <div class="h5">2,800 元</div> -->
                                <div class="h5" v-if="!item.price">現在只要 {{ item.origin_price | currency }} 元</div>
                                <del class="h6" v-if="item.price">原價 {{ item.origin_price | currency }} 元</del>
                                <div class="h5" v-if="item.price">現在只要 {{ item.price | currency }} 元</div>
                            </div>
                        </div>
                        <div class="card-footer d-flex">
                            <button type="button" class="btn btn-outline-secondary btn-sm"
                                @click="getProduct(item.id)">
                                <i class="fas fa-spinner fa-spin"  v-if="item.id === loadingItem"></i>
                                查看更多
                            </button>
                            <button type="button" class="btn btn-outline-danger btn-sm ml-auto"
                                @click="addtoCart(item.id)">
                                <i class="fas fa-spinner fa-spin" v-if="item.id === loadingItem"></i>
                                加到購物車
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </template>
            
            <!-- <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">{{ product.title }}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <img :src="product.imageUrl" class="img-fluid" alt="">
                            <blockquote class="blockquote mt-3">
                                <p class="mb-0">{{ product.content }}</p>
                                <footer class="blockquote-footer text-right">{{ product.description }}</footer>
                            </blockquote>
                            <div class="d-flex justify-content-between align-items-baseline">
                                <div class="h4" v-if="!product.price">{{ product.origin_price }} 元</div>
                                <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
                                <div class="h4" v-if="product.price">現在只要 {{ product.price }} 元</div>
                            </div>
                            <select name="" class="form-control mt-3" v-model="product.num">
                            <option :value="num" v-for="num in 10" :key="num">
                                選購 {{num}} {{product.unit}}
                            </option>
                            </select>
                        </div>
                        <div class="modal-footer">
                            <div class="text-muted text-nowrap mr-3">
                            小計 <strong>{{ product.num * product.price }}</strong> 元
                            </div>
                            <button type="button" class="btn btn-primary"
                            @click="addtoCart(product.id, product.num)">
                            <i class="fas fa-spinner fa-spin" v-if="product.id === loadingItem"></i>
                            加到購物車
                            </button>
                        </div>
                    </div>
                </div>
            </div> -->

        </div>
        
      </div>
    </div>
    <footer class="bg-light text-muted py-5">
      <div class="container">
        <ul class="list-inline text-center">
          <li class="list-inline-item">© Copright 2017 六角血拼賣賣</li>
          <li class="list-inline-item">
            <a class="text-info" href="#">
              <i class="fa fa-instagram" aria-hidden="true"></i> Instagrame</a>
          </li>
          <li class="list-inline-item">
            <a class="text-info" href="#">
              <i class="fa fa-facebook-square" aria-hidden="true"></i> Facebook</a>
          </li>
          <li class="list-inline-item">
            <a class="text-info" href="#">About</a>
          </li>
        </ul>
        <p class="text-center">Made with Bootstrap4</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
// import ProductDetailed from './pages/productDetailed';
export default {
  name: 'Home',
  data() {
    return {
      searchText: '',
      is_product: false
    };
  },
  computed: {
    ...mapGetters([
        'categories',
        'products',
        'product',
        'cart',
        'isLoading',
        'loadingItem'
    ]),
    filterData() {
      const vm = this;
      if (vm.searchText) {
        return vm.products.filter((item) => {
          const data = item.category.toLowerCase().includes(vm.searchText.toLowerCase());
          return data;
        });
      }
      return this.products;
    },
    isLoading() {
      return this.$store.state.isLoading;
    },
    cart() {
      return this.$store.state.cart;
    },
    product() {
      return this.$store.state.product;
    },
  },
  methods: {
    ...mapActions(['getProducts', 'getCart']),
    addtoCart(id, qty = 1) {
    //   console.log(this.$store.state.prouuctsModules.products) //products 現在是區域變數
      console.log(this.$store.state.products)
      this.$store.dispatch('addtoCart', { id, qty });
    },
    removeCart(id) {
      this.$store.dispatch('removeCart', id);
    },
    getProduct(id) {
      this.$store.dispatch('getProduct', id);
      this.is_product = true;
    },
    goBack(){
        this.$router.go(-1);
        this.is_product = false;
    }
  },
  created() {
    this.getProducts();
    this.getCart();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
