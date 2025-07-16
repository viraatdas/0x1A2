'use client'

import { useState } from 'react'
import PostPaper from './PostPaper'

// Mock data for demonstration
const mockPosts = [
  {
    id: '1',
    author: {
      id: '1',
      username: 'teapoet',
      display_name: 'The Tea Poet',
      avatar_url: null
    },
    content: 'Just discovered that my teapot has been writing haikus while I sleep. The steam carries whispers of Earl Grey dreams. 🍵✨',
    created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
    hasLiked: false,
    likesCount: 42,
    repostsCount: 7,
    repliesCount: 3
  },
  {
    id: '2',
    author: {
      id: '2',
      username: 'brewmaster',
      display_name: 'Brew Master',
      avatar_url: null
    },
    content: 'HTTP 418: I\'m a teapot.\n\nBut what if I told you... I\'m also a philosopher? 🫖',
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    hasLiked: true,
    likesCount: 156,
    repostsCount: 23,
    repliesCount: 12
  },
  {
    id: '3',
    author: {
      id: '3',
      username: 'paperlover',
      display_name: 'Paper & Ink',
      avatar_url: null
    },
    content: 'The best ideas come on napkins at 3am, stained with tea rings and scribbled with borrowed pens. That\'s where magic lives.',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    hasLiked: false,
    likesCount: 89,
    repostsCount: 15,
    repliesCount: 8
  },
  {
    id: '4',
    author: {
      id: '4',
      username: 'zenteapot',
      display_name: 'Zen Teapot',
      avatar_url: null
    },
    content: 'Today I learned:\n\n• Tea leaves can predict the future\n• Teapots have souls\n• Paper remembers everything\n• Coffee machines are jealous of our 418 status',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    hasLiked: true,
    likesCount: 234,
    repostsCount: 45,
    repliesCount: 19
  },
  {
    id: '5',
    author: {
      id: '5',
      username: 'inkstains',
      display_name: 'Ink & Stains',
      avatar_url: null
    },
    content: 'Found an old journal in a secondhand bookshop. The pages smell like chamomile and secrets. Every tea stain tells a story. 📜☕',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), // 8 hours ago
    hasLiked: false,
    likesCount: 167,
    repostsCount: 28,
    repliesCount: 14
  }
]

export default function TimelinePaper() {
  const [posts] = useState(mockPosts)

  return (
    <div className="divide-y divide-amber-100 dark:divide-amber-900/20">
      {posts.map((post) => (
        <PostPaper key={post.id} post={post} currentUserId="demo" />
      ))}
      
      {/* End of timeline message */}
      <div className="p-8 text-center">
        <div className="inline-block relative">
          <p className="text-amber-600 dark:text-amber-400 handwritten text-lg">
            You've reached the bottom of the teapot
          </p>
          <div className="teapot-stain dark:teapot-stain-dark" style={{ bottom: '-20px', right: '-20px', width: '80px', height: '80px' }} />
        </div>
      </div>
    </div>
  )
} 