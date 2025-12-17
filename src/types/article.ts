// 文章状态枚举
export enum ArticleStatus {
  DRAFT = 'draft',       // 草稿
  PUBLISHED = 'published', // 已发布
  REVIEWING = 'reviewing', // 审核中
  REJECTED = 'rejected',   // 已拒绝
}

// 文章分类
export interface Category {
  id: number
  name: string
  slug: string
  description?: string
  articleCount: number
  createdAt: string
  updatedAt?: string
}

// 文章标签
export interface Tag {
  id: number
  name: string
  color?: string
  articleCount: number
  createdAt: string
}

// 文章基础信息
export interface Article {
  id: number
  title: string
  summary: string
  content: string
  htmlContent: string
  coverImage?: string
  authorId: number
  authorName: string
  authorAvatar: string
  categoryId: number
  categoryName: string
  tags: Tag[]
  status: ArticleStatus
  viewCount: number
  likeCount: number
  commentCount: number
  collectCount: number
  isLiked: boolean
  isCollected: boolean
  isTop: boolean
  publishedAt: string
  createdAt: string
  updatedAt?: string
}

// 文章列表项（简略信息）
export interface ArticleListItem {
  id: number
  title: string
  summary: string
  coverImage?: string
  authorId: number
  authorName: string
  authorAvatar: string
  categoryId: number
  categoryName: string
  tags: Tag[]
  viewCount: number
  likeCount: number
  commentCount: number
  publishedAt: string
}

// 文章查询参数
export interface ArticleQueryParams {
  page?: number
  pageSize?: number
  categoryId?: number
  tagId?: number
  authorId?: number
  keyword?: string
  sortBy?: 'createdAt' | 'viewCount' | 'likeCount' | 'commentCount'
  sortOrder?: 'asc' | 'desc'
  status?: ArticleStatus
}

// 文章创建/更新表单
export interface ArticleForm {
  title: string
  summary: string
  content: string
  coverImage?: string
  categoryId?: number
  tagIds?: number[]
  status: ArticleStatus
}

// 评论相关类型
export interface Comment {
  id: number
  articleId: number
  userId: number
  userName: string
  userAvatar: string
  content: string
  parentId?: number
  replyTo?: string
  likeCount: number
  isLiked: boolean
  createdAt: string
  updatedAt?: string
  replies?: Comment[]
}

export interface CommentForm {
  articleId: number
  content: string
  parentId?: number
  replyTo?: string
}