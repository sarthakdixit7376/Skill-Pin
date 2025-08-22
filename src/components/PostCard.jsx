import React from 'react'
import { Link } from 'react-router-dom'
import configServices from '../Appwrite/config'


function PostCard({ post , user }) {
  const handleDelete = async ()=>{
try {
  await configServices.deleteDocument(post.$id)
  console.log("deleted")
  window.location.reload()
} catch (error) {
  throw error
}
    
  }
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          
          <span className="text-sm text-gray-500">{post.creatorName}</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {post.title}
        </h2>
        <div className='w-full justify-centre mb-4'>
            <img src={configServices.getFilePreview(post.coverFileId)} alt={post.title} className='rounded-xl'/>
        </div>
        <p className="text-gray-600 mb-4">{post.description}</p>
        <Link
          to={`/post/${post.$id}`}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Steps →
        </Link>
        {user && user.$id === post.creatorId && (<div className='flex flex-row justify-end' >
            <button className='bg-red-600 text-white px-2 py-1 hover:bg-red-800 rounded-xl m-1' onClick={handleDelete}>Delete</button>
            <button className='bg-gray-600 text-white px-2 py-1 hover:bg-gray-800 rounded-xl m-1'>Edit</button>
          </div>)}
      </div>
    </div>
  )
}

export default PostCard
