import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';

function PetsList({ cityId, stateId, petCategory }: {
  stateId: string | null;
  cityId: string | null;
  petCategory: number;
}) {
  const [petsData, setPetsData] = useState([]);
  const [pageState, setPageState] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  function endPoint() {
    if (stateId === null && cityId === null) {
      return `https://thepetnest.com/api/v1/pets?q[category_id_eq]=${petCategory}&page=${pageState}`;
    } else if (stateId !== null && (cityId === null || cityId === '')) {
      return `https://thepetnest.com/api/v1/pets?q[category_id_eq]=${petCategory}&page=${pageState}&q[address_state_id_eq]=${stateId}`;
    } else {
      return `https://thepetnest.com/api/v1/pets?q[category_id_eq]=${petCategory}&page=${pageState}&q[address_city_id_eq]=${cityId}&q[address_state_id_eq]=${stateId}`;
    }
  }

  useEffect(() => {
    const fetchPetsData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(endPoint(), {
          timeout: 10000 
        });
        setPetsData(response.data.data);
        setPageState(response.data.meta.page);
      } catch (error) {
        console.error('Error fetching pet data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPetsData();
  }, [pageState, stateId, cityId]);

  const handlePreviousPage = () => {
    if (pageState > 1) {
      setPageState(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    setPageState(prev => prev + 1);
  };

  const handleImageError = (imageUrl: string) => {
    setFailedImages(prev => new Set(prev).add(imageUrl));
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 w-full lg:w-[75%]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-base-100 rounded-sm overflow-hidden animate-pulse">
              <div className="w-full bg-gray-200 h-[180px] rounded-b-[13px]"></div>
              <div className="p-6 space-y-4">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded col-span-2"></div>
                </div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 w-full lg:w-[75%]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {petsData.map((pet: any) => {
          const imageUrl = pet.images[0]?.url;
          const useFallback = !imageUrl || failedImages.has(imageUrl);
          
          return (
            <div
              key={pet.id}
              className="bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-sm overflow-hidden"
            >
              <figure className="w-full bg-[#fbe8e8] h-[150px] sm:h-[180px] rounded-b-[13px] overflow-hidden relative">
                <Link href={`/adopt-a-pet/${pet.id}`} passHref className='w-full'>
                  {useFallback ? (
                    <img
                      src="/placeholder-pet.jpg"
                      alt={pet.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <Image
                      src={imageUrl}
                      alt={pet.name}
                      width={300}
                      height={180}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      priority={pageState === 1} 
                      onError={() => handleImageError(imageUrl)}
                      quality={75}
                      loading="lazy"
                    />
                  )}
                </Link>
                <div className="absolute top-2 right-2 badge bg-primary-1 text-white text-xs sm:text-sm">
                  {pet.subcategory?.name}
                </div>
              </figure>

              <div className="card-body p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-[#baa378da]">{pet.name}</h2>

                <div className="grid grid-cols-2 gap-2 sm:gap-4 my-2 sm:my-3">
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <span className="text-gray-500 font-medium text-sm sm:text-base">Gender:</span>
                    <span className="font-semibold capitalize text-sm sm:text-base">{pet.gender}</span>
                  </div>

                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <span className="text-gray-500 font-medium text-sm sm:text-base">Age:</span>
                    <span className="font-semibold text-sm sm:text-base">{pet.age}</span>
                  </div>

                  <div className="col-span-2 flex items-start space-x-1 sm:space-x-2">
                    <span className="text-gray-500 font-medium text-sm sm:text-base">Location:</span>
                    <span className="font-semibold text-sm sm:text-base">
                      {pet.address?.city?.city_state?.name || 'Unknown'}, {pet.address?.city?.city_state?.state?.name || ''}
                    </span>
                  </div>
                </div>

                <div className="card-actions mt-2 sm:mt-4">
                  <Link href={`/adopt-a-pet/${pet.id}`} passHref className='w-full'>
                    <button className="btn bg-primary-1 hover:bg-[#453823ed] w-full py-2 sm:py-3 text-sm sm:text-lg font-semibold rounded-lg text-primary-2">
                      Adopt Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="join grid grid-cols-2 w-full sm:w-1/2 mx-auto mt-8 sm:mt-15">
        <button 
          onClick={handlePreviousPage} 
          disabled={pageState === 1} 
          className="join-item btn btn-outline text-sm sm:text-base"
        >
          Previous page
        </button>
        <button 
          onClick={handleNextPage} 
          className="join-item btn btn-outline text-sm sm:text-base"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PetsList;