import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, LoginForm, RegisterForm } from '@/types/user'

export const useUserStore = defineStore('user', () => {
  // 状态
  const token = ref<string>('')
  const userInfo = ref<User | null>(null)
  const isLogin = computed(() => !!token.value)

  // 登录
  const login = async (form: LoginForm) => {
    // TODO: 调用登录API
    // 模拟登录
    token.value = 'mock_token_' + Date.now()
    userInfo.value = {
      id: 1,
      username: form.username,
      email: `${form.username}@example.com`,
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      role: 'user',
      createdAt: new Date().toISOString()
    }

    // 保存到本地存储
    localStorage.setItem('token', token.value)
  }

  // 注册
  const register = async (form: RegisterForm) => {
    // TODO: 调用注册API
    console.log('注册信息:', form)
  }

  // 退出登录
  const logout = () => {
    // TODO: 调用退出登录API
    token.value = ''
    userInfo.value = null
    localStorage.removeItem('token')
  }

  // 获取用户信息
  const getUserInfo = async () => {
    // TODO: 调用获取用户信息API
    if (!token.value) return null
    return userInfo.value
  }

  // 初始化用户状态（从localStorage）
  const initUser = () => {
    const savedToken = localStorage.getItem('token')
    if (savedToken) {
      token.value = savedToken
      // TODO: 获取用户信息
    }
  }

  return {
    token,
    userInfo,
    isLogin,
    login,
    register,
    logout,
    getUserInfo,
    initUser
  }
})