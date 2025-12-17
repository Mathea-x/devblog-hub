import { createPinia } from 'pinia'
import type { App } from 'vue'

// 创建Pinia实例
const pinia = createPinia()

// Pinia插件配置（如果需要）
// pinia.use(plugin)

export default pinia

// 导出所有store
export * from './modules/user'
export * from './modules/article'
// export * from './modules/app'

// 安装函数
export function setupStore(app: App<Element>) {
  app.use(pinia)
}