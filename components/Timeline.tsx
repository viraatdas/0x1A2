'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Post from './Post'
import { Loader2 } from 'lucide-react'

interface TimelineProps {
  userId: string
}

export default function Timeline({ userId }: TimelineProps) {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchPosts()

    // Subscribe to real-time updates
    const channel = supabase
      .channel('posts')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'posts',
        },
        (payload) => {
          fetchPosts()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          author:profiles!author_id(
            id,
            username,
            display_name,
            avatar_url
          ),
          likes(count),
          reposts:posts!repost_of(count),
          replies:posts!parent_id(count)
        `)
        .is('parent_id', null)
        .order('created_at', { ascending: false })
        .limit(50)

      if (error) throw error

      // Check if current user has liked each post
      if (data) {
        const postsWithLikes = await Promise.all(
          data.map(async (post) => {
            const { data: userLike } = await supabase
              .from('likes')
              .select('id')
              .eq('post_id', post.id)
              .eq('user_id', userId)
              .single()

            return {
              ...post,
              hasLiked: !!userLike,
              likesCount: post.likes?.[0]?.count || 0,
              repostsCount: post.reposts?.[0]?.count || 0,
              repliesCount: post.replies?.[0]?.count || 0,
            }
          })
        )
        setPosts(postsWithLikes)
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">
          No posts yet. Be the first to share something!
        </p>
      </div>
    )
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {posts.map((post) => (
        <Post key={post.id} post={post} currentUserId={userId} onUpdate={fetchPosts} />
      ))}
    </div>
  )
} 