import { useState } from 'react'
import Nav from '../Components/Elements/Nav'

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all')

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      category: "web",
      image: "https://via.placeholder.com/400x300",
      description: "A full-featured e-commerce solution with shopping cart and payment integration",
      technologies: ["React", "Node.js", "MongoDB"]
    },
    {
      id: 2, 
      title: "Mobile Banking App",
      category: "mobile",
      image: "https://via.placeholder.com/400x300",
      description: "Secure mobile banking application with real-time transactions",
      technologies: ["React Native", "Firebase"]
    },
    {
      id: 3,
      title: "AI Image Recognition",
      category: "ai",
      image: "https://via.placeholder.com/400x300", 
      description: "Machine learning model for image classification and object detection",
      technologies: ["Python", "TensorFlow", "OpenCV"]
    }
  ]

  const filterProjects = (category) => {
    return category === 'all' 
      ? projects
      : projects.filter(project => project.category === category)
  }

  return (
    <>
    <Nav />
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" id='portfolio'>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900">Our Portfolio</h2>
          <p className="mt-4 text-lg text-gray-600">
            Check out some of our recent projects
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-12">
          {['all', 'web', 'mobile', 'ai'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full ${
                activeFilter === filter
                  ? 'bg-[#0A647A] text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } transition-colors duration-300`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filterProjects(activeFilter).map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#0A647A] mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
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

export default Portfolio
