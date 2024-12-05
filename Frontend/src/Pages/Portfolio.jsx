import { useState } from 'react'
import Nav from '../Components/Elements/Nav'
import StarBackground from '../Components/Elements/StarBackground'

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
      <StarBackground />
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden" id='portfolio'>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#0A647A] to-[#0c8aa8] mb-6 animate-gradient">Our Portfolio</h2>
            <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
              Check out some of our recent projects
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {['all', 'web', 'mobile', 'ai'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 ${
                  activeFilter === filter
                    ? 'bg-gradient-to-r from-[#0A647A] to-[#0c8aa8] text-white shadow-lg shadow-[#0A647A]/30 border border-[#0A647A]/50'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/70 backdrop-blur-sm border border-gray-700/50 hover:border-[#0A647A]/30'
                }`}
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
                className="group bg-gray-800/30 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:transform hover:scale-[1.02] border border-gray-700/50 hover:border-[#0A647A]/50"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {project.title}
                        </h3>
                        <p className="text-gray-300 text-sm">
                          Click to view details
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-8 relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#0A647A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0A647A] to-[#0c8aa8] mb-4 group-hover:text-white transition-colors duration-300 relative">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-6 relative">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 relative">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-[#0A647A]/10 to-[#0c8aa8]/10 text-gray-300 border border-[#0A647A]/20 rounded-lg backdrop-blur-sm hover:text-white hover:border-[#0A647A]/50 hover:bg-gradient-to-r hover:from-[#0A647A]/20 hover:to-[#0c8aa8]/20 transform hover:scale-105 hover:-translate-y-0.5 transition-all duration-300 shadow-sm hover:shadow-md"
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
