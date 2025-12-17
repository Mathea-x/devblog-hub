import request from './api'
import type {
  Article,
  ArticleListItem,
  ArticleQueryParams,
  ArticleForm,
  PaginatedResponse
} from '@/types/article'

// 文章相关API
export const articleApi = {
  // 获取文章列表
  getArticles(params: ArticleQueryParams): Promise<PaginatedResponse<ArticleListItem>> {
    return request.get('/articles', params)
  },

  // 获取文章详情
  getArticleDetail(id: number): Promise<Article> {
    return request.get(`/articles/${id}`)
  },

  // 创建文章
  createArticle(data: ArticleForm): Promise<Article> {
    return request.post('/articles', data)
  },

  // 更新文章
  updateArticle(id: number, data: ArticleForm): Promise<Article> {
    return request.put(`/articles/${id}`, data)
  },

  // 删除文章
  deleteArticle(id: number): Promise<void> {
    return request.delete(`/articles/${id}`)
  },

  // 点赞文章
  likeArticle(id: number): Promise<void> {
    return request.post(`/articles/${id}/like`)
  },

  // 取消点赞文章
  unlikeArticle(id: number): Promise<void> {
    return request.delete(`/articles/${id}/like`)
  },

  // 收藏文章
  collectArticle(id: number): Promise<void> {
    return request.post(`/articles/${id}/collect`)
  },

  // 取消收藏文章
  uncollectArticle(id: number): Promise<void> {
    return request.delete(`/articles/${id}/collect`)
  },

  // 获取分类列表
  getCategories(): Promise<any[]> {
    return request.get('/categories')
  },

  // 获取标签列表
  getTags(): Promise<any[]> {
    return request.get('/tags')
  }
}