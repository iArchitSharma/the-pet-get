import React from 'react'
import Image from 'next/image'
import Link from 'next/link';

function Hero() {
    return (
      <div className="min-h-screen flex justify-center">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Text Content - Centered vertically and horizontally */}
            <div className="text-center md:text-left">
              <h2 className="text-4xl md:text-6xl font-bold mb-4 text-primary-1">
                Find your new best friend in India
              </h2>
              <p className="text-xl text-gray-500 mb-8">
              Every Pet Deserves a Good Home.
              </p>
              <Link href="/adopt-a-dog">
              <button className="bg-primary-1 hover:bg-[#453823e5] font-semibold text-white px-6 py-3 rounded-full transition-all transform hover:scale-105 hover:po">
              Adopt a pet
              </button></Link>
            </div>
  
            {/* Image - Centered with proper sizing */}
            <div className="flex justify-center md:justify-end">
              <Image 
                src="/hero.webp" 
                alt="Luxury Car"
                width={500}
                height={500}
                className="w-full max-w-md object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

export default Hero