<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-card">
        <h2 class="login-title">登录 DevBlog Hub</h2>

        <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" class="login-form"
          @submit.prevent="handleLogin">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="请输入用户名" size="large" :prefix-icon="User" />
          </el-form-item>

          <el-form-item prop="password">
            <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" size="large" :prefix-icon="Lock"
              show-password />
          </el-form-item>

          <el-form-item>
            <el-checkbox v-model="loginForm.remember">记住我</el-checkbox>
            <el-link type="primary" class="forgot-password">忘记密码?</el-link>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" size="large" class="login-button" :loading="loading" @click="handleLogin">
              登录
            </el-button>
          </el-form-item>
        </el-form>

        <div class="login-footer">
          <span>还没有账号?</span>
          <el-link type="primary" @click="goToRegister">立即注册</el-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import { useUserStore } from '@/stores'
  import { User, Lock } from '@element-plus/icons-vue'
  import type { FormInstance, FormRules } from 'element-plus'

  const router = useRouter()
  const userStore = useUserStore()

  // 表单引用
  const loginFormRef = ref<FormInstance>()

  // 表单数据
  const loginForm = reactive({
    username: '',
    password: '',
    remember: false
  })

  // 表单验证规则
  const loginRules: FormRules = {
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { min: 3, max: 20, message: '用户名长度在 3 到 20 个字符', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
    ]
  }

  // 加载状态
  const loading = ref(false)

  // 处理登录
  const handleLogin = async () => {
    if (!loginFormRef.value) return

    // 验证表单
    const isValid = await loginFormRef.value.validate((valid) => valid)
    if (!isValid) return

    loading.value = true

    try {
      // 调用用户store的登录方法
      await userStore.login(loginForm)

      // 登录成功，跳转到首页
      router.push('/')
    } catch (error) {
      console.error('登录失败:', error)
    } finally {
      loading.value = false
    }
  }

  // 跳转到注册页面
  const goToRegister = () => {
    router.push('/register')
  }
</script>

<style lang="scss" scoped>
  .login-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 1rem;

    .login-container {
      width: 100%;
      max-width: 400px;
    }

    .login-card {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

      .login-title {
        text-align: center;
        margin-bottom: 2rem;
        color: #333;
        font-size: 1.5rem;
      }

      .login-form {
        .forgot-password {
          float: right;
        }

        .login-button {
          width: 100%;
          margin-top: 1rem;
        }
      }

      .login-footer {
        text-align: center;
        margin-top: 1.5rem;
        color: #666;

        span {
          margin-right: 0.5rem;
        }
      }
    }
  }
</style>