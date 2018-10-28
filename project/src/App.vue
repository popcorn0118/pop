<template>
  <div id="app">
    <router-view/>
   
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    // // const api = `https://vue-course-api.hexschool.io/api/popcorn/products`
    // const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`
    // //API 伺服器路徑、APIPATH
    // // console.log(process.env.APIPATH, process.env.CUSTOMPATH)
    // this.$http.get(api).then((response) => {
    //   console.log(response.data)
    // })
  }
}
</script>

<style lang="scss">
@import './assets/all';
</style>
