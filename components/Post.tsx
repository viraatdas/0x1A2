'use client'

import { useState } from 'react'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { Heart, MessageCircle, Repeat2, Share, MoreHorizontal } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'

interface PostProps {
  post: any
  currentUserId: string
  onUpdate: () => void
}

export default function Post({ post, currentUserId, onUpdate }: PostProps) {
  const [isLiking, setIsLiking] = useState(false)
  const supabase = createClient()

  const handleLike = async () => {
    if (isLiking) return
    setIsLiking(true)

    try {
      if (post.hasLiked) {
        // Unlike
        const { error } = await supabase
          .from('likes')
          .delete()
          .eq('post_id', post.id)
          .eq('user_id', currentUserId)

        if (error) throw error
      } else {
        // Like
        const { error } = await supabase
          .from('likes')
          .insert({
            post_id: post.id,
            user_id: currentUserId,
          })

        if (error) throw error
      }

      onUpdate()
    } catch (error) {
      toast.error('Failed to update like')
    } finally {
      setIsLiking(false)
    }
  }

  const handleRepost = async () => {
    try {
      const { error } = await supabase
        .from('posts')
        .insert({
          author_id: currentUserId,
          content: '',
          repost_of: post.id,
        })

      if (error) throw error
      
      toast.success('Reposted!')
      onUpdate()
    } catch (error) {
      toast.error('Failed to repost')
    }
  }

  return (
    <article className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      <div className="flex space-x-3">
        {/* Avatar */}
        <Link href={`/profile/${post.author.username}`}>
          <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center hover:opacity-90 transition-opacity">
            <span className="text-white font-bold">
              {post.author.display_name?.[0]?.toUpperCase() || '?'}
            </span>
          </div>
        </Link>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Link
                href={`/profile/${post.author.username}`}
                className="font-medium text-gray-900 dark:text-white hover:underline"
              >
                {post.author.display_name}
              </Link>
              <span className="text-gray-500 dark:text-gray-400">·</span>
              <Link
                href={`/profile/${post.author.username}`}
                className="text-gray-500 dark:text-gray-400 hover:underline"
              >
                @{post.author.username}
              </Link>
              <span className="text-gray-500 dark:text-gray-400">·</span>
              <time className="text-gray-500 dark:text-gray-400">
                {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
              </time>
            </div>
            
            <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>

          {/* Post Content */}
          <div className="mt-2">
            <p className="text-gray-900 dark:text-white whitespace-pre-wrap break-words">
              {post.content}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between mt-4 max-w-md">
            {/* Reply */}
            <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors group">
              <div className="p-2 rounded-full group-hover:bg-blue-100 dark:group-hover:bg-blue-900/20">
                <MessageCircle className="w-4 h-4" />
              </div>
              <span className="text-sm">{post.repliesCount || 0}</span>
            </button>

            {/* Repost */}
            <button
              onClick={handleRepost}
              className="flex items-center space-x-2 text-gray-500 hover:text-green-600 transition-colors group"
            >
              <div className="p-2 rounded-full group-hover:bg-green-100 dark:group-hover:bg-green-900/20">
                <Repeat2 className="w-4 h-4" />
              </div>
              <span className="text-sm">{post.repostsCount || 0}</span>
            </button>

            {/* Like */}
            <button
              onClick={handleLike}
              disabled={isLiking}
              className={`flex items-center space-x-2 transition-colors group ${
                post.hasLiked
                  ? 'text-red-600'
                  : 'text-gray-500 hover:text-red-600'
              }`}
            >
              <div className="p-2 rounded-full group-hover:bg-red-100 dark:group-hover:bg-red-900/20">
                <Heart
                  className={`w-4 h-4 ${post.hasLiked ? 'fill-current' : ''}`}
                />
              </div>
              <span className="text-sm">{post.likesCount || 0}</span>
            </button>

            {/* Share */}
            <button className="flex items-center space-x-2 text-gray-500 hover:text-purple-600 transition-colors group">
              <div className="p-2 rounded-full group-hover:bg-purple-100 dark:group-hover:bg-purple-900/20">
                <Share className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </article>
  )
} 