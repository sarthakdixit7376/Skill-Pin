import React from 'react'
import { Link } from 'react-router-dom'

function PostCard({ post }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-500">date</span>
          <span className="text-sm text-gray-500">{post.$id}</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {post.title}
        </h2>
        <p className="text-gray-600 mb-4">{post.description}</p>
        <Link
          to={`/post/${post.$id}`}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Read more →
        </Link>
      </div>
    </div>
  )
}

export default PostCard
