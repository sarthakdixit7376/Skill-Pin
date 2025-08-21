import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import configServices from '../Appwrite/config.js'

function Home() {

  const [posts,setPosts]=useState([]);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    try {
      configServices.getPosts().then((post)=>{
      if(post && post.documents )
        setPosts(post.documents)
    })
    }

    catch (error) {
      throw error
    }
    finally{
      setLoading(false)
    }
    
    },[])
  
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
              posts.map(post => (
                <div key={post.$id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-500">date</span>
                      <span className="text-sm text-gray-500">{post.creatorId}</span>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mb-4">
                      {post.description}
                    </p>
                    <Link
                      to={`/post/${post.$id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Read more →
                    </Link>
                  </div>
                </div>
              ))
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
