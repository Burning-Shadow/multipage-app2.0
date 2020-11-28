import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: {
        name: 'home'
      }
    },
    /* pageRouterView route begin */
    {
      name: 'home',
      path: '/home',
      alias: '/home/*',
      component: () => import(/* webpackChunkName: "about" */ './views/Home.vue'),
      meta: {
        pageUrl: './home.html',
        title: 'Home Page',
        loading: true
      }
    },
    {
      name: 'consume',
      path: '/consume',
      alias: '/consume/*',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
      meta: {
        pageUrl: './consume.html',
        title: 'Consume Page',
        loading: true
      }
    },
    {
      name: 'product',
      path: '/product',
      alias: '/product/*',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
      meta: {
        pageUrl: './product.html',
        title: 'Product Page',
        loading: true
      }
    },
    {
      name: 'topic',
      path: '/topic',
      alias: '/topic/*',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
      meta: {
        pageUrl: './topic.html',
        title: 'Topic Page',
        loading: true
      }
    }
  ]
})
