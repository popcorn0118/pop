<template>
    <div>
        <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
            <router-link to="../home" class="navbar-brand col-sm-3 col-md-2 mr-0">小柯基購物網前台</router-link>
            <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search">
            <ul class="navbar-nav px-3">
                <li class="nav-item text-nowrap">
                <a class="nav-link" href="#" @click.prevent="signout">Sign out</a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'Navbar',
        methods: {
        signout() { 
            const vm = this;
            const url = `${process.env.APIPATH}/logout`
            vm.isLoading = true
            this.$http.post(url).then((response) => {
                console.log(response.data)
                vm.$router.push('signin')
            })
        },
    }
}
</script>