<!--
  该组件用于监听 v-router 插件变化并懒加载的渲染 iframe，并传递 router 信息
  props.name 与路由的 name 参数对应

  通过路由调到别的页面：
  1. path、query 方式，假如要导航到url：index.html#/exploit/createpro
  this.$router.push({
    path: '/createpro',
    query: {
      _toPage: 'exploit'
    }
  })

  2. 在导航栏可以用过如下导航到各个页面首页
  this.$router.push({
    name: 'routeName',
    params: {
      reloadPage: false   // 是否重新加载页面，默认重载
    }
  })
  this.$router.push({
    path: '/exploit/createpro',
  })
-->

<template>
  <div class='iframe-container' ref='iframeContent' v-if="hasInit">
    <iframe
      ref='iframeEle'
      :src='pageUrlWidthVersion'
      frameborder='0'
      name
    ></iframe>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: '',
      require: true
    }
  },
  data () {
    return {
      pageUrl: '',
      iframeRouter: null,
      hasInit: false
    }
  },
  computed: {
    pageUrlWidthVersion: function () {
      // console.log('this.pageUrl.split(".html").join(`.html`) = ', this.pageUrl.split('.html').join(`.html`));
      return this.pageUrl.split('.html').join(`.html`)
    }
  },
  watch: {
    $route: {
      handler (to) {
        if (new RegExp(`/${this.name}(\\/.*)?$`).test(to.fullPath)) {
          var router = '#/' + to.fullPath.slice(this.name.length + 2) // 去掉 name + 前后两个斜线
          // console.log('iframe:' + to.name + ':' + router, to, from)
          if (!this.hasInit) {
            // 用于懒加载初始化 iframe
            this.hasInit = true
            this.pageUrl = to.meta.pageUrl + router

            // let loading
            // const showLoading = to.meta.loading
            // if (showLoading) {
            //   loading = this.$loading({
            //     target: '.iframe-box'
            //   })
            // }
            this.$nextTick(() => {
              // 如果 iframe 也有使用的 v-route，则监听子页里面的变化，并将子页的路由映射回外层页面的 url ，以确保刷新页面时不会回到主页
              var win = this.$refs.iframeEle.contentWindow
              win.onload = () => {
                // if (showLoading) {
                //   loading.close()
                // }
                console.log(win)
                console.log(win.$vue)
                try {

                  
                  this.iframeRouter = win.$vue.$router
                  this.iframeRouter.beforeEach((to, from, next) => {
                    // console.log('---------', to, from)
                    var pageName = '/' + this.name
                    console.log("to.query._toPage >>>>>>>>>> ", to.query._toPage);
                    if (to.query._toPage) {
                      var r = /&?_toPage=[^&]*&?/
                      pageName = '/' + to.query._toPage
                      delete to.query._toPage
                      this.$router
                        .replace({
                          path: pageName + to.fullPath.replace(r, '')
                        })
                        .catch(err => {
                          console.log(err)
                        })
                    } else {
                      next()
                      console.log("pageName + to.fullPath >>>>>>>>>>>> ", pageName + to.fullPath);
                      this.$router
                        .replace({
                          path: pageName + to.fullPath
                        })
                        .catch(err => {
                          console.log(err)
                        })
                    }
                  })
                } catch (err) {
                  console.warn(
                    `this iframe don't user v-router, so the url won't respond when iframe's url change`
                  )
                } // 捕获 没有使用 v-router 的子页抛出的错误，不做处理
              }
            })
          } else if (this.hasInit) {
            console.log(to.meta.pageUrl + router)
            // 用于传递路由选项到 iframe 中
            var newPageUrl = to.meta.pageUrl + router
            if (this.pageUrl !== newPageUrl) {
              if (to.params.reloadPage === false) {
                location.hash = this.pageUrl
                  .split('./')[1]
                  .split('.html#')
                  .join('')
              } else {
                this.pageUrl = to.meta.pageUrl + router
              }
            }
          }
          // 用于传递路由选项到 iframe 中
          // var newPageUrl = to.meta.pageUrl + router
          // if (this.pageUrl !== newPageUrl) {
          //   if (to.params.reloadPage === false) {
          //     location.hash = this.pageUrl
          //       .split('./')[1]
          //       .split('.html#')
          //       .join('')
          //   } else {
          //     this.pageUrl = to.meta.pageUrl + router
          //   }
          // }
        }
      },
      immediate: true
    }
  },
  created() {
    // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>", this.name)
  }
}
</script>

<style lang='scss' scoped>
.iframe-container {
  height: 100%;
  width: 100%;
  iframe {
    height: 100%;
    width: 100%;
  }
}
</style>
