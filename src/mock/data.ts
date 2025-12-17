import type { ArticleListItem, Category, Tag, Comment } from '@/types/article'

// 模拟分类数据
export const mockCategories: Category[] = [
  { id: 1, name: '前端开发', slug: 'frontend', description: '前端开发相关技术', articleCount: 12, createdAt: '2025-01-01' },
  { id: 2, name: '后端开发', slug: 'backend', description: '后端开发相关技术', articleCount: 8, createdAt: '2025-01-01' },
  { id: 3, name: '移动开发', slug: 'mobile', description: '移动应用开发', articleCount: 5, createdAt: '2025-01-01' },
  { id: 4, name: '人工智能', slug: 'ai', description: '人工智能与机器学习', articleCount: 7, createdAt: '2025-01-01' },
  { id: 5, name: '数据库', slug: 'database', description: '数据库技术', articleCount: 6, createdAt: '2025-01-01' },
  { id: 6, name: 'DevOps', slug: 'devops', description: '开发运维一体化', articleCount: 4, createdAt: '2025-01-01' }
]

// 模拟标签数据
export const mockTags: Tag[] = [
  { id: 1, name: 'Vue.js', color: '#42b883', articleCount: 8, createdAt: '2025-01-01' },
  { id: 2, name: 'TypeScript', color: '#3178c6', articleCount: 10, createdAt: '2025-01-01' },
  { id: 3, name: 'React', color: '#61dafb', articleCount: 6, createdAt: '2025-01-01' },
  { id: 4, name: 'Node.js', color: '#339933', articleCount: 7, createdAt: '2025-01-01' },
  { id: 5, name: 'Python', color: '#3776ab', articleCount: 9, createdAt: '2025-01-01' },
  { id: 6, name: 'Docker', color: '#2496ed', articleCount: 5, createdAt: '2025-01-01' },
  { id: 7, name: 'Kubernetes', color: '#326ce5', articleCount: 3, createdAt: '2025-01-01' },
  { id: 8, name: '微服务', color: '#ff6b6b', articleCount: 4, createdAt: '2025-01-01' }
]

// 模拟文章列表数据
export const mockArticles: ArticleListItem[] = [
  {
    id: 1,
    title: 'Vue 3 Composition API 完全指南',
    summary: '深入讲解Vue 3 Composition API的核心概念和使用技巧',
    coverImage: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    authorId: 1,
    authorName: '张三',
    authorAvatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    categoryId: 1,
    categoryName: '前端开发',
    tags: [mockTags[0], mockTags[1]],
    viewCount: 1250,
    likeCount: 86,
    commentCount: 24,
    publishedAt: '2025-10-15'
  },
  {
    id: 2,
    title: 'TypeScript 类型编程实战',
    summary: '通过实际案例学习TypeScript高级类型编程技巧',
    coverImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-1.2.1&auto=format&fit=crop&w-800&q=80',
    authorId: 2,
    authorName: '李四',
    authorAvatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    categoryId: 1,
    categoryName: '前端开发',
    tags: [mockTags[1]],
    viewCount: 980,
    likeCount: 72,
    commentCount: 18,
    publishedAt: '2025-10-10'
  },
  {
    id: 3,
    title: 'Node.js性能优化最佳实践',
    summary: '分享Node.js应用性能优化的实用技巧和工具',
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    authorId: 3,
    authorName: '王五',
    authorAvatar: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
    categoryId: 2,
    categoryName: '后端开发',
    tags: [mockTags[3]],
    viewCount: 1560,
    likeCount: 94,
    commentCount: 32,
    publishedAt: '2025-10-05'
  },
  {
    id: 4,
    title: 'Docker容器化部署全攻略',
    summary: '从零开始学习Docker容器化部署Web应用',
    coverImage: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    authorId: 1,
    authorName: '张三',
    authorAvatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    categoryId: 6,
    categoryName: 'DevOps',
    tags: [mockTags[5], mockTags[6]],
    viewCount: 2100,
    likeCount: 128,
    commentCount: 45,
    publishedAt: '2025-09-28'
  },
  {
    id: 5,
    title: '微服务架构设计模式',
    summary: '深入探讨微服务架构的常见设计模式和实践',
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    authorId: 2,
    authorName: '李四',
    authorAvatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    categoryId: 2,
    categoryName: '后端开发',
    tags: [mockTags[7]],
    viewCount: 1780,
    likeCount: 102,
    commentCount: 28,
    publishedAt: '2025-09-20'
  },
  {
    id: 6,
    title: 'React Hooks深入解析',
    summary: '深入理解React Hooks的工作原理和使用场景',
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    authorId: 3,
    authorName: '王五',
    authorAvatar: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
    categoryId: 1,
    categoryName: '前端开发',
    tags: [mockTags[2]],
    viewCount: 1320,
    likeCount: 78,
    commentCount: 21,
    publishedAt: '2025-09-15'
  },
  {
    id: 7,
    title: 'Python数据科学实战',
    summary: '使用Python进行数据分析与机器学习的完整流程',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    authorId: 1,
    authorName: '张三',
    authorAvatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    categoryId: 4,
    categoryName: '人工智能',
    tags: [mockTags[4]],
    viewCount: 1950,
    likeCount: 115,
    commentCount: 36,
    publishedAt: '2025-09-10'
  },
  {
    id: 8,
    title: '数据库索引优化原理',
    summary: '深入讲解数据库索引的工作原理和优化策略',
    coverImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    authorId: 2,
    authorName: '李四',
    authorAvatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    categoryId: 5,
    categoryName: '数据库',
    tags: [],
    viewCount: 1120,
    likeCount: 65,
    commentCount: 19,
    publishedAt: '2025-09-05'
  }
]

// 模拟评论数据
export const mockComments: Comment[] = [
  {
    id: 1,
    articleId: 1,
    userId: 2,
    userName: '李四',
    userAvatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    content: '这篇文章写得太好了，解决了我的很多疑问！',
    likeCount: 12,
    isLiked: false,
    createdAt: '2025-10-16 10:30:00'
  },
  {
    id: 2,
    articleId: 1,
    userId: 3,
    userName: '王五',
    userAvatar: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
    content: '能不能详细讲讲ref和reactive的区别？',
    likeCount: 5,
    isLiked: false,
    createdAt: '2025-10-16 11:45:00'
  },
  {
    id: 3,
    articleId: 1,
    userId: 1,
    userName: '张三',
    userAvatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    content: 'ref用于基本类型，reactive用于对象，两者都能实现响应式。',
    parentId: 2,
    replyTo: '王五',
    likeCount: 8,
    isLiked: false,
    createdAt: '2025-10-16 14:20:00'
  },
  {
    id: 4,
    articleId: 3,
    userId: 1,
    userName: '张三',
    userAvatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    content: 'Node.js的性能优化确实是个重要话题。',
    likeCount: 3,
    isLiked: false,
    createdAt: '2025-10-06 09:15:00'
  },
  {
    id: 5,
    articleId: 4,
    userId: 3,
    userName: '王五',
    userAvatar: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
    content: 'Docker部署确实很方便，学习了！',
    likeCount: 7,
    isLiked: false,
    createdAt: '2025-09-29 16:40:00'
  }
]