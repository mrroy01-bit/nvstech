import React from 'react'
import {gsap} from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    <footer ref={footerRef} className="bg-gray-900 text-white p-4 flex flex-row items-center justify-center">
      <div className="copy  flex items-center justify-center">
        <p className=" text-center text-sm">
          &copy; {new Date().getFullYear()} NVS Tech. All rights reserved.
        </p>
      </div>
      <div className="flex items-center">
        <a href="https://github.com/nvs-tech" target="_blank" rel="noopener noreferrer" className="mr-4">
          <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" className="h-8 w-8" />
        </a>
        <a href="https://twitter.com/nvstech" target="_blank" rel="noopener noreferrer" className="mr-4">
          <img src="https://cdn-icons-png.flaticon.com/512/124/124021.png" alt="Twitter" className="h-8 w-8" />
        </a>
        <a href="https://www.linkedin.com/company/nvs-tech" target="_blank" rel="noopener noreferrer" className="mr-4">
          <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" className="h-8 w-8" />
        </a>
      </div>
    </footer>
  )
}

export default Footer

