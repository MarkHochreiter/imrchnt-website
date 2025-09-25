import { useState } from 'react'
import { X, Mail, User, MessageSquare, Lightbulb } from 'lucide-react'

const FeatureRequestModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    featureRequest: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const encode = (data) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      console.log('Submitting feature request to Netlify Forms...')
      console.log('Form data:', formData)
      
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "feature-request",
          ...formData,
          timestamp: new Date().toISOString()
        })
      })

      console.log('Response status:', response.status)

      if (response.ok) {
        console.log('✅ Feature request submitted successfully to Netlify')
        setSubmitStatus('success')
        
        // Reset form
        setFormData({
          firstname: '',
          lastname: '',
          email: '',
          featureRequest: ''
        })
        
        // Close modal after 2 seconds
        setTimeout(() => {
          onClose()
          setSubmitStatus(null)
        }, 2000)
      } else {
        console.error('❌ Feature request submission failed:', response.status)
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('❌ Network error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[2000] p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Lightbulb className="h-6 w-6 text-[#f08e80] mr-2" />
              Feature Request
            </h2>
            <p className="text-gray-600 mt-1">Help us improve our platform with your ideas</p>
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
          {/* Hidden field for Netlify Forms */}
          <input type="hidden" name="form-name" value="feature-request" />
          
          {/* First Name */}
          <div>
            <label htmlFor="firstname" className="block text-sm font-medium text-gray-700 mb-1">
              First Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                id="firstname"
                name="firstname"
                required
                value={formData.firstname}
                onChange={handleInputChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f08e80] focus:border-transparent"
                placeholder="John"
              />
            </div>
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastname" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                id="lastname"
                name="lastname"
                required
                value={formData.lastname}
                onChange={handleInputChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f08e80] focus:border-transparent"
                placeholder="Doe"
              />
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

          {/* Feature Request */}
          <div>
            <label htmlFor="featureRequest" className="block text-sm font-medium text-gray-700 mb-1">
              Feature Request *
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <textarea
                id="featureRequest"
                name="featureRequest"
                required
                rows={6}
                value={formData.featureRequest}
                onChange={handleInputChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f08e80] focus:border-transparent resize-none"
                placeholder="Describe the feature you'd like to see added to our platform. Please be as detailed as possible about how it would work and why it would be valuable..."
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Please provide as much detail as possible to help us understand your request.
            </p>
          </div>

          {/* Submit Status */}
          {submitStatus === 'success' && (
            <div className="bg-green-50 border border-green-200 rounded-md p-3">
              <p className="text-green-800 text-sm">✅ Thank you! Your feature request has been submitted successfully.</p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-red-800 text-sm">❌ Something went wrong. Please try again.</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#f08e80] hover:bg-[#e07d70] disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Submitting Request...
              </>
            ) : (
              <>
                <Lightbulb className="h-4 w-4 mr-2" />
                Submit Feature Request
              </>
            )}
          </button>

          {/* Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
            <p className="text-blue-800 text-xs">
              💡 <strong>Tip:</strong> The more specific your request, the better we can understand and prioritize it. 
              Include use cases, expected behavior, and how it would benefit your workflow.
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FeatureRequestModal
