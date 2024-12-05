import { useState } from 'react'
import Nav from '../Components/Elements/Nav'
import StarBackground from '../Components/Elements/StarBackground'

const Service = () => {
  const [activeTab, setActiveTab] = useState('web')

  const services = {
    web: {
      title: "Web Development",
      description: "Custom web solutions built with modern technologies and best practices.",
      features: [
        "Responsive Design",
        "Frontend Development",
        "Backend Development", 
        "E-commerce Solutions",
        "CMS Integration"
      ]
    },
    app: {
      title: "App Development",
      description: "Native and cross-platform mobile applications for iOS and Android.",
      features: [
        "iOS Development",
        "Android Development",
        "Cross-platform Solutions",
        "App Maintenance",
        "App Store Optimization"
      ]
    },
    aws: {
      title: "AWS Cloud Services",
      description: "Scalable and secure cloud infrastructure solutions using Amazon Web Services.",
      features: [
        "Cloud Architecture",
        "Server Management",
        "Database Solutions",
        "Cloud Security",
        "Performance Optimization"
      ]
    }
  }

  return (
    <>
      <Nav />
      <StarBackground />
      <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden" id='service'>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#0A647A] to-[#0c8aa8] mb-4">Our Services</h1>
            <p className="text-lg text-gray-300">
              Comprehensive digital solutions for your business needs
            </p>
          </div>

          <div className="flex justify-center mb-12">
            <div className="flex space-x-4 p-1 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50">
              {Object.keys(services).map((service) => (
                <button
                  key={service}
                  className={`px-6 py-2 rounded-md transition-all duration-300 ${
                    activeTab === service
                      ? 'bg-gradient-to-r from-[#0A647A] to-[#0c8aa8] text-white shadow-lg shadow-[#0A647A]/30'
                      : 'text-gray-300 hover:bg-gray-700/50'
                  }`}
                  onClick={() => setActiveTab(service)}
                >
                  {services[service].title}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.keys(services).map((service) => (
              <div
                key={service}
                className={`bg-gray-800/30 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 transition-all duration-500 ${
                  activeTab === service 
                    ? 'scale-105 shadow-xl border-[#0A647A]/50' 
                    : 'scale-100 opacity-70 hover:opacity-100 hover:border-gray-600/50'
                }`}
              >
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0A647A] to-[#0c8aa8] mb-4">
                  {services[service].title}
                </h3>
                <p className="text-gray-300 mb-6">
                  {services[service].description}
                </p>
                <ul className="space-y-3">
                  {services[service].features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <svg
                        className="w-5 h-5 text-[#0A647A] mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <button className="px-8 py-3 bg-gradient-to-r from-[#0A647A] to-[#0c8aa8] text-white rounded-lg hover:shadow-lg hover:shadow-[#0A647A]/30 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Service
