import Nav from '../Components/Elements/Nav'
import StarBackground from '../Components/Elements/StarBackground'

function About() {
  return (
    <>
      <Nav />
      <StarBackground />
      <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden" id='about'>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0A647A] to-[#0c8aa8]">About Us</h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-b from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-lg shadow-xl p-8 border border-gray-700/50">
              <p className="text-white text-lg leading-relaxed">
                Welcome to NVS, your trusted partner in digital transformation.
                We specialize in web development, logo design, and customized
                solutions to help businesses build a strong digital presence.
　
　
                <br /><br />
                Our team of skilled developers and designers combines technical
                expertise with creative vision to bring your ideas to life. At NVS,
                we're committed to delivering exceptional services that enhance your brand's
                visibility and drive growth.
　
　
                <br /><br />
                Our web development expertise includes technologies like <span className="font-semibold">ReactJS</span>, <span className="font-semibold">Next.js</span>, <span className="font-semibold">PHP</span>, and <span className="font-semibold">MongoDB</span>, ensuring robust and scalable solutions tailored to your unique needs. Additionally, we offer logo design services to help you create a powerful brand identity that resonates with your target audience.
　
　
                <br /><br />
                Whether you're a startup or an established company, NVS provides innovative, high-quality digital solutions to help you succeed in today's competitive landscape.
                Let's work together to bring your vision to the digital world.
              </p>
            </div>

            <div className="rounded-lg shadow-xl overflow-hidden">
             
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default About
