import { useState } from 'react'
import { X, Mail, User, Building, Phone } from 'lucide-react'

const SignupModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    businessType: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [errorDetails, setErrorDetails] = useState('')

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)
    setErrorDetails('')

    // Replace this with your actual Google Apps Script URL
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbyx2JTK79rHqO_hqAWTyw6dLp5GOyuYYiDFiEDPAVhrgDjZ30XiyAy94WpqDJpV2VFKDg/execV2VFKDg/exec'
    
    console.log('=== FORM SUBMISSION DEBUG ===')
    console.log('Script URL:', scriptUrl)
    console.log('Form data being sent:', formData)
    console.log('Timestamp:', new Date().toISOString())

    try {
      const payload = {
        ...formData,
        timestamp: new Date().toISOString(),
        source: 'Website Signup'
      }
      
      console.log('Full payload:', payload)
      console.log('JSON payload:', JSON.stringify(payload))

      const response = await fetch(scriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })

      console.log('Response received:')
      console.log('- Status:', response.status)
      console.log('- Status Text:', response.statusText)
      console.log('- OK:', response.ok)
      console.log('- Headers:', Object.fromEntries(response.headers.entries()))

      // Get response text first
      const responseText = await response.text()
      console.log('- Raw response text:', responseText)

      // Try to parse as JSON
      let responseData
      try {
        responseData = JSON.parse(responseText)
        console.log('- Parsed response data:', responseData)
      } catch (parseError) {
        console.error('- Failed to parse response as JSON:', parseError)
        responseData = { status: 'error', message: 'Invalid JSON response: ' + responseText }
      }

      if (response.ok && responseData.status === 'success') {
        console.log('✅ SUCCESS: Form submitted successfully')
        setSubmitStatus('success')
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          company: '',
          phone: '',
          businessType: ''
        })
        // Close modal after 2 seconds
        setTimeout(() => {
          onClose()
          setSubmitStatus(null)
        }, 2000)
      } else {
        console.error('❌ SUBMISSION FAILED:')
        console.error('- Response status:', response.status)
        console.error('- Response data:', responseData)
        
        const errorMsg = responseData?.message || `HTTP ${response.status}: ${response.statusText}`
        setErrorDetails(errorMsg)
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('❌ FETCH ERROR:', error)
      console.error('- Error name:', error.name)
      console.error('- Error message:', error.message)
      console.error('- Error stack:', error.stack)
      
      let errorMsg = 'Network error: ' + error.message
      
      // Check for common error types
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        errorMsg = 'Cannot connect to server. Check your Google Apps Script URL.'
      } else if (error.message.includes('CORS')) {
        errorMsg = 'CORS error. Make sure your Google Apps Script is deployed with "Anyone" access.'
      }
      
      setErrorDetails(errorMsg)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      console.log('=== END FORM SUBMISSION DEBUG ===')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[2000] p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Get Started Free</h2>
            <p className="text-gray-600 mt-1">Join thousands of businesses using our platform</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* First Name & Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f08e80] focus:border-transparent"
                  placeholder="John"
                />
              </div>
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f08e80] focus:border-transparent"
                  placeholder="Doe"
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f08e80] focus:border-transparent"
                placeholder="john@example.com"
              />
            </div>
          </div>

          {/* Company */}
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
              Company Name
            </label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f08e80] focus:border-transparent"
                placeholder="Your Company"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f08e80] focus:border-transparent"
                placeholder="(555) 123-4567"
              />
            </div>
          </div>

          {/* Business Type */}
          <div>
            <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-1">
              Business Type
            </label>
            <select
              id="businessType"
              name="businessType"
              value={formData.businessType}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f08e80] focus:border-transparent"
            >
              <option value="">Select your business type</option>
              <option value="retail">Retail Store</option>
              <option value="restaurant">Restaurant/Food Service</option>
              <option value="services">Professional Services</option>
              <option value="ecommerce">E-commerce</option>
              <option value="nonprofit">Non-profit</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Submit Status */}
          {submitStatus === 'success' && (
            <div className="bg-green-50 border border-green-200 rounded-md p-3">
              <p className="text-green-800 text-sm">✅ Success! We'll be in touch soon.</p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-red-800 text-sm font-medium">❌ Something went wrong:</p>
              <p className="text-red-700 text-xs mt-1 break-words">{errorDetails || 'Please try again.'}</p>
              <p className="text-red-600 text-xs mt-2">Check the browser console (F12) for more details.</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#f08e80] hover:bg-[#e07d70] disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200"
          >
            {isSubmitting ? 'Creating Account...' : 'Start Free Trial'}
          </button>

          {/* Terms */}
          <p className="text-xs text-gray-500 text-center">
            By signing up, you agree to our{' '}
            <a href="#" className="text-[#f08e80] hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-[#f08e80] hover:underline">Privacy Policy</a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default SignupModal
