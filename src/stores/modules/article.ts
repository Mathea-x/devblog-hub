import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type {
  Article,
  ArticleListItem,
  ArticleQueryParams,
  ArticleForm,
  ArticleStatus
} from '@/types/article'
import { mockArticles, mockCategories, mockTags } from '@/mock/data'

export const useArticleStore = defineStore('article', () => {
  // 状态定义
  const articles = ref<ArticleListItem[]>([])
  const articleDetail = ref<Article | null>(null)
  const categories = ref(mockCategories)
  const tags = ref(mockTags)

  // 分页信息
  const pagination = ref({
    page: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0
  })

  // 查询参数
  const queryParams = ref<ArticleQueryParams>({
    page: 1,
    pageSize: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  })

  // 加载状态
  const loading = ref(false)
  const detailLoading = ref(false)

  // 计算属性
  const totalArticles = computed(() => pagination.value.total)
  const currentPage = computed(() => pagination.value.page)
  const pageSize = computed(() => pagination.value.pageSize)
  const totalPages = computed(() => pagination.value.totalPages)

  // 获取文章列表
  const fetchArticles = async (params?: ArticleQueryParams) => {
    loading.value = true

    try {
      // 更新查询参数
      if (params) {
        queryParams.value = { ...queryParams.value, ...params }
      }

      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 500))

      // 这里应该是真实的API调用
      // const response = await articleApi.getArticles(queryParams.value)

      // 使用模拟数据
      const mockData = {
        list: mockArticles,
        pagination: {
          page: queryParams.value.page || 1,
          pageSize: queryParams.value.pageSize || 10,
          total: mockArticles.length,
          totalPages: Math.ceil(mockArticles.length / (queryParams.value.pageSize || 10))
        }
      }

      articles.value = mockData.list
      pagination.value = mockData.pagination

      return mockData
    } catch (error) {
      console.error('获取文章列表失败:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  // 获取文章详情
  const fetchArticleDetail = async (id: number) => {
    detailLoading.value = true

    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 300))

      // 查找文章
      const article = mockArticles.find(a => a.id === id) as any
      if (article) {
        articleDetail.value = {
          ...article,
          content: `# ${article.title}\n\n${article.summary}\n\n这是文章的详细内容...`,
          htmlContent: `<h1>${article.title}</h1><p>${article.summary}</p><p>这是文章的详细内容...</p>`,
          status: ArticleStatus.PUBLISHED,
          isLiked: false,
          isCollected: false
        }
        return articleDetail.value
      }

      throw new Error('文章不存在')
    } catch (error) {
      console.error('获取文章详情失败:', error)
      throw error
    } finally {
      detailLoading.value = false
    }
  }

  // 创建文章
  const createArticle = async (form: ArticleForm) => {
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 500))

      const newArticle: Article = {
        id: Date.now(),
        title: form.title,
        summary: form.summary,
        content: form.content,
        htmlContent: form.content, // 实际应该转换markdown为html
        coverImage: form.coverImage,
        authorId: 1, // 当前用户ID
        authorName: '当前用户',
        authorAvatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        categoryId: form.categoryId || 1,
        categoryName: categories.value.find(c => c.id === form.categoryId)?.name || '默认分类',
        tags: tags.value.filter(t => form.tagIds?.includes(t.id)),
        status: form.status,
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
        collectCount: 0,
        isLiked: false,
        isCollected: false,
        isTop: false,
        publishedAt: new Date().toISOString(),
        createdAt: new Date().toISOString()
      }

      // 添加到列表
      articles.value.unshift({
        id: newArticle.id,
        title: newArticle.title,
        summary: newArticle.summary,
        coverImage: newArticle.coverImage,
        authorId: newArticle.authorId,
        authorName: newArticle.authorName,
        authorAvatar: newArticle.authorAvatar,
        categoryId: newArticle.categoryId,
        categoryName: newArticle.categoryName,
        tags: newArticle.tags,
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
        publishedAt: newArticle.publishedAt
      })

      return newArticle
    } catch (error) {
      console.error('创建文章失败:', error)
      throw error
    }
  }

  // 更新文章
  const updateArticle = async (id: number, form: ArticleForm) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500))

      const index = articles.value.findIndex(a => a.id === id)
      if (index !== -1) {
        articles.value[index] = {
          ...articles.value[index],
          title: form.title,
          summary: form.summary,
          coverImage: form.coverImage
        }
      }

      if (articleDetail.value && articleDetail.value.id === id) {
        articleDetail.value = {
          ...articleDetail.value,
          title: form.title,
          summary: form.summary,
          content: form.content,
          htmlContent: form.content,
          coverImage: form.coverImage,
          status: form.status,
          updatedAt: new Date().toISOString()
        }
      }

      return true
    } catch (error) {
      console.error('更新文章失败:', error)
      throw error
    }
  }

  // 删除文章
  const deleteArticle = async (id: number) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300))

      const index = articles.value.findIndex(a => a.id === id)
      if (index !== -1) {
        articles.value.splice(index, 1)
      }

      if (articleDetail.value && articleDetail.value.id === id) {
        articleDetail.value = null
      }

      return true
    } catch (error) {
      console.error('删除文章失败:', error)
      throw error
    }
  }

  // 点赞/取消点赞文章
  const toggleLikeArticle = async (id: number) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 200))

      const article = articles.value.find(a => a.id === id)
      if (article) {
        if (articleDetail.value && articleDetail.value.id === id) {
          const wasLiked = articleDetail.value.isLiked
          articleDetail.value.isLiked = !wasLiked
          articleDetail.value.likeCount += wasLiked ? -1 : 1
        }

        // 这里应该调用API更新点赞状态
      }

      return true
    } catch (error) {
      console.error('操作点赞失败:', error)
      throw error
    }
  }

  // 收藏/取消收藏文章
  const toggleCollectArticle = async (id: number) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 200))

      if (articleDetail.value && articleDetail.value.id === id) {
        const wasCollected = articleDetail.value.isCollected
        articleDetail.value.isCollected = !wasCollected
        articleDetail.value.collectCount += wasCollected ? -1 : 1
      }

      return true
    } catch (error) {
      console.error('操作收藏失败:', error)
      throw error
    }
  }

  // 获取分类列表
  const fetchCategories = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300))
      return categories.value
    } catch (error) {
      console.error('获取分类失败:', error)
      throw error
    }
  }

  // 获取标签列表
  const fetchTags = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300))
      return tags.value
    } catch (error) {
      console.error('获取标签失败:', error)
      throw error
    }
  }

  // 清空文章详情
  const clearArticleDetail = () => {
    articleDetail.value = null
  }

  // 重置查询参数
  const resetQueryParams = () => {
    queryParams.value = {
      page: 1,
      pageSize: 10,
      sortBy: 'createdAt',
      sortOrder: 'desc'
    }
  }

  return {
    // 状态
    articles,
    articleDetail,
    categories,
    tags,
    pagination,
    queryParams,
    loading,
    detailLoading,

    // 计算属性
    totalArticles,
    currentPage,
    pageSize,
    totalPages,

    // 方法
    fetchArticles,
    fetchArticleDetail,
    createArticle,
    updateArticle,
    deleteArticle,
    toggleLikeArticle,
    toggleCollectArticle,
    fetchCategories,
    fetchTags,
    clearArticleDetail,
    resetQueryParams
  }
})