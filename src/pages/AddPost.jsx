import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import configServices from '../Appwrite/config'
import authServices from '../Appwrite/auth'

function AddPost() {
  const [loading,setLoading]=useState(false);
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: null
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true);
    try {
      let fileId = null
      if (formData.image) {
        const uploaded = await configServices.uploadFile(formData.image)
        fileId = uploaded.$id
      }

      const user = await authServices.getCurrentUser()

      const post = await configServices.createPin({
        title: formData.title,
        description: formData.content,
        creatorId: user.$id,
        status: "active",
        coverFileId: fileId,
        creatorName:user.name,
        likes:"0",
      })

      navigate("/")
    } catch (err) {
      console.error("Error creating post:", err)
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Create a New Post
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              placeholder="Enter post title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <textarea
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              rows={6}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              placeholder="Write your post content..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image
            </label>
            <input
              type="file"
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.files[0] })
              }
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              accept="image/*"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded-md text-sm font-medium text-white ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
              disabled= {loading}
            >
              {loading ? "Creating..":"Create Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddPost
