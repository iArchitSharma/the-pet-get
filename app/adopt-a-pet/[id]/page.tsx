"use client"
import axios from 'axios';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface Pet {
  id: number;
  name: string;
  // Add other properties you expect from the API
}

export default function PetDetailsPage({ params }: { params: { id: string } }) {
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const response = await axios.get<Pet>(`https://thepetnest.com/api/v1/pets/${params.id}`);
        setPet(response.data.data.data.pet);
      } catch (err) {
        console.error('Error fetching pet:', err);
        setError('Failed to load pet data');
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchPetData();
  }, [params.id]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error || !pet) return <div className="p-4 text-red-500">{error || 'Pet not found'}</div>;

  function yesno(val) {
    return val ? "Yes" : "No";
  }

  function goodWith() {
    const arr = [];
    if (pet.good_with_dogs) arr.push("Dog");
    if (pet.good_with_cats) arr.push("Cat");
    if (pet.good_with_kids) arr.push("Children");
    return arr.length > 0 ? arr.join(", ") : "None specified";
  }

  function badWith() {
    const arr = [];
    if (pet.good_with_dogs === false) arr.push("Dog");
    if (pet.good_with_cats === false) arr.push("Cat");
    if (pet.good_with_kids === false) arr.push("Children");
    return arr.length > 0 ? arr.join(", ") : "None specified";
  }

  return (
    <div className="p-4 bg-background-2">
      {/* Carousel - Responsive height */}
      <div className="carousel w-full h-64 md:h-96 bg-black flex items-center justify-center">
        {pet.images.map((image, index) => (
          <div
            key={image.id || index}
            id={`slide${index + 1}`}
            className="carousel-item relative w-full flex justify-center"
          >
            <img
              src={image.url}
              className="max-w-full max-h-64 md:max-h-96 object-contain"
              alt={`Pet image ${index + 1}`}
            />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a href={`#slide${index === 0 ? pet.images.length : index}`} className="btn btn-circle">❮</a>
              <a href={`#slide${index === pet.images.length - 1 ? 1 : index + 2}`} className="btn btn-circle">❯</a>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content - Responsive layout */}
      <div className="mt-10 md:mt-20 px-4 sm:px-6 md:px-[50px] flex flex-col lg:flex-row gap-6">
        {/* Left Column - Full width on mobile, 2/3 on desktop */}
        <div className="w-full lg:w-2/3 mt-5 lg:pl-5">
          <div className="bg-white border-0 rounded-lg shadow-sm">
            {/* Pet Name Section */}
            <div className="p-6 sm:p-[30px_30px_20px] border-0 bg-transparent relative">
              <h1 className="mb-4 sm:mb-[20px] text-2xl sm:text-4xl block text-[#4d4751] leading-[1.2]">
                <span className="mb-2 sm:mb-[10px] block">{pet.name}</span>
                <span className="mb-3 sm:mb-[15px] block">
                  <span className="inline-block text-sm sm:text-base capitalize">
                    {pet.gender}, {pet.age}, {pet.subcategory.name}
                  </span>
                  <span className="inline-block text-sm sm:text-base text-[#4d4751] leading-[1.2]">
                    , {pet.address.city.city_state.name}
                  </span>
                </span>
              </h1>
              <div className="block border-0 border-b border-[#d2d1d3] mb-4 sm:mb-[20px]"></div>
            </div>

            {/* About Section */}
            <div className="p-6 sm:p-[30px_30px_20px]">
              <h1 className="mb-4 sm:mb-[15px] text-xl sm:text-[30px] text-[#4d4751] leading-[1.2]">About</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div>
                  <dl>
                    <dt className="text-sm sm:text-base uppercase font-normal leading-[1.6] text-[#4d4751]">Vaccinated</dt>
                    <dd className="mb-4 sm:mb-5 text-xs sm:text-sm">{yesno(pet.vaccinations)}</dd>
                    
                    <dt className="text-sm sm:text-base uppercase font-normal leading-[1.6] text-[#4d4751]">Neutered</dt>
                    <dd className="mb-4 sm:mb-5 text-xs sm:text-sm">{yesno(pet.neutered)}</dd>
                    
                    <dt className="text-sm sm:text-base uppercase font-normal leading-[1.6] text-[#4d4751]">Sprayed</dt>
                    <dd className="mb-4 sm:mb-5 text-xs sm:text-sm">{yesno(pet.sprayed)}</dd>
                  </dl>
                </div>
                <div>
                  <dl>
                    <dt className="text-sm sm:text-base uppercase font-normal leading-[1.6] text-[#4d4751]">Shots Up to Date</dt>
                    <dd className="mb-4 sm:mb-5 text-xs sm:text-sm">{yesno(pet.shots_upto_date)}</dd>
                    
                    <dt className="text-sm sm:text-base uppercase font-normal leading-[1.6] text-[#4d4751]">Good in a home with</dt>
                    <dd className="mb-4 sm:mb-5 text-xs sm:text-sm">{goodWith()}</dd>
                    
                    <dt className="text-sm sm:text-base uppercase font-normal leading-[1.6] text-[#4d4751]">Prefers a home without</dt>
                    <dd className="mb-4 sm:mb-5 text-xs sm:text-sm">{badWith()}</dd>
                  </dl>
                </div>
              </div>
            </div>

            {/* Story Section */}
            <div className="p-6 sm:p-[30px_30px_20px]">
              <h2 className="mb-4 sm:mb-[15px] text-xl sm:text-[30px] text-[#4d4751] leading-[1.2]">My Story</h2>
              <div className="mb-5 text-sm sm:text-base">{pet.donation_reason}</div>
              
              <h2 className="mb-4 sm:mb-[15px] text-xl sm:text-[30px] text-[#4d4751] leading-[1.2]">Additional Info</h2>
              <div className="mb-5 text-sm sm:text-base">{pet.additional_info}</div>
            </div>
          </div>
        </div>

        {/* Right Column - Full width on mobile, 1/3 on desktop */}
        <div className="w-full lg:w-1/3 mt-5 lg:pl-5">
  <div className="mb-6 sm:mb-[30px]">
    <div className="block w-full mx-auto max-w-[400px]">
      <div className="overflow-hidden flex flex-col rounded-[10px] shadow-[0_1px_3px_rgba(69,56,35,0.15)] bg-[#F8F5F0]">
        {/* Adoption CTA */}
        <div className="p-6 sm:p-[30px] text-center">
          <h2 className="mb-4 sm:mb-[30px] text-lg sm:text-[20px] text-[#453823] leading-[1.6] font-medium">
            Considering {pet.name} for adoption?
          </h2>
          <Link 
            className="hover:bg-[#453823] hover:text-[#F8F5F0] block w-full h-[45px] px-4 sm:px-[28px] py-2 sm:py-[11px] font-medium border-2 border-[#453823] bg-[#F8F5F0] text-[#453823] rounded-[23px] shadow-sm whitespace-nowrap text-center text-ellipsis uppercase text-xs sm:text-[14px] leading-[1.4] transition-all duration-200 hover:shadow-md"
            href='/'
          >
            Start Your Inquiry
          </Link>

          <div className="mt-3 sm:mt-[15px]">
            <Link 
              href="#" 
              className="hover:bg-[#BAA378] hover:border-[#BAA378] text-[#453823] border-[#BAA378] hover:text-[#453823] block w-full h-[45px] px-4 sm:px-[30px] py-2 sm:py-[11px] font-medium border-2 rounded-[23px] whitespace-nowrap text-center text-ellipsis uppercase text-xs sm:text-[14px] leading-[1.4] transition-all duration-200 bg-[#F8F5F0]"
            >
              Read FAQs
            </Link>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex border-t border-[#D9D1C2]">
          <button className="hover:bg-[#453823] border-r border-[#D9D1C2] flex-1 min-h-[55px] p-2 sm:p-[10px_18px] text-[#453823] hover:text-[#F8F5F0] text-xs sm:text-[14px] uppercase transition-colors duration-200 font-medium">
            Sponsor
          </button>
          <button className="hover:bg-[#453823] flex-1 min-h-[55px] p-2 sm:p-[10px_18px] text-[#453823] hover:text-[#F8F5F0] text-xs sm:text-[14px] uppercase transition-colors duration-200 font-medium">
            Favorite
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
      </div>
    </div>
  );
}