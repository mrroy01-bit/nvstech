import { useState } from 'react'
import Nav from '../Components/Elements/Nav'

const Blog = () => {
  const [posts] = useState([
    {
      id: 1,
      title: "Getting Started with Web Development",
      date: "June 15, 2023",
      excerpt: "Learn the fundamentals of web development and start your journey as a developer.",
      author: "John Doe",
      imageUrl: "https://placehold.co/600x400"
    },
    {
      id: 2, 
      title: "Best Practices for Modern Web Design",
      date: "June 10, 2023",
      excerpt: "Discover the latest trends and best practices in modern web design.",
      author: "Jane Smith",
      imageUrl: "https://placehold.co/600x400"
    },
    {
      id: 3,
      title: "Understanding React Fundamentals",
      date: "June 5, 2023",
      excerpt: "A comprehensive guide to understanding the core concepts of React.",
      author: "Mike Johnson",
      imageUrl: "https://placehold.co/600x400"
    }
  ])

  return (
    <>
    < Nav />
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" id='blog'>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Blog
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Latest articles, news, and updates from our team
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src={post.imageUrl} 
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500">
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <span>{post.author}</span>
                </div>
                <h3 className="mt-2 text-xl font-semibold text-gray-900">
                  {post.title}
                </h3>
                <p className="mt-3 text-base text-gray-500">
                  {post.excerpt}
                </p>
                <div className="mt-4">
                  <button className="text-[#0A647A] hover:text-[#085466] font-medium">
                    Read more →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  )
}

export default Blog
