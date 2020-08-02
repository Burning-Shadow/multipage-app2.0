<template>
  <div id='app'>
    <header-nav :menus='menus' />
    <div class='iframe-box'>
      <template v-for='item in menus'>
        <page-route-view
          :key='item.routeName'
          :name='item.routeName'
          v-show='activeItem === item.routeName'
        ></page-route-view>
      </template>
    </div>
    <footer-nav />
  </div>
</template>

<script>
import headerNav from '@/components/headerNav.vue'
import footerNav from '@/components/footerNav.vue'
import pageRouteView from '@/components/pageRouteView.vue'
export default {
  name: 'cdmq-index',
  components: {
    headerNav,
    footerNav,
    pageRouteView
  },
  data () {
    return {
      // 注意：这里的 routerName 需要跟 v-router 中配置的路由名对应
      menus: [
        {
          routeName: 'home',
          menuName: '主页',
          isSingle: true,
          component: () => import('@/pages/home/App.vue'),
          lastUrlCatch: '/home/home'
        },
        {
          routeName: 'consume',
          menuName: '消费者',
          isSingle: true,
          component: () => import('@/pages/consume/App.vue'),
          lastUrlCatch: '/consume/search'
        },
        {
          routeName: 'product',
          menuName: '生产者',
          isSingle: true,
          component: () => import('@/pages/product/App.vue'),
          lastUrlCatch: '/product/search'
        },
        {
          routeName: 'topic',
          menuName: 'Topic',
          isSingle: true,
          component: () => import('@/pages/topic/App.vue'),
          lastUrlCatch: '/topic/search'
        }
      ],
      activeItem: ''
    }
  },
  watch: {
    $route: {
      handler (to) {
        let menuNameList = this.menus.map(item => item.routeName)
        let matchMenuItem
        let matchRouteItem = to.matched.find(item => {
          let i = menuNameList.indexOf(item.name)
          if (i !== -1) {
            matchMenuItem = this.menus[i]
            return true
          } else {
            return false
          }
        })
        if (matchRouteItem) {
          this.activeItem = matchRouteItem.name
          if (matchMenuItem && matchMenuItem.lastUrlCatch) {
            matchMenuItem.lastUrlCatch = to.fullPath
          }
        } else {
          this.activeItem = ''
        }
      },
      immediate: true
    }
  },
  created () {
    // TODO: 获取用户信息列表
  }
}
</script>

<style lang='scss'>
#app {
  height: 100%;
  height: 10000px;
  overflow: hidden;
  position: relative;

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

  .iframe-box {
    position: relative;
    background-color: red;
    min-height: 50px;
    // top: 50px;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
