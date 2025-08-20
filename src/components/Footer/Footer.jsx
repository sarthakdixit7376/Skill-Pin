import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="text-2xl font-bold text-blue-500">SkillPin</Link>
            <p className="mt-2 text-sm text-gray-400">Share your skills and inspire others.</p>
          </div>
          <div className="flex space-x-6">
            <Link to="/" className="text-gray-400 hover:text-blue-500 transition-colors">
              Home
            </Link>
            <Link to="/all-pin" className="text-gray-400 hover:text-blue-500 transition-colors">
              All Posts
            </Link>
            <Link to="/add-pin" className="text-gray-400 hover:text-blue-500 transition-colors">
              Add Post
            </Link>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} SkillPin. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
