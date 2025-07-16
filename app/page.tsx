'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Coffee, Users, Lock, Sparkles } from 'lucide-react'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast'

export default function LandingPage() {
  const [email, setEmail] = useState('')
  const [reason, setReason] = useState('')
  const [portfolioLink, setPortfolioLink] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleRequestInvite = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || (!reason && !portfolioLink)) {
      toast.error('Please provide either a reason or a portfolio link')
      return
    }

    setIsSubmitting(true)
    
    try {
      // TODO: Implement invite request submission
      toast.success('Your request has been submitted! We\'ll review it soon.')
      setEmail('')
      setReason('')
      setPortfolioLink('')
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Toaster position="top-center" />
      
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-2"
        >
          <Coffee className="w-8 h-8 text-purple-300" />
          <span className="text-2xl font-bold text-white">0x1A2</span>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link
            href="/auth/login"
            className="px-6 py-2 text-white bg-purple-600 rounded-full hover:bg-purple-700 transition-colors"
          >
            Sign In
          </Link>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold text-white mb-4">
            I'm a teapot
          </h1>
          <p className="text-2xl text-purple-200 mb-8">
            418: This exclusive social platform cannot brew coffee
          </p>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            0x1A2 is an invite-only social platform where ideas steep and conversations percolate. 
            Like a teapot that refuses to make coffee, we're selective about what we serve.
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center">
            <Lock className="w-12 h-12 text-purple-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Invite Only</h3>
            <p className="text-gray-300">
              Quality over quantity. Every member is carefully selected.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center">
            <Users className="w-12 h-12 text-purple-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Curated Community</h3>
            <p className="text-gray-300">
              Connect with creators, thinkers, and builders who share your passions.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center">
            <Sparkles className="w-12 h-12 text-purple-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Real Conversations</h3>
            <p className="text-gray-300">
              No algorithms, no ads, just authentic human connections.
            </p>
          </div>
        </motion.div>

        {/* Request Invite Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              Don't have an account?
            </h2>
            <p className="text-gray-300 text-center mb-8">
              Tell us why you should be allowed in, or share something amazing you've created.
            </p>
            
            <form onSubmit={handleRequestInvite} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-white mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                  placeholder="your@email.com"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="reason" className="block text-white mb-2">
                  Why should you be allowed? (Optional if you provide a portfolio)
                </label>
                <textarea
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 resize-none"
                  placeholder="Tell us what makes you special..."
                />
              </div>
              
              <div>
                <label htmlFor="portfolio" className="block text-white mb-2">
                  Portfolio / Something you've created (Optional if you provide a reason)
                </label>
                <input
                  type="url"
                  id="portfolio"
                  value={portfolioLink}
                  onChange={(e) => setPortfolioLink(e.target.value)}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                  placeholder="https://..."
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Request Invite'}
              </button>
            </form>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16 text-gray-400"
        >
          <p>0x1A2 · HTTP 418 · I refuse to brew coffee because I am, permanently, a teapot.</p>
        </motion.footer>
      </main>
    </div>
  )
}
