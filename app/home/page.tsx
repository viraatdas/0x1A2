import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Timeline from '@/components/Timeline'
import Sidebar from '@/components/Sidebar'
import ComposeButton from '@/components/ComposeButton'

export default async function HomePage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/auth/login')
  }

  // Fetch user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-4 px-4">
        {/* Sidebar - Desktop */}
        <div className="hidden lg:block lg:col-span-1">
          <Sidebar profile={profile} />
        </div>

        {/* Main Content */}
        <main className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="border-b border-gray-200 dark:border-gray-700 p-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Home</h1>
            </div>
            
            <Timeline userId={user.id} />
          </div>
        </main>

        {/* Right Sidebar - Desktop */}
        <aside className="hidden lg:block lg:col-span-1">
          <div className="sticky top-4 space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
              <h2 className="font-bold text-gray-900 dark:text-white mb-4">Trending</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                No trends yet. Be the first to start one!
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
              <h2 className="font-bold text-gray-900 dark:text-white mb-4">Who to follow</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Discover new people in the teapot
              </p>
            </div>
          </div>
        </aside>
      </div>

      {/* Mobile Compose Button */}
      <ComposeButton />
    </div>
  )
} 