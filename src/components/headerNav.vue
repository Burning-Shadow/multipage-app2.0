<template>
  <div>
    <h1>This is CDMQ Header</h1>
    <router-link
      v-for="item in menus"
      :key="item.routeName"
      :to="item.lastUrlCatch"
    >
      {{ item.menuName }}
    </router-link>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'header-nav',
  props: {
    menus: {
      type: Array,
      default: () => []
    }
  },
  created () {
    console.log(this.menus)
  }
}
</script>
