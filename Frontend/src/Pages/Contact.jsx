import { useState } from 'react'
import Nav from '../Components/Elements/Nav'
import axios from 'axios'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [status, setStatus] = useState({
    type: '',
    message: ''
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus({ type: '', message: '' })

    try {
      const response = await axios.post('http://localhost:8080/api/contact/submit', formData)
      
      if (response.data.success) {
        setStatus({
          type: 'success',
          message: 'Thank you for your message. We will get back to you soon!'
        })
        // Clear form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        })
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.response?.data?.message || 'Something went wrong. Please try again later.'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
    <Nav/>
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-16 px-4 sm:px-6 lg:px-8" id='contact'>
      <div className="max-w-lg mx-auto">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-white mb-4">Contact Us</h2>
          <p className="mt-2 text-lg text-gray-300">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
        {status.message && (
          <div className={`mt-6 p-4 rounded-md ${
            status.type === 'success' ? 'bg-green-100 text-green-800 border border-green-400' : 'bg-red-100 text-red-800 border border-red-400'
          }`}>
            {status.message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="mt-10 space-y-6 bg-white/10 backdrop-blur-sm p-8 rounded-xl shadow-xl">
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-600 bg-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-[#0A647A] focus:border-transparent transition duration-150 ease-in-out"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-600 bg-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-[#0A647A] focus:border-transparent transition duration-150 ease-in-out"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="subject" className="sr-only">Subject</label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-600 bg-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-[#0A647A] focus:border-transparent transition duration-150 ease-in-out"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="message" className="sr-only">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows="4"
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-600 bg-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-[#0A647A] focus:border-transparent transition duration-150 ease-in-out"
                placeholder="Your message"
                value={formData.message}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white transition duration-150 ease-in-out ${
                loading 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : 'bg-[#0A647A] hover:bg-[#085466] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0A647A] transform hover:scale-[1.02]'
              }`}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default Contact
