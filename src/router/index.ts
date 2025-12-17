import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: {
        title: '首页 - DevBlog Hub',
        requiresAuth: false
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@views/LoginView.vue'),
      meta: {
        title: '登录 - DevBlog Hub',
        requiresAuth: false
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@views/RegisterView.vue'),
      meta: {
        title: '注册 - DevBlog Hub',
        requiresAuth: false
      }
    },
    {
      path: '/admin',
      name: 'AdminLayout',
      component: () => import('@views/admin/LayoutView.vue'),
      redirect: '/admin/dashboard',
      meta: {
        title: '管理后台',
        requiresAuth: true,
        requiresAdmin: true
      },
      children: [
        {
          path: 'dashboard',
          name: 'AdminDashboard',
          component: () => import('@views/admin/DashboardView.vue'),
          meta: {
            title: '仪表盘',
            requiresAuth: true,
            requiresAdmin: true
          }
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@views/NotFound.vue'),
      meta: {
        title: '页面不存在',
        requiresAuth: false
      }
    }
  ],
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = to.meta.title as string
  }

  // 这里可以添加权限验证逻辑
  next()
})

export default router