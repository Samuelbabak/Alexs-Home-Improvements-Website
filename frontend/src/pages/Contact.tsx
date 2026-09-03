import React from 'react';
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Phone, Mail, FileText, MapPin, Send, ArrowRight, Camera } from 'lucide-react';
import { motion } from 'framer-motion';
import { Turnstile, TurnstileInstance } from '@marsidev/react-turnstile'


interface ContactFormInputs {
  name: string;
  phone: string;
  email: string;
  address?: string;
  service: string;
  budget?: number;
  message: string;
  attachments?: FileList;
  website?: string;
}

const Contact: React.FC = () => {
  const { register, handleSubmit, reset, formState: { isSubmitting, errors } } = useForm<ContactFormInputs>();
  const MAX_DOCUMENT_SIZE_MB = 10
  const turnstileRef = useRef<TurnstileInstance | null>(null)
  const [captchaToken, setCaptchaToken] = useState('')

  
  const onSubmit = async (data: ContactFormInputs) => {
    console.log('Form submitted:', data);
    if (data.website) {
      return
    }
    if (!captchaToken) {
      alert('Please complete the CAPTCHA before submitting your request.')
      return
    }

    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('phone', data.phone)
    formData.append('address', data.address ?? '')
    formData.append('service', data.service)
    formData.append('budget', data.budget?.toString() ?? '')
    formData.append('message', data.message)
    formData.append('website', data.website ?? '')
    formData.append('captcha_response', captchaToken)
    Array.from(data.attachments ?? []).forEach((file) => {
      formData.append('attachments', file)
    })

    const response = await fetch("/api/email", {
      method: "POST",
      body: formData,
    })
    if (!response.ok) {
      const error = await response.json().catch(() => null)
      const detail = Array.isArray(error?.detail)
        ? error.detail.map((item: { loc?: string[]; msg?: string }) => `${item.loc?.join('.')}: ${item.msg}`).join('\n')
        : error?.detail ?? 'The request could not be sent.'
      alert(detail)
      return
    }

    turnstileRef.current?.reset()
    setCaptchaToken('')
    alert('Thank you! Your request has been sent. Alex will contact you shortly.');
    reset();
  };

  return (
    <div className="w-full bg-white">
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://plus.unsplash.com/premium_photo-1689609950112-d66095626efb?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Contact background" 
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-gray-200">Ready to start your next project?</p>
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form Column */}
          <div className="bg-gray-50 p-8 rounded-3xl shadow-xl border border-gray-100">
            <h2 className="text-3xl font-bold text-navy mb-6">Request a Free Estimate</h2>
            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <input
                    {...register('website')}
                    tabIndex={-1}
                    autoComplete="new-password"
                    aria-hidden="true"
                    className='absolute left-[-999999px]'
                  />
                  <label className="text-sm font-bold text-navy mb-2 uppercase tracking-wider">Full Name</label>
                  <input 
                    {...register('name', { required: true })} 
                    className="px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all"
                    placeholder="John Doe" 
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-bold text-navy mb-2 uppercase tracking-wider">Phone Number</label>
                  <input 
                    {...register('phone', { required: true })} 
                    type="tel" 
                    autoComplete="tel"
                    className="px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all"
                    placeholder="(828) XXX-XXXX" 
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-bold text-navy mb-2 uppercase tracking-wider">Email Address</label>
                <input 
                  {...register('email', { required: true })} 
                  type="email" 
                  className="px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all"
                  placeholder="email@example.com" 
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-bold text-navy mb-2 uppercase tracking-wider">Service Address (Optional)</label>
                <input 
                  {...register('address')} 
                  className="px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all"
                  placeholder="123 Main St, Asheville, NC" 
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-bold text-navy mb-2 uppercase tracking-wider">Service Needed</label>
                <select 
                  {...register('service')} 
                  className="px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all bg-white"
                >
                  <option value="deck">Deck Construction/Repair</option>
                  <option value="remodel">Home Remodeling</option>
                  <option value="roof">Roofing Services</option>
                  <option value="general">General Repairs/Construction</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="budget" className="text-sm font-bold text-navy mb-2 uppercase tracking-wider">Estimated Budget (Optional)</label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    id="budget"
                    {...register('budget', { valueAsNumber: true, min: 0 })}
                    type="number"
                    min="0"
                    className="w-full rounded-md border border-gray-300 py-3 pl-8 pr-4 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-gold"
                    placeholder=" e.g. 25000"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-bold text-navy mb-2 uppercase tracking-wider">Project Details</label>
                <textarea 
                  {...register('message', { required: true })} 
                  rows={4} 
                  className="px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all"
                  placeholder="Tell us about your project..." 
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="photos" className="text-sm font-bold text-navy mb-2 uppercase tracking-wider">Project Photos (Optional)</label>
                <div className="flex items-center gap-3 rounded-md border border-dashed border-gray-300 bg-white px-4 py-3 transition-colors hover:border-gold">
                  <Camera size={20} className="shrink-0 text-navy" />
                  <input
                    id="attachments"
                    {...register('attachments', {
                      validate: (files) => {
                        if (!files?.length) return true;
                        if (files.length > 5) return 'Please choose no more than 5 attachments.';
                        if (Array.from(files).some((file) => file.size > MAX_DOCUMENT_SIZE_MB * 1024 * 1024)) return 'Each photo must be 10 MB or smaller.';
                        return true;
                      },
                    })}
                    type="file"
                    accept="image/*"
                    multiple
                    className="min-w-0 text-sm text-gray-600 file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-navy file:px-3 file:py-2 file:font-bold file:text-white file:transition-colors hover:file:bg-navy-800"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">Share up to 5 attachments, 10 MB each.</p>
                {errors.attachments && <p className="mt-1 text-sm text-red-600">{errors.attachments.message}</p>}
              </div>
              <Turnstile
                siteKey="0x4AAAAAAEehgbu__dx9rqJn"
                ref={turnstileRef}
                onSuccess={(token) => setCaptchaToken(token)}
                options={{ theme: 'light', size: 'normal' }}
                
              />
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-navy text-white py-4 rounded-md font-bold text-lg hover:bg-navy-800 transition-all duration-300 flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'Sending...' : <><Send size={20} /> Submit Request</>}
              </button>
            </form>
            
          </div>

          {/* Contact Info Column */}
          <div className="flex flex-col justify-center space-y-12">
            <div className="space-y-8">
              <div className="flex items-start gap-6 p-6 bg-gray-50 rounded-3xl border border-gray-100 shadow-sm">
                <div className="bg-navy p-4 rounded-2xl text-white">
                  <Phone size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-navy mb-2">Call Now</h3>
                  <p className="text-gray-600 mb-4">The fastest way to get a quote is to give us a call directly.</p>
                  <a href="tel:8287125407" className="text-navy font-bold text-xl hover:text-gold transition-colors flex items-center gap-2">
                    828-712-5407 <ArrowRight size={20} />
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-6 p-6 bg-gray-50 rounded-3xl border border-gray-100 shadow-sm">
                <div className="bg-gold p-4 rounded-2xl text-navy">
                  <Mail size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-navy mb-2">Email Us</h3>
                  <p className="text-gray-600 mb-4">Prefer email? Send us your project details and photos.</p>
                  <a href="mailto:alexbabak7711@yahoo.com" className="text-navy font-bold text-xl hover:text-gold transition-colors flex items-center gap-2">
                    alexbabak7711@yahoo.com <ArrowRight size={20} />
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-6 p-6 bg-gray-50 rounded-3xl border border-gray-100 shadow-sm">
                <div className="bg-navy p-4 rounded-2xl text-white">
                  <MapPin size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-navy mb-2">Service Area</h3>
                  <p className="text-gray-600">We proudly serve the following areas:</p>
                  <p className="text-navy font-bold mt-2">Asheville, Leicester, and surrounding Buncombe County, NC.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
