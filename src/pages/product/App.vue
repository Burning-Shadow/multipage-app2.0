<template>
  <div id="product">
    <div id="nav">
      <router-link to="/search">Product Search</router-link> |
      <router-link to="/register">Product Register</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#product {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
