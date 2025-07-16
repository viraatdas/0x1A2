'use client'

import { useState, useRef, useEffect } from 'react'
import { X, Send, Coffee } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ComposeModalPaperProps {
  isOpen: boolean
  onClose: () => void
}

export default function ComposeModalPaper({ isOpen, onClose }: ComposeModalPaperProps) {
  const [content, setContent] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [isOpen])

  const handleSubmit = () => {
    if (!content.trim()) return
    
    // Just close for now since we're not connected to a database
    setContent('')
    onClose()
  }

  const remainingChars = 280 - content.length

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-x-4 top-20 max-w-2xl mx-auto z-50"
          >
            <div className="paper-card dark:paper-card-dark rounded-lg noise-texture relative overflow-hidden">
              {/* Coffee ring stain */}
              <div className="coffee-ring dark:coffee-ring-dark" style={{ top: '40px', right: '40px', width: '100px', height: '100px' }} />
              
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-amber-100 dark:border-amber-900/20 relative z-10">
                <div className="flex items-center space-x-3">
                  <Coffee className="w-6 h-6 text-amber-700 dark:text-amber-300" />
                  <h2 className="text-xl font-bold text-amber-900 dark:text-amber-100 handwritten">
                    Brew a thought...
                  </h2>
                </div>
                
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-amber-100 dark:hover:bg-amber-900/20 rounded-full transition-colors text-amber-700 dark:text-amber-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 relative z-10">
                <textarea
                  ref={textareaRef}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="What's steeping in your mind?"
                  className="w-full h-40 resize-none outline-none text-lg text-gray-800 dark:text-gray-200 placeholder-amber-400 dark:placeholder-amber-600 bg-transparent handwritten leading-relaxed"
                  style={{ letterSpacing: '0.02em' }}
                />
                
                {/* Paper lines */}
                <div className="absolute inset-0 pointer-events-none opacity-10">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="border-b border-amber-300 dark:border-amber-700"
                      style={{ marginTop: `${i * 24 + 24}px` }}
                    />
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between p-6 border-t border-amber-100 dark:border-amber-900/20 relative z-10">
                <span
                  className={`text-sm ${
                    remainingChars < 20
                      ? remainingChars < 0
                        ? 'text-red-600'
                        : 'text-yellow-600'
                      : 'text-amber-600 dark:text-amber-400'
                  }`}
                >
                  {remainingChars} leaves left
                </span>
                
                <button
                  onClick={handleSubmit}
                  disabled={!content.trim() || remainingChars < 0}
                  className="flex items-center space-x-2 px-6 py-2 bg-amber-600 dark:bg-amber-700 text-white rounded-full hover:bg-amber-700 dark:hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <span className="font-medium">Steep</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
} 