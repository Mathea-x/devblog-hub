// 用户基本类型
export interface User {
  id: number
  username: string
  email: string
  avatar: string
  role: 'user' | 'admin'
  bio?: string
  createdAt: string
  updatedAt?: string
}

// 登录表单
export interface LoginForm {
  username: string
  password: string
  remember?: boolean
}

// 注册表单
export interface RegisterForm {
  username: string
  email: string
  password: string
  confirmPassword: string
}

// API响应类型
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
  timestamp: number
}

// 分页参数
export interface PaginationParams {
  page: number
  pageSize: number
  total?: number
}

// 分页响应
export interface PaginatedResponse<T> {
  list: T[]
  pagination: {
    page: number
    pageSize: number
    total: number
    totalPages: number
  }
}