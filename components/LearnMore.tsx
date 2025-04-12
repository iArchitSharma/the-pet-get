import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function LearnMore() {
    const cards = [
        {
            title: "Checklist for new adopters",
            description: "Make the adoption transition as smooth as possible.",
            icon: '/learn1.svg',
            link: '#'
        },
        {
            title: "How Old Is A Dog In Human Years?",
            description: "Learn to translate dog years to human years just for fun, and vice versa. Finally answer how old your dog is!",
            icon: '/learn2.svg',
            link: '#'
        },
        {
            title: "Pet Adoption FAQs",
            description: "Get answer to all the you questions you haven’t thought of for your adoption.",
            icon: '/learn3.svg',
            link: '#'
        }
    ];

    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
            <h1 className='text-4xl pb-5 text-center uppercase font-bold leading-tight mb-16 text-heading-1'>Planning to adopt a pet?</h1>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                {cards.map((card, index) => (
                    <Link key={index} href={card.link} passHref>
                        <div className='flex flex-col items-center text-center h-full p-6 rounded-lg transition-all duration-200'>
                            <div className='mb-6'>
                                <Image 
                                    src={card.icon} 
                                    alt='Pet adoption icon' 
                                    width={80} 
                                    height={80} 
                                    className='object-contain'
                                />
                            </div>
                            <h2 className='text-xl font-bold uppercase mb-3 line-clamp-2 text-primary-2'>{card.title}</h2>
                            <p className='text-gray-600 mb-6'>{card.description}</p>
                            <button className='mt-auto px-8 py-2 border-2 border-primary-2 text-primary-2 rounded-full uppercase font-medium hover:bg-primary-2 hover:text-white transition-colors duration-200'>
                                Learn More
                            </button>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default LearnMore