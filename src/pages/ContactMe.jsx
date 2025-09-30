import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import '../styles/ContactMe.css';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    whatsapp: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // EmailJS Configuration - REPLACE THESE WITH YOUR ACTUAL VALUES
  const EMAILJS_CONFIG = {
    serviceId: 'service_3cddk0q',     // Replace with your Service ID (e.g., 'service_abc1234')
    templateId: 'template_wzusdcs',   // Replace with your Template ID (e.g., 'template_xyz5678')
    publicKey: 'vCuPsvsmSFvMeb_rp'      // Replace with your Public Key (e.g., 'abcdef123456789')
  };

  // Initialize EmailJS when component mounts
  useEffect(() => {
    try {
      emailjs.init(EMAILJS_CONFIG.publicKey);
      console.log('EmailJS initialized successfully');
    } catch (error) {
      console.error('Failed to initialize EmailJS:', error);
      setSubmitError('Email service initialization failed. Please check configuration.');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear submit error when user makes changes
    if (submitError) {
      setSubmitError('');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company is required';
    }

    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = 'WhatsApp number is required';
    } else if (!/^\+?\d{7,15}$/.test(formData.whatsapp.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.whatsapp = 'Enter a valid WhatsApp number (7-15 digits)';
    }
    
    if (!formData.subject) {
      newErrors.subject = 'Please select a subject';
    }
    
    return newErrors;
  };

  const validateEmailJSConfig = () => {
    const missingFields = [];
    
    if (!EMAILJS_CONFIG.serviceId || EMAILJS_CONFIG.serviceId === 'YOUR_SERVICE_ID_HERE') {
      missingFields.push('Service ID');
    }
    if (!EMAILJS_CONFIG.templateId || EMAILJS_CONFIG.templateId === 'YOUR_TEMPLATE_ID_HERE') {
      missingFields.push('Template ID');
    }
    if (!EMAILJS_CONFIG.publicKey || EMAILJS_CONFIG.publicKey === 'YOUR_PUBLIC_KEY_HERE') {
      missingFields.push('Public Key');
    }
    
    return missingFields;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check EmailJS configuration first
    const missingConfig = validateEmailJSConfig();
    if (missingConfig.length > 0) {
      setSubmitError(`EmailJS configuration missing: ${missingConfig.join(', ')}. Please update your configuration.`);
      return;
    }
    
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      setSubmitError('');
      
      try {
        // Clean WhatsApp number
        const cleanedWhatsApp = formData.whatsapp.replace(/[\s\-\(\)]/g, '');
        
        // Prepare template parameters for EmailJS
        const templateParams = {
          from_name: formData.name.trim(),
          from_email: formData.email.trim(),
          company: formData.company.trim(),
          whatsapp: cleanedWhatsApp,
          subject: formData.subject,
          message: formData.message.trim() || 'No additional message provided.',
          to_email: 'abdellahchalouli7@gmail.com',
          reply_to: formData.email.trim()
        };

        console.log('Sending email with params:', templateParams);
        console.log('Using config:', {
          serviceId: EMAILJS_CONFIG.serviceId,
          templateId: EMAILJS_CONFIG.templateId,
          publicKey: EMAILJS_CONFIG.publicKey.substring(0, 5) + '...' // Only show first 5 chars for security
        });

        // Send email using EmailJS
        const response = await emailjs.send(
          EMAILJS_CONFIG.serviceId,
          EMAILJS_CONFIG.templateId,
          templateParams,
          EMAILJS_CONFIG.publicKey
        );

        console.log('Email sent successfully:', response);
        
        if (response.status === 200) {
          setIsSubmitted(true);
          
          // Reset form after showing success message
          setTimeout(() => {
            setIsSubmitted(false);
            setFormData({
              name: '',
              email: '',
              company: '',
              whatsapp: '',
              subject: '',
              message: ''
            });
          }, 4000);
        } else {
          throw new Error(`EmailJS responded with status: ${response.status}`);
        }

      } catch (error) {
        console.error('Failed to send email:', error);
        
        let errorMessage = 'Failed to send message. ';
        
        if (error.status === 400) {
          errorMessage += 'Bad request - please check your form data.';
        } else if (error.status === 401) {
          errorMessage += 'Unauthorized - please check your EmailJS public key.';
        } else if (error.status === 404) {
          errorMessage += 'Service or template not found - please check your IDs.';
        } else if (error.status === 413) {
          errorMessage += 'Message too large - please shorten your message.';
        } else if (error.status === 422) {
          errorMessage += 'Invalid template parameters - please check your template setup.';
        } else if (error.status === 429) {
          errorMessage += 'Too many requests - please wait and try again.';
        } else if (error.text) {
          errorMessage += `Error: ${error.text}`;
        } else {
          errorMessage += 'Please try again or contact me directly.';
        }
        
        setSubmitError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  if (isSubmitted) {
    return (
      <div className="contact-container">
        <div className="success-message">
          <h1 className="contact-title">Thank You!</h1>
          <p className="success-text">
            Your message has been sent successfully. I'll get back to you soon!
          </p>
          <div className="success-icon">✓</div>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-container">
      <h1 className="contact-title">Get In Touch</h1>
      <p className="contact-subtitle">
        Ready to bring your ideas to life? Let's discuss your project!
      </p>
      
      <form className="contact-form" onSubmit={handleSubmit}>
        {submitError && (
          <div className="submit-error">
            {submitError}
          </div>
        )}
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`form-input ${errors.name ? 'error' : ''}`}
              placeholder="Your full name"
              disabled={isLoading}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? 'error' : ''}`}
              placeholder="your.email@example.com"
              disabled={isLoading}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="company" className="form-label">
              Company <span className="required">*</span>
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className={`form-input ${errors.company ? 'error' : ''}`}
              placeholder="Your company name"
              disabled={isLoading}
            />
            {errors.company && <span className="error-message">{errors.company}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="whatsapp" className="form-label">
              WhatsApp <span className="required">*</span>
            </label>
            <input
              type="tel"
              id="whatsapp"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              className={`form-input ${errors.whatsapp ? 'error' : ''}`}
              placeholder="+213 123 456 789"
              disabled={isLoading}
            />
            {errors.whatsapp && <span className="error-message">{errors.whatsapp}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="subject" className="form-label">
            Subject <span className="required">*</span>
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={`form-select ${errors.subject ? 'error' : ''}`}
            disabled={isLoading}
          >
            <option value="">Select a service</option>
            <option value="Website Development">Website Development</option>
            <option value="Mobile App Development">Mobile App Development</option>
            <option value="3D Design">3D Design</option>
          </select>
          {errors.subject && <span className="error-message">{errors.subject}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="message" className="form-label">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="form-textarea"
            placeholder="Tell me about your project ideas, requirements, timeline, or any questions you have..."
            rows="5"
            disabled={isLoading}
          />
        </div>

        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}

export default ContactForm;