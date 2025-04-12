// @ts-nocheck
import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NearbyPets = () => {
    const [petsData, setPetsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

    useEffect(() => {
        const fetchPetsData = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`https://thepetnest.com/api/v1/pets?q[category_id_eq]=1&page=1`, {
                    timeout: 10000 // 10 seconds timeout
                });
                setPetsData(response.data.data);
            } catch (error) {
                console.error('Error fetching pets:', error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPetsData();
    }, []);

    const handleImageError = (imageUrl: string) => {
        setFailedImages(prev => new Set(prev).add(imageUrl));
    };

    // Get only the first 3 pets
    const firstThreePets = petsData.slice(0, 3);

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl pb-5 text-center uppercase font-bold leading-tight mb-16 text-heading-1">
                    Pets Available for Adoption Nearby
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
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

    if (error) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl pb-5 text-center uppercase font-bold leading-tight mb-16 text-heading-1">
                    Pets Available for Adoption Nearby
                </h1>
                <div className="text-red-500 p-4 bg-red-50 rounded-lg">
                    Error loading pets: {error}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl pb-5 text-center uppercase font-bold leading-tight mb-8 md:mb-16 text-heading-1">
                Pets Available for Adoption Nearby
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {firstThreePets.map((pet) => {
                    const imageUrl = pet.images[0]?.url;
                    const useFallback = !imageUrl || failedImages.has(imageUrl);
                    
                    return (
                        <div
                            key={pet.id}
                            className="bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-sm overflow-hidden"
                        >
                            <figure className="w-full bg-[#fbe8e8] h-[150px] sm:h-[180px] rounded-b-[13px] overflow-hidden relative">
                                <Link href={`/adopt-a-pet/${pet.id}`} passHref className="w-full">
                                    {useFallback ? (
                                        <img
                                            src="/placeholder-pet.jpg"
                                            alt={pet.name || 'Pet image'}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <Image
                                            src={imageUrl}
                                            alt={pet.name || 'Pet image'}
                                            width={300}
                                            height={180}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                            priority
                                            onError={() => handleImageError(imageUrl)}
                                            quality={80}
                                        />
                                    )}
                                </Link>
                                <div className="absolute top-2 right-2 badge bg-primary-1 text-white text-xs sm:text-sm">
                                    {pet.subcategory?.name}
                                </div>
                            </figure>

                            <div className="card-body p-4 sm:p-6">
                                <h2 className="text-xl sm:text-2xl font-bold text-[#baa378da]">
                                    {pet.name || 'Unnamed Pet'}
                                </h2>

                                <div className="grid grid-cols-2 gap-2 sm:gap-4 my-2 sm:my-3">
                                    <div className="flex items-center space-x-1 sm:space-x-2">
                                        <span className="text-gray-500 font-medium text-sm sm:text-base">Gender:</span>
                                        <span className="font-semibold capitalize text-sm sm:text-base">
                                            {pet.gender || 'Unknown'}
                                        </span>
                                    </div>

                                    <div className="flex items-center space-x-1 sm:space-x-2">
                                        <span className="text-gray-500 font-medium text-sm sm:text-base">Age:</span>
                                        <span className="font-semibold text-sm sm:text-base">
                                            {pet.age || 'Unknown'}
                                        </span>
                                    </div>

                                    <div className="col-span-2 flex items-start space-x-1 sm:space-x-2">
                                        <span className="text-gray-500 font-medium text-sm sm:text-base">Location:</span>
                                        <span className="font-semibold text-sm sm:text-base">
                                            {pet.address?.city?.city_state?.name || 'Unknown'}, {pet.address?.city?.city_state?.state?.name || ''}
                                        </span>
                                    </div>
                                </div>

                                <div className="card-actions mt-2 sm:mt-4">
                                    <Link href={`/adopt-a-pet/${pet.id}`} passHref className="w-full">
                                        <button className="btn bg-primary-1 hover:bg-[#453823ed] w-full py-2 sm:py-3 text-sm sm:text-lg font-semibold rounded-lg text-[#BAA378]">
                                            Adopt Now
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default NearbyPets;