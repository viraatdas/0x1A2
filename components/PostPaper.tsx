'use client'

import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { Heart, MessageCircle, Repeat2, Share, Bookmark } from 'lucide-react'

interface PostPaperProps {
  post: any
  currentUserId: string
}

export default function PostPaper({ post }: PostPaperProps) {
  const [isLiked, setIsLiked] = useState(post.hasLiked)
  const [likesCount, setLikesCount] = useState(post.likesCount)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1)
  }

  // Generate avatar colors based on username
  const getAvatarColor = (username: string) => {
    const colors = [
      'bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200',
      'bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200',
      'bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200',
      'bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200',
      'bg-pink-200 dark:bg-pink-800 text-pink-800 dark:text-pink-200',
    ]
    const index = username.charCodeAt(0) % colors.length
    return colors[index]
  }

  return (
    <article className="p-6 hover:bg-amber-50/50 dark:hover:bg-amber-900/5 transition-colors relative">
      <div className="flex space-x-4">
        {/* Avatar */}
        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${getAvatarColor(post.author.username)}`}>
          {post.author.display_name?.[0]?.toUpperCase() || '?'}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-1 flex-wrap">
              <span className="font-bold text-amber-900 dark:text-amber-100">
                {post.author.display_name}
              </span>
              <span className="text-amber-600 dark:text-amber-400">·</span>
              <span className="text-amber-600 dark:text-amber-400">
                @{post.author.username}
              </span>
              <span className="text-amber-600 dark:text-amber-400">·</span>
              <time className="text-amber-600 dark:text-amber-400 text-sm">
                {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
              </time>
            </div>
            
            <button className="text-amber-600 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-200">
              <Bookmark className="w-4 h-4" />
            </button>
          </div>

          {/* Post Content */}
          <div className="mb-4">
            <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-words leading-relaxed">
              {post.content}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between max-w-md">
            {/* Reply */}
            <button className="flex items-center space-x-2 text-amber-600 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-200 transition-colors group">
              <div className="p-2 rounded-full group-hover:bg-amber-100 dark:group-hover:bg-amber-900/20">
                <MessageCircle className="w-4 h-4" />
              </div>
              <span className="text-sm">{post.repliesCount || 0}</span>
            </button>

            {/* Repost */}
            <button className="flex items-center space-x-2 text-amber-600 hover:text-green-600 dark:text-amber-400 dark:hover:text-green-400 transition-colors group">
              <div className="p-2 rounded-full group-hover:bg-green-100 dark:group-hover:bg-green-900/20">
                <Repeat2 className="w-4 h-4" />
              </div>
              <span className="text-sm">{post.repostsCount || 0}</span>
            </button>

            {/* Like */}
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 transition-colors group ${
                isLiked
                  ? 'text-red-600 dark:text-red-400'
                  : 'text-amber-600 hover:text-red-600 dark:text-amber-400 dark:hover:text-red-400'
              }`}
            >
              <div className="p-2 rounded-full group-hover:bg-red-100 dark:group-hover:bg-red-900/20">
                <Heart
                  className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`}
                />
              </div>
              <span className="text-sm">{likesCount}</span>
            </button>

            {/* Share */}
            <button className="flex items-center space-x-2 text-amber-600 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-200 transition-colors group">
              <div className="p-2 rounded-full group-hover:bg-amber-100 dark:group-hover:bg-amber-900/20">
                <Share className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </article>
  )
} 