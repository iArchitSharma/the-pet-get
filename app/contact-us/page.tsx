// @ts-nocheck
import React from 'react'

function Contact() {
  return (
    <div className="bg-white">
  <header className="bg-[#453823] text-white text-center py-12">
    <h1 className="text-4xl font-bold mt-16">Contact Us</h1>
  </header>
  <section className="text-center py-12 px-4">
    <h2 className="text-2xl font-bold">Get In Touch</h2>
    <p className="mt-4 text-gray-700 max-w-2xl mx-auto">We are here to help you. Reach out to us via any of the following methods.</p>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8 animate-fadeIn">
      <div className="p-4 shadow-lg rounded-lg bg-[#baa3782f] hover:bg-[#baa37855] transition-colors">
        <h3 className="text-xl font-bold">Call Us</h3>
        <p className="text-gray-700 mt-2">+91 123 456 7890</p>
      </div>
      <div className="p-4 shadow-lg rounded-lg bg-[#baa3782f] hover:bg-[#baa37855] transition-colors">
        <h3 className="text-xl font-bold">Email Us</h3>
        <p className="text-gray-700 mt-2">contact@thepetget.com</p>
      </div>
      <div className="p-4 shadow-lg rounded-lg bg-[#baa3782f] hover:bg-[#baa37855] transition-colors">
        <h3 className="text-xl font-bold">Visit Us</h3>
        <p className="text-gray-700 mt-2">123 Health St, Pet City</p>
      </div>
    </div>
  </section>
  <section className="bg-gray-100 py-12 px-4">
    <h2 className="text-2xl font-bold text-center">Send Us A Message</h2>
    <form className="max-w-2xl mx-auto mt-8 space-y-8">
      <div>
        <label htmlFor="name" className="block text-gray-700 font-bold">Name</label>
        <input type="text" id="name" className="w-full mt-2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C0A172] transition" />
      </div>
      <div>
        <label htmlFor="email" className="block text-gray-700 font-bold">Email</label>
        <input type="email" id="email" className="w-full mt-2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C0A172] transition" />
      </div>
      <div>
        <label htmlFor="message" className="block text-gray-700 font-bold">Message</label>
        <textarea id="message" rows="5" className="w-full mt-2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C0A172] transition"></textarea>
      </div>
      <button type="submit" className="w-full bg-[#C0A172] text-white py-3 rounded-lg shadow-lg hover:bg-[#c0a172c6] transition-colors">Send Message</button>
    </form>
  </section>
  <section className="text-center py-12 px-4">
    <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
    <div className="mt-8">
      <div className="p-4 border rounded-lg shadow-md transition transform hover:scale-100 scale-90">
        <h3 className="text-xl font-bold">What are your operating hours?</h3>
        <p className="mt-2 text-gray-700">We operate from 9 AM to 5 PM, Monday to Friday.</p>
      </div>
      <div className="p-4 border rounded-lg shadow-md transition transform hover:scale-100 scale-90 mt-4">
        <h3 className="text-xl font-bold">How can I adopt an pet?</h3>
        <p className="mt-2 text-gray-700">You can adopt an pet through our website or by calling our office.</p>
      </div>
      <div className="p-4 border rounded-lg shadow-md transition transform hover:scale-100 scale-90  mt-4">
        <h3 className="text-xl font-bold">Do you offer relocation services?</h3>
        <p className="mt-2 text-gray-700">Yes, we offer relocation services.</p>
      </div>
    </div>
  </section>
</div>
  )
}

export default Contact