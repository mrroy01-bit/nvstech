import React from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa"; // corrected import statement

gsap.registerPlugin(ScrollTrigger)

const Footer = () => {
  const footerRef = React.createRef()

  React.useEffect(() => {
    gsap.fromTo(footerRef.current, {
      y: 50,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top bottom",
        end: "bottom top",
        toggleActions: "restart none none none"
      }
    })
  }, [footerRef])

  return (
    <footer ref={footerRef} className="bg-[linear-gradient(135deg,#1a1c2c,#4389A2)] text-white py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <div className="text-center md:text-left">
          <p className="text-sm text-gray-300">
            &copy; {new Date().getFullYear()} NVS Tech. All rights reserved.
          </p>
        </div>
        <div className="flex items-center space-x-6">
          <a 
            href="https://github.com/nvs-tech" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors duration-300"
          >
            <FaGithub size={24} />
          </a>
          <a 
            href="https://twitter.com/nvstech" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors duration-300"
          >
            <FaTwitter size={24} /> 
          </a>
          <a 
            href="https://www.linkedin.com/company/nvs-tech" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors duration-300"
          >
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
