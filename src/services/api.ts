import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import type { ApiResponse } from '@/types/user'

// 创建axios实例
const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    // 在请求发送之前做一些处理
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // 如果是GET请求，添加时间戳防止缓存
    if (config.method?.toLowerCase() === 'get') {
      config.params = {
        ...config.params,
        _t: Date.now()
      }
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const { data } = response

    // 根据后端返回的code判断请求是否成功
    if (data.code === 0) {
      return data.data
    } else {
      // 处理业务错误
      console.error('API Error:', data.message)
      return Promise.reject(new Error(data.message || '请求失败'))
    }
  },
  (error) => {
    // 处理HTTP错误
    const { response } = error

    if (response) {
      switch (response.status) {
        case 401:
          // token失效，跳转到登录页
          localStorage.removeItem('token')
          window.location.href = '/login'
          break
        case 403:
          console.error('权限不足')
          break
        case 404:
          console.error('资源不存在')
          break
        case 500:
          console.error('服务器错误')
          break
        default:
          console.error('请求错误', response.status)
      }
    } else {
      console.error('网络错误或请求超时')
    }

    return Promise.reject(error)
  }
)

// 封装请求方法
const request = {
  get<T = any>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> {
    return axiosInstance.get(url, { params, ...config })
  },

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return axiosInstance.post(url, data, config)
  },

  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return axiosInstance.put(url, data, config)
  },

  delete<T = any>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> {
    return axiosInstance.delete(url, { params, ...config })
  },

  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return axiosInstance.patch(url, data, config)
  }
}

export default request