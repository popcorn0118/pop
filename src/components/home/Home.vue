<template>
    <div>
        <!-- headers -->
        <Navbar_home />
        <div class="jumbotron jumbotron-fluid jumbotron-bg d-flex align-items-end">
            <div class="container">
            <div class="p-3 bg-lighter">
                <h1 class="display-3 font-weight-bold">買到剁手手！最後出清</h1>
                <p class="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
            </div>
            </div>
        </div>
        <div class="container main-contant mb-1">
            <div class="row">
                <Sidebar_home />
            <div class="col-md-9">
                <div class="d-flex mb-4">
                <!-- Search bar -->
                <form class="form-inline my-3 my-lg-0">
                    <div class="input-group">
                    <input class="form-control" type="text" placeholder="Search" aria-label="Search">
                    <div class="input-group-append">
                        <button class="btn btn-outline-warning" type="submit">
                        <i class="fa fa-search" aria-hidden="true"></i> Search</button>
                    </div>
                    </div>
                </form>
                </div>
                <!-- 主要商品列表 (Card) -->
                <div class="tab-content">
                <div class="tab-pane active" id="list-gold">
                    <router-view></router-view>
                    <!-- pagination -->
                    <nav aria-label="Page navigation" class="my-5">
                    <ul class="pagination justify-content-center">
                        <li class="page-item disabled">
                        <a class="page-link" href="#" tabindex="-1">Previous</a>
                        </li>
                        <li class="page-item">
                        <a class="page-link" href="#">1</a>
                        </li>
                        <li class="page-item">
                        <a class="page-link" href="#">2</a>
                        </li>
                        <li class="page-item">
                        <a class="page-link" href="#">3</a>
                        </li>
                        <li class="page-item">
                        <a class="page-link" href="#">Next</a>
                        </li>
                    </ul>
                    </nav>
                </div>

                <div class="tab-pane" id="list-gift">
                    <div class="row align-items-stretch">
                    <!-- 禮品 -->
                    <div class="col-md-4 mb-4">
                        <div class="card border-0 box-shadow text-center h-100">
                        <img class="card-img-top" src="https://images.unsplash.com/photo-1482173074468-5b323335debe?w=1350" alt="Card image cap">
                        <div class="card-body">
                            <h4 class="card-title">超精緻禮物</h4>
                            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content
                            is a little bit longer.</p>
                        </div>
                        <div class="card-footer border-top-0 bg-white">
                            <a href="#" class="btn btn-outline-secondary btn-block btn-sm">
                            <i class="fa fa-cart-plus" aria-hidden="true"></i> 搶購去
                            </a>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <!-- tab-content end -->

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

        <div class="modal fade" id="removeModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header bg-danger text-white">
                <h5 class="modal-title">刪除商品</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="modal-body">
                <p>是否確認刪除商品</p>
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">否</button>
                <button type="button" class="btn btn-outline-danger px-5">是</button>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar_home from './Navbar_home';
import Sidebar_home from './Sidebar_home';

export default {
    components: {
        Navbar_home,
        Sidebar_home
    }

}
</script>