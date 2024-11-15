import { useState } from 'react'
import Nav from '../Components/Elements/Nav'

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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h1>
          <p className="text-lg text-gray-600">
            Comprehensive digital solutions for your business needs
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="flex space-x-4 p-1 bg-gray-100 rounded-lg">
            {Object.keys(services).map((service) => (
              <button
                key={service}
                className={`px-6 py-2 rounded-md ${
                  activeTab === service
                    ? 'bg-[#0A647A] text-white'
                    : 'text-gray-600 hover:bg-gray-200'
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
              className={`bg-white p-8 rounded-lg shadow-md transition-all duration-300 ${
                activeTab === service ? 'scale-105' : 'scale-100 opacity-70'
              }`}
            >
              <h3 className="text-2xl font-bold text-[#0A647A] mb-4">
                {services[service].title}
              </h3>
              <p className="text-gray-600 mb-6">
                {services[service].description}
              </p>
              <ul className="space-y-3">
                {services[service].features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-700">
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
          <button className="px-8 py-3 bg-[#0A647A] text-white rounded-md hover:bg-[#085466] transition-colors duration-300">
            Get Started
          </button>
        </div>
      </div>
    </div>
  </>
  )
}

export default Service
