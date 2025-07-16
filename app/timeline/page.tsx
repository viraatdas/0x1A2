import TimelinePaper from '@/components/TimelinePaper'
import SidebarPaper from '@/components/SidebarPaper'
import ComposeButtonPaper from '@/components/ComposeButtonPaper'
import '../paper-theme.css'

export default function TimelinePage() {
  return (
    <div className="min-h-screen paper-texture dark:paper-texture-dark relative overflow-hidden">
      {/* Teapot stains scattered around */}
      <div className="teapot-stain dark:teapot-stain-dark" style={{ top: '10%', left: '5%' }} />
      <div className="coffee-ring dark:coffee-ring-dark" style={{ top: '80%', right: '10%' }} />
      <div className="teapot-stain dark:teapot-stain-dark" style={{ bottom: '20%', left: '70%' }} />
      <div className="ink-splatter" style={{ top: '60%', left: '15%' }} />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 px-4 py-8 relative z-10">
        {/* Sidebar - Desktop */}
        <div className="hidden lg:block lg:col-span-1">
          <SidebarPaper />
        </div>

        {/* Main Content */}
        <main className="lg:col-span-2">
          <div className="paper-card dark:paper-card-dark rounded-lg noise-texture relative overflow-hidden">
            {/* Small coffee ring on the card */}
            <div className="coffee-ring dark:coffee-ring-dark" style={{ top: '20px', right: '20px', width: '60px', height: '60px' }} />
            
            <div className="border-b border-amber-100 dark:border-amber-900/20 p-6 relative z-10">
              <h1 className="text-3xl font-bold text-amber-900 dark:text-amber-100 handwritten">
                Timeline
              </h1>
              <p className="text-amber-700 dark:text-amber-300 mt-1">
                Fresh thoughts from the teapot community
              </p>
            </div>
            
            <TimelinePaper />
          </div>
        </main>

        {/* Right Sidebar - Desktop */}
        <aside className="hidden lg:block lg:col-span-1 space-y-6">
          <div className="paper-card dark:paper-card-dark rounded-lg p-6 noise-texture relative">
            <h2 className="font-bold text-amber-900 dark:text-amber-100 mb-4 handwritten text-xl">
              Today's Special ✨
            </h2>
            <div className="space-y-3 text-amber-700 dark:text-amber-300">
              <p className="text-sm">☕ Morning brew discussions</p>
              <p className="text-sm">🫖 Teapot philosophy</p>
              <p className="text-sm">📜 Paper thoughts</p>
            </div>
            <div className="paper-fold mt-4" />
            <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">
              Error 418: Still refusing to brew coffee
            </p>
          </div>
          
          <div className="paper-card dark:paper-card-dark rounded-lg p-6 noise-texture relative torn-edge-top">
            <h2 className="font-bold text-amber-900 dark:text-amber-100 mb-4 handwritten text-xl">
              Community Teapots 🫖
            </h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-amber-200 dark:bg-amber-800 rounded-full flex items-center justify-center">
                  <span className="text-amber-800 dark:text-amber-200 font-bold">E</span>
                </div>
                <div>
                  <p className="font-medium text-amber-900 dark:text-amber-100">Earl Grey</p>
                  <p className="text-sm text-amber-600 dark:text-amber-400">@earlgrey</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-200 dark:bg-green-800 rounded-full flex items-center justify-center">
                  <span className="text-green-800 dark:text-green-200 font-bold">M</span>
                </div>
                <div>
                  <p className="font-medium text-amber-900 dark:text-amber-100">Matcha Maven</p>
                  <p className="text-sm text-amber-600 dark:text-amber-400">@matchalatte</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Mobile Compose Button */}
      <ComposeButtonPaper />
    </div>
  )
} 