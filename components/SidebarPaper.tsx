'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Hash, Bell, Bookmark, User, Coffee } from 'lucide-react'

export default function SidebarPaper() {
  const pathname = usePathname()

  const navigation = [
    { name: 'Home', href: '/timeline', icon: Home },
    { name: 'Explore', href: '/explore', icon: Hash },
    { name: 'Notifications', href: '/notifications', icon: Bell },
    { name: 'Bookmarks', href: '/bookmarks', icon: Bookmark },
    { name: 'Profile', href: '/profile', icon: User },
  ]

  return (
    <div className="sticky top-8">
      <div className="paper-card dark:paper-card-dark rounded-lg noise-texture relative overflow-hidden">
        {/* Teapot stain in corner */}
        <div className="teapot-stain dark:teapot-stain-dark" style={{ top: '-20px', right: '-20px', width: '80px', height: '80px' }} />
        
        <div className="p-6 relative z-10">
          {/* Logo */}
          <div className="flex items-center space-x-3 mb-8">
            <div className="relative">
              <Coffee className="w-10 h-10 text-amber-700 dark:text-amber-300" />
              {/* Steam animation */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                <div className="w-2 h-2 bg-amber-400/30 rounded-full teapot-steam" />
                <div className="w-2 h-2 bg-amber-400/20 rounded-full teapot-steam" style={{ animationDelay: '1s' }} />
                <div className="w-2 h-2 bg-amber-400/10 rounded-full teapot-steam" style={{ animationDelay: '2s' }} />
              </div>
            </div>
            <span className="text-2xl font-bold text-amber-900 dark:text-amber-100 handwritten">
              0x1A2
            </span>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-amber-100 dark:bg-amber-900/20 text-amber-900 dark:text-amber-100 shadow-sm'
                      : 'text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/10'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                  {isActive && (
                    <div className="ml-auto w-1 h-1 bg-amber-600 dark:bg-amber-400 rounded-full" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Paper fold decoration */}
          <div className="paper-fold my-6" />

          {/* Compose Button */}
          <button className="w-full py-3 px-4 bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-600 text-white font-bold rounded-lg transition-colors shadow-sm">
            Brew a Post
          </button>

          {/* User info / Login prompt */}
          <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-900/10 rounded-lg">
            <p className="text-sm text-amber-700 dark:text-amber-300 handwritten">
              "I'm a teapot, short and stout..."
            </p>
            <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">
              Error 418 • Paper Edition
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 