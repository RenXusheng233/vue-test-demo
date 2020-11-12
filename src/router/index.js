import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import { bustCache } from '@/bust-cache.js'

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
})

// NOTE: 提前解耦导出, 用于单元测试(解决参数问题)
// 在单元测试中通过 router 实例获取 beforeEach 方法时, 无法知晓并拿到正确的 next
export function beforeEach(to, from, next) {
  if (to.matched.some((record) => record.meta.shouldBustCache)) {
    bustCache()
  }
  next()
}

router.beforeEach((to, from, next) => beforeEach(to, from, next))

export default router
