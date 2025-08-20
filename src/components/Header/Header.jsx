import React, { useState, useEffect } from 'react'
import authService from '../../Appwrite/auth'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import LogoutBtn from './LogoutBtn'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navList = [
    {
      name: 'Home',
      slug: '/',
      active: authStatus,
      icon: '🏠'
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus,
      icon: '🔑'
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus,
      icon: '✍️'
    },
    {
      name: 'All Posts',
      slug: '/all-pin',
      active: authStatus,
      icon: '📌'
    },
    {
      name: 'Add Post',
      slug: '/add-pin',
      active: authStatus,
      icon: '➕'
    },
  ]

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg' 
          : 'bg-gray-900'
      }`}
    >
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent group-hover:to-blue-300 transition-all duration-300">
              SkillPin
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navList.map((item) =>
              item.active ? (
                <button
                  key={item.name}
                  onClick={() => navigate(item.slug)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 transform hover:scale-105
                    ${location.pathname === item.slug
                      ? 'bg-blue-500/10 text-blue-400'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                    }`}
                >
                  <span className="flex items-center space-x-2">
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.name}</span>
                  </span>
                </button>
              ) : null
            )}
          </div>

          <div className="flex items-center space-x-4">
            {authStatus && <LogoutBtn />}
            
            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              <svg 
                className={`h-6 w-6 transition-transform duration-200 ${isMenuOpen ? 'rotate-90' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d={isMenuOpen 
                    ? "M6 18L18 6M6 6l12 12" 
                    : "M4 6h16M4 12h16M4 18h16"
                  } 
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navList.map((item) =>
              item.active ? (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.slug)
                    setIsMenuOpen(false)
                  }}
                  className={`block w-full text-left px-4 py-3 text-base font-medium rounded-lg transition-all duration-200
                    ${location.pathname === item.slug
                      ? 'bg-blue-500/10 text-blue-400'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                    }`}
                >
                  <span className="flex items-center space-x-3">
                    <span className="text-xl">{item.icon}</span>
                    <span>{item.name}</span>
                  </span>
                </button>
              ) : null
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
