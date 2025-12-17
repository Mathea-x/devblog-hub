<template>
  <header class="page-header">
    <div class="container header-container">
      <!-- Logo区域 -->
      <div class="logo" @click="goHome">
        <span class="logo-text">DevBlog Hub</span>
        <span class="logo-subtitle">开发者技术社区</span>
      </div>

      <!-- 导航菜单 -->
      <nav class="nav-menu">
        <el-menu :default-active="activeIndex" mode="horizontal" :ellipsis="false" @select="handleSelect">
          <el-menu-item index="/">
            <el-icon>
              <HomeFilled />
            </el-icon>
            <span>首页</span>
          </el-menu-item>

          <el-sub-menu index="categories">
            <template #title>
              <el-icon>
                <Folder />
              </el-icon>
              <span>分类</span>
            </template>
            <el-menu-item v-for="category in categories" :key="category.id" :index="`/category/${category.id}`">
              {{ category.name }}
              <span class="category-count">({{ category.articleCount }})</span>
            </el-menu-item>
          </el-sub-menu>

          <el-menu-item index="/write" v-if="isLogin">
            <el-icon>
              <EditPen />
            </el-icon>
            <span>写文章</span>
          </el-menu-item>

          <el-menu-item index="/admin" v-if="userInfo?.role === 'admin'">
            <el-icon>
              <Setting />
            </el-icon>
            <span>管理后台</span>
          </el-menu-item>
        </el-menu>
      </nav>

      <!-- 搜索框 -->
      <div class="search-box">
        <el-input v-model="searchKeyword" placeholder="搜索文章..." size="small" :prefix-icon="Search"
          @keyup.enter="handleSearch" @blur="handleSearch" />
      </div>

      <!-- 用户操作区域 -->
      <div class="user-actions">
        <template v-if="isLogin">
          <!-- 通知 -->
          <el-badge :value="3" class="notification">
            <el-icon size="20">
              <Bell />
            </el-icon>
          </el-badge>

          <!-- 用户头像和下拉菜单 -->
          <el-dropdown @command="handleUserCommand">
            <div class="user-avatar">
              <el-avatar :size="32" :src="userInfo?.avatar" />
              <span class="username">{{ userInfo?.username }}</span>
              <el-icon>
                <ArrowDown />
              </el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile">
                  <el-icon>
                    <User />
                  </el-icon>
                  个人中心
                </el-dropdown-item>
                <el-dropdown-item command="articles">
                  <el-icon>
                    <Document />
                  </el-icon>
                  我的文章
                </el-dropdown-item>
                <el-dropdown-item command="collections">
                  <el-icon>
                    <Star />
                  </el-icon>
                  我的收藏
                </el-dropdown-item>
                <el-dropdown-item command="settings" divided>
                  <el-icon>
                    <Setting />
                  </el-icon>
                  设置
                </el-dropdown-item>
                <el-dropdown-item command="logout">
                  <el-icon>
                    <SwitchButton />
                  </el-icon>
                  退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>

        <template v-else>
          <el-button type="text" @click="goLogin">登录</el-button>
          <el-button type="primary" size="small" @click="goRegister">注册</el-button>
        </template>
      </div>

      <!-- 移动端菜单按钮 -->
      <div class="mobile-menu-btn" @click="toggleMobileMenu">
        <el-icon size="24">
          <Menu />
        </el-icon>
      </div>
    </div>

    <!-- 移动端菜单 -->
    <div v-if="showMobileMenu" class="mobile-menu">
      <div class="mobile-menu-header">
        <div class="user-info" v-if="isLogin">
          <el-avatar :size="48" :src="userInfo?.avatar" />
          <div class="user-detail">
            <h3>{{ userInfo?.username }}</h3>
            <p>{{ userInfo?.email }}</p>
          </div>
        </div>
        <div class="mobile-search">
          <el-input v-model="searchKeyword" placeholder="搜索文章..." size="small" :prefix-icon="Search" />
        </div>
      </div>
      <div class="mobile-menu-content">
        <el-menu :default-active="activeIndex" @select="handleMobileSelect">
          <el-menu-item index="/">
            <el-icon>
              <HomeFilled />
            </el-icon>
            <span>首页</span>
          </el-menu-item>

          <el-sub-menu index="categories">
            <template #title>
              <el-icon>
                <Folder />
              </el-icon>
              <span>分类</span>
            </template>
            <el-menu-item v-for="category in categories" :key="category.id" :index="`/category/${category.id}`">
              {{ category.name }}
            </el-menu-item>
          </el-sub-menu>

          <el-menu-item index="/write" v-if="isLogin">
            <el-icon>
              <EditPen />
            </el-icon>
            <span>写文章</span>
          </el-menu-item>

          <el-menu-item index="/admin" v-if="userInfo?.role === 'admin'">
            <el-icon>
              <Setting />
            </el-icon>
            <span>管理后台</span>
          </el-menu-item>

          <template v-if="isLogin">
            <el-menu-item index="/profile">
              <el-icon>
                <User />
              </el-icon>
              <span>个人中心</span>
            </el-menu-item>
            <el-menu-item index="/my-articles">
              <el-icon>
                <Document />
              </el-icon>
              <span>我的文章</span>
            </el-menu-item>
            <el-menu-item index="/collections">
              <el-icon>
                <Star />
              </el-icon>
              <span>我的收藏</span>
            </el-menu-item>
            <el-menu-item index="/settings">
              <el-icon>
                <Setting />
              </el-icon>
              <span>设置</span>
            </el-menu-item>
            <el-menu-item index="logout">
              <el-icon>
                <SwitchButton />
              </el-icon>
              <span>退出登录</span>
            </el-menu-item>
          </template>

          <template v-else>
            <el-menu-item index="/login">
              <el-icon>
                <User />
              </el-icon>
              <span>登录</span>
            </el-menu-item>
            <el-menu-item index="/register">
              <el-icon>
                <UserFilled />
              </el-icon>
              <span>注册</span>
            </el-menu-item>
          </template>
        </el-menu>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useUserStore } from '@/stores'
  import { useArticleStore } from '@/stores'
  import { storeToRefs } from 'pinia'
  import {
    HomeFilled,
    Folder,
    EditPen,
    Setting,
    Search,
    Bell,
    User,
    Document,
    Star,
    SwitchButton,
    Menu,
    ArrowDown,
    UserFilled
  } from '@element-plus/icons-vue'

  const route = useRoute()
  const router = useRouter()
  const userStore = useUserStore()
  const articleStore = useArticleStore()

  // 获取状态
  const { isLogin, userInfo } = storeToRefs(userStore)
  const { categories } = storeToRefs(articleStore)

  // 本地状态
  const activeIndex = ref('/')
  const searchKeyword = ref('')
  const showMobileMenu = ref(false)

  // 计算当前激活的菜单项
  const currentPath = computed(() => route.path)

  // 监听路由变化更新激活菜单
  onMounted(() => {
    activeIndex.value = currentPath.value
  })

  // 跳转到首页
  const goHome = () => {
    router.push('/')
    showMobileMenu.value = false
  }

  // 跳转到登录页
  const goLogin = () => {
    router.push('/login')
  }

  // 跳转到注册页
  const goRegister = () => {
    router.push('/register')
  }

  // 处理菜单选择
  const handleSelect = (index: string) => {
    if (index === '/write') {
      router.push('/write')
    } else if (index.startsWith('/category/')) {
      const categoryId = index.split('/')[2]
      router.push(`/category/${categoryId}`)
    } else if (index === '/admin') {
      router.push('/admin')
    }
  }

  // 处理移动端菜单选择
  const handleMobileSelect = (index: string) => {
    if (index === 'logout') {
      handleLogout()
    } else if (index.startsWith('/category/')) {
      const categoryId = index.split('/')[2]
      router.push(`/category/${categoryId}`)
    } else {
      router.push(index)
    }
    showMobileMenu.value = false
  }

  // 处理用户命令
  const handleUserCommand = (command: string) => {
    switch (command) {
      case 'profile':
        router.push('/profile')
        break
      case 'articles':
        router.push('/my-articles')
        break
      case 'collections':
        router.push('/collections')
        break
      case 'settings':
        router.push('/settings')
        break
      case 'logout':
        handleLogout()
        break
    }
  }

  // 处理搜索
  const handleSearch = () => {
    if (searchKeyword.value.trim()) {
      router.push({
        path: '/search',
        query: { q: searchKeyword.value }
      })
      searchKeyword.value = ''
    }
  }

  // 处理退出登录
  const handleLogout = () => {
    userStore.logout()
    router.push('/login')
  }

  // 切换移动端菜单
  const toggleMobileMenu = () => {
    showMobileMenu.value = !showMobileMenu.value
  }

  // 初始化分类数据
  onMounted(async () => {
    await articleStore.fetchCategories()
  })
</script>

<style lang="scss" scoped>
  .page-header {
    background-color: white;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    position: sticky;
    top: 0;
    z-index: 1000;

    .header-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 60px;
      padding: 0 1rem;
    }

    .logo {
      display: flex;
      flex-direction: column;
      cursor: pointer;
      user-select: none;

      .logo-text {
        font-size: 1.5rem;
        font-weight: bold;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .logo-subtitle {
        font-size: 0.75rem;
        color: #999;
        margin-top: -2px;
      }
    }

    .nav-menu {
      flex: 1;
      margin: 0 2rem;

      :deep(.el-menu) {
        border-bottom: none;
        background-color: transparent;
      }

      :deep(.el-menu--horizontal) {

        .el-menu-item,
        .el-sub-menu__title {
          height: 60px;
          line-height: 60px;

          &:hover {
            background-color: #f5f7fa;
          }
        }
      }
    }

    .search-box {
      width: 200px;
      margin-right: 1rem;
    }

    .user-actions {
      display: flex;
      align-items: center;
      gap: 1rem;

      .notification {
        cursor: pointer;
        color: #666;

        &:hover {
          color: #409eff;
        }
      }

      .user-avatar {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 20px;
        transition: background-color 0.3s;

        &:hover {
          background-color: #f5f7fa;
        }

        .username {
          font-size: 0.875rem;
          color: #333;
          max-width: 80px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }

    .mobile-menu-btn {
      display: none;
      cursor: pointer;
      color: #666;

      &:hover {
        color: #409eff;
      }
    }

    .mobile-menu {
      display: none;
      position: absolute;
      top: 60px;
      left: 0;
      right: 0;
      background-color: white;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      z-index: 999;

      .mobile-menu-header {
        padding: 1rem;
        border-bottom: 1px solid #eee;

        .user-info {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;

          .user-detail {
            h3 {
              margin: 0;
              font-size: 1rem;
              color: #333;
            }

            p {
              margin: 0;
              font-size: 0.875rem;
              color: #999;
            }
          }
        }
      }

      .mobile-menu-content {
        :deep(.el-menu) {
          border-right: none;
        }

        :deep(.el-menu-item) {
          height: 48px;
          line-height: 48px;
        }
      }
    }

    .category-count {
      margin-left: 0.5rem;
      font-size: 0.75rem;
      color: #999;
    }
  }

  @media (max-width: 1024px) {
    .page-header {
      .nav-menu {
        margin: 0 1rem;
      }

      .search-box {
        width: 150px;
      }
    }
  }

  @media (max-width: 768px) {
    .page-header {

      .nav-menu,
      .search-box,
      .user-actions {
        display: none;
      }

      .mobile-menu-btn {
        display: block;
      }

      .mobile-menu {
        display: block;
      }
    }
  }
</style>