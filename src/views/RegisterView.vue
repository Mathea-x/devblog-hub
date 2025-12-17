<template>
  <div class="register-page">
    <div class="register-container">
      <div class="register-card">
        <h2 class="register-title">注册 DevBlog Hub</h2>

        <el-form ref="registerFormRef" :model="registerForm" :rules="registerRules" class="register-form"
          @submit.prevent="handleRegister">
          <el-form-item prop="username">
            <el-input v-model="registerForm.username" placeholder="请输入用户名" size="large" :prefix-icon="User" />
          </el-form-item>

          <el-form-item prop="email">
            <el-input v-model="registerForm.email" placeholder="请输入邮箱" size="large" :prefix-icon="Message" />
          </el-form-item>

          <el-form-item prop="password">
            <el-input v-model="registerForm.password" type="password" placeholder="请输入密码" size="large"
              :prefix-icon="Lock" show-password />
          </el-form-item>

          <el-form-item prop="confirmPassword">
            <el-input v-model="registerForm.confirmPassword" type="password" placeholder="请确认密码" size="large"
              :prefix-icon="Lock" show-password />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" size="large" class="register-button" :loading="loading" @click="handleRegister">
              注册
            </el-button>
          </el-form-item>
        </el-form>

        <div class="register-footer">
          <span>已有账号?</span>
          <el-link type="primary" @click="goToLogin">立即登录</el-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import { useUserStore } from '@/stores'
  import { User, Message, Lock } from '@element-plus/icons-vue'
  import type { FormInstance, FormRules } from 'element-plus'

  const router = useRouter()
  const userStore = useUserStore()

  // 表单引用
  const registerFormRef = ref<FormInstance>()

  // 表单数据
  const registerForm = reactive({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  // 自定义验证规则：确认密码
  const validateConfirmPassword = (rule: any, value: string, callback: any) => {
    if (value !== registerForm.password) {
      callback(new Error('两次输入的密码不一致'))
    } else {
      callback()
    }
  }

  // 表单验证规则
  const registerRules: FormRules = {
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { min: 3, max: 20, message: '用户名长度在 3 到 20 个字符', trigger: 'blur' }
    ],
    email: [
      { required: true, message: '请输入邮箱', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
    ],
    confirmPassword: [
      { required: true, message: '请确认密码', trigger: 'blur' },
      { validator: validateConfirmPassword, trigger: 'blur' }
    ]
  }

  // 加载状态
  const loading = ref(false)

  // 处理注册
  const handleRegister = async () => {
    if (!registerFormRef.value) return

    // 验证表单
    const isValid = await registerFormRef.value.validate((valid) => valid)
    if (!isValid) return

    loading.value = true

    try {
      // 调用用户store的注册方法
      await userStore.register(registerForm)

      // 注册成功，跳转到登录页面
      router.push('/login')
    } catch (error) {
      console.error('注册失败:', error)
    } finally {
      loading.value = false
    }
  }

  // 跳转到登录页面
  const goToLogin = () => {
    router.push('/login')
  }
</script>

<style lang="scss" scoped>
  .register-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 1rem;

    .register-container {
      width: 100%;
      max-width: 400px;
    }

    .register-card {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

      .register-title {
        text-align: center;
        margin-bottom: 2rem;
        color: #333;
        font-size: 1.5rem;
      }

      .register-form {
        .register-button {
          width: 100%;
          margin-top: 1rem;
        }
      }

      .register-footer {
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