<template>
  <div class="home">
    <!-- 标题 -->
    <header class="home-header">
      <h1>DevBlog Hub</h1>
      <p class="subtitle">开发者技术博客社区</p>
    </header>

    <!-- 主要内容 -->
    <main class="home-main">
      <div class="container">

        <!-- 欢迎卡片 -->
        <div class="welcome-card">
          <h2>欢迎来到 DevBlog Hub</h2>
          <p>这是一个专为开发者打造的技术博客社区，分享知识，共同成长。</p>
          <div class="actions">
            <el-button type="primary" @click="goToLogin">登录</el-button>
            <el-button @click="goToRegister">注册</el-button>
          </div>
        </div>

        <!-- 项目特性 -->
        <div class="features">
          <h3>项目特性</h3>
          <div class="feature-list">
            <div class="feature-item">
              <el-icon>
                <Document />
              </el-icon>
              <h4>技术博客</h4>
              <p>分享编程经验和技术文章</p>
            </div>
            <div class="feature-item">
              <el-icon>
                <User />
              </el-icon>
              <h4>社区互动</h4>
              <p>点赞、评论、收藏文章</p>
            </div>
            <div class="feature-item">
              <el-icon>
                <Setting />
              </el-icon>
              <h4>后台管理</h4>
              <p>完整的内容管理系统</p>
            </div>
            <div class="feature-item">
              <el-icon>
                <Monitor />
              </el-icon>
              <h4>响应式设计</h4>
              <p>适配各种设备屏幕</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import { Document, User, Setting, Monitor } from '@element-plus/icons-vue'

  const router = useRouter()

  const goToLogin = () => {
    router.push('/login')
  }

  const goToRegister = () => {
    router.push('/register')
  }
</script>

<style lang="scss" scoped>
  .home {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

    .home-header {
      padding: 2rem;
      text-align: center;
      color: white;

      h1 {
        font-size: 3rem;
        margin-bottom: 0.5rem;
        font-weight: bold;
      }

      .subtitle {
        font-size: 1.2rem;
        opacity: 0.9;
      }
    }

    .home-main {
      padding: 2rem;

      .container {
        max-width: 1200px;
        margin: 0 auto;
      }

      .welcome-card {
        background: white;
        border-radius: 12px;
        padding: 2rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        text-align: center;
        margin-bottom: 2rem;

        h2 {
          margin-bottom: 1rem;
          color: #333;
        }

        p {
          color: #666;
          margin-bottom: 1.5rem;
          font-size: 1.1rem;
        }

        .actions {
          display: flex;
          justify-content: center;
          gap: 1rem;
        }
      }

      .features {
        background: white;
        border-radius: 12px;
        padding: 2rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

        h3 {
          text-align: center;
          margin-bottom: 2rem;
          color: #333;
        }

        .feature-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;

          .feature-item {
            text-align: center;
            padding: 1.5rem;
            border-radius: 8px;
            background: #f8f9fa;
            transition: transform 0.3s ease;

            &:hover {
              transform: translateY(-5px);
              background: #e9ecef;
            }

            .el-icon {
              font-size: 2.5rem;
              color: #667eea;
              margin-bottom: 1rem;
            }

            h4 {
              margin-bottom: 0.5rem;
              color: #333;
            }

            p {
              color: #666;
              font-size: 0.9rem;
            }
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    .home {
      .home-header {
        h1 {
          font-size: 2rem;
        }
      }

      .home-main {
        padding: 1rem;

        .welcome-card {
          padding: 1.5rem;
        }

        .features {
          padding: 1.5rem;

          .feature-list {
            grid-template-columns: 1fr;
          }
        }
      }
    }
  }
</style>