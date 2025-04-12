import React from 'react'

function Subscribe() {
  return (
    <section className="container mx-auto p-10 md:py-20 px-0 md:p-10 md:px-0">
    <section className="relative px-10 md:p-0 transform duration-500 hover:shadow-2xl cursor-pointer hover:-translate-y-1">
        <img 
            className="xl:max-w-6xl" 
            src="/adopt.webp" 
            alt="" 
        />
        <div className="content bg-white p-2 pt-8 md:p-12 pb-12 lg:max-w-lg w-full lg:absolute top-48 right-5">
            <div className="flex justify-between font-bold text-sm">
                <p>Service Review</p>
                <p className="text-gray-400">17th March, 2025</p>
            </div>
            <h2 className="text-3xl font-semibold mt-4 md:mt-10 text-primary-1">Pet Adoption Articles</h2>
            <p className="my-3 text-justify font-medium text-gray-700 leading-relaxed">
            Learn more about caring for your new pet and helpful insights on what to expect.
            </p>
            <button className="mt-2 md:mt-5 p-3 px-5 bg-primary-1 text-white font-bold text-sm hover:bg-primary-2">
                Read More
            </button>
        </div>
    </section>
</section>
  )
}

export default Subscribe