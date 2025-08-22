import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import configServices from '../Appwrite/config.js'
import authService from '../Appwrite/auth.js';
import {PostCard} from '../components/index.js'
function Home() {

  const [posts,setPosts]=useState([]);
  const [loading,setLoading]=useState(true);
  const [user,setUser]=useState("");

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postRes = await configServices.getPosts()
        if (postRes && postRes.documents) {
          setPosts(postRes.documents)
        }
        const userRes = await authService.getCurrentUser()
        setUser(userRes)
      } catch (error) {
        console.error("Error loading data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <p className="text-lg text-gray-600">Loading posts...</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Welcome to SkillPin
              </h1>
              <p className="text-xl text-gray-600">
                Discover and share amazing skills with the community
              </p>
              
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.length > 0 ? (
                posts.map((post) => <PostCard key={post.$id} post={post} />)
              ) : (
                <p className="text-gray-500 text-center col-span-full">
                  No posts available. Be the first to share your skill!
                </p>
              )}
            </div>

            <div className="text-center mt-12">
              <Link
                to="/add-pin"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Share Your Skill
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Home
