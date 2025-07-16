'use client'

import { useState } from 'react'
import { PenTool } from 'lucide-react'
import ComposeModalPaper from './ComposeModalPaper'

export default function ComposeButtonPaper() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-amber-600 dark:bg-amber-700 text-white rounded-full shadow-lg hover:bg-amber-700 dark:hover:bg-amber-600 transition-all flex items-center justify-center group"
        aria-label="Compose new post"
      >
        <PenTool className="w-6 h-6 group-hover:rotate-12 transition-transform" />
        {/* Ink drip effect */}
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-3 bg-amber-600 dark:bg-amber-700 rounded-b-full opacity-50" />
      </button>

      {/* Compose Modal */}
      <ComposeModalPaper isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
} 