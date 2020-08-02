<template>
  <div id="topic">
    <div id="nav">
      <router-link to="search">Topic Search</router-link> |
      <router-link to="register">Topic Register</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#topic {
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
