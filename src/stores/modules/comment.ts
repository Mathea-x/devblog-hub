import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Comment, CommentForm } from '@/types/article'
import { mockComments } from '@/mock/data'

export const useCommentStore = defineStore('comment', () => {
  // 状态
  const comments = ref<Comment[]>([])
  const loading = ref(false)
  const submitting = ref(false)

  // 获取文章评论
  const fetchComments = async (articleId: number) => {
    loading.value = true

    try {
      await new Promise(resolve => setTimeout(resolve, 300))

      // 模拟数据：获取指定文章的评论
      const articleComments = mockComments.filter(c => c.articleId === articleId)

      // 构建评论树（处理回复关系）
      const commentMap = new Map<number, Comment>()
      const rootComments: Comment[] = []

      articleComments.forEach(comment => {
        commentMap.set(comment.id, { ...comment, replies: [] })
      })

      articleComments.forEach(comment => {
        const commentWithReplies = commentMap.get(comment.id)!
        if (comment.parentId) {
          const parent = commentMap.get(comment.parentId)
          if (parent) {
            if (!parent.replies) parent.replies = []
            parent.replies.push(commentWithReplies)
          }
        } else {
          rootComments.push(commentWithReplies)
        }
      })

      comments.value = rootComments
      return rootComments
    } catch (error) {
      console.error('获取评论失败:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  // 发表评论
  const createComment = async (form: CommentForm) => {
    submitting.value = true

    try {
      await new Promise(resolve => setTimeout(resolve, 300))

      const newComment: Comment = {
        id: Date.now(),
        articleId: form.articleId,
        userId: 1, // 当前用户ID
        userName: '当前用户',
        userAvatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        content: form.content,
        parentId: form.parentId,
        replyTo: form.replyTo,
        likeCount: 0,
        isLiked: false,
        createdAt: new Date().toISOString()
      }

      if (form.parentId) {
        // 找到父评论并添加到回复中
        const addReplyToComment = (commentList: Comment[]): boolean => {
          for (const comment of commentList) {
            if (comment.id === form.parentId) {
              if (!comment.replies) comment.replies = []
              comment.replies.push(newComment)
              return true
            }
            if (comment.replies && comment.replies.length > 0) {
              if (addReplyToComment(comment.replies)) return true
            }
          }
          return false
        }

        addReplyToComment(comments.value)
      } else {
        comments.value.push(newComment)
      }

      return newComment
    } catch (error) {
      console.error('发表评论失败:', error)
      throw error
    } finally {
      submitting.value = false
    }
  }

  // 删除评论
  const deleteComment = async (commentId: number) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 200))

      const removeComment = (commentList: Comment[]): boolean => {
        const index = commentList.findIndex(c => c.id === commentId)
        if (index !== -1) {
          commentList.splice(index, 1)
          return true
        }

        for (const comment of commentList) {
          if (comment.replies && comment.replies.length > 0) {
            if (removeComment(comment.replies)) return true
          }
        }

        return false
      }

      removeComment(comments.value)
      return true
    } catch (error) {
      console.error('删除评论失败:', error)
      throw error
    }
  }

  // 点赞/取消点赞评论
  const toggleLikeComment = async (commentId: number) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 200))

      const toggle = (commentList: Comment[]): boolean => {
        const comment = commentList.find(c => c.id === commentId)
        if (comment) {
          comment.isLiked = !comment.isLiked
          comment.likeCount += comment.isLiked ? 1 : -1
          return true
        }

        for (const c of commentList) {
          if (c.replies && c.replies.length > 0) {
            if (toggle(c.replies)) return true
          }
        }

        return false
      }

      toggle(comments.value)
      return true
    } catch (error) {
      console.error('操作评论点赞失败:', error)
      throw error
    }
  }

  // 清空评论
  const clearComments = () => {
    comments.value = []
  }

  return {
    // 状态
    comments,
    loading,
    submitting,

    // 方法
    fetchComments,
    createComment,
    deleteComment,
    toggleLikeComment,
    clearComments
  }
})