'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, User, Settings, LogOut, Coffee, Hash, Bell } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface SidebarProps {
  profile: any
}

export default function Sidebar({ profile }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const navigation = [
    { name: 'Home', href: '/home', icon: Home },
    { name: 'Explore', href: '/explore', icon: Hash },
    { name: 'Notifications', href: '/notifications', icon: Bell },
    { name: 'Profile', href: `/profile/${profile?.username}`, icon: User },
    { name: 'Settings', href: '/settings', icon: Settings },
  ]

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      toast.error('Failed to log out')
    } else {
      router.push('/')
    }
  }

  return (
    <div className="sticky top-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
        {/* Logo */}
        <div className="flex items-center space-x-2 mb-8">
          <Coffee className="w-8 h-8 text-purple-600" />
          <span className="text-2xl font-bold text-gray-900 dark:text-white">0x1A2</span>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            )
          })}

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Log out</span>
          </button>
        </nav>

        {/* User Info */}
        {profile && (
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">
                  {profile.display_name?.[0]?.toUpperCase() || '?'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {profile.display_name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  @{profile.username}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 