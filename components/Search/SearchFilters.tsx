// @ts-nocheck
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

function SearchFilters({ 
    onStateChange, 
    onCityChange,
    petCategory 
}: { 
    onStateChange: (stateId: string) => void;
    onCityChange: (cityId: string) => void;
    petCategory: number;
}) {
    const headingStyles = 'mb-4 uppercase leading-relaxed text-[#4d4751] text-xl font-bold';
    const selectStyles = 'mb-6 text-base capitalize px-3 py-2 w-full border border-gray-300 rounded focus:outline-none';

    const [statesData, setStatesData] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');

    const router = useRouter();

    useEffect(() => {
        const fetchStates = async () => {
            try {
                const response = await axios.get('https://thepetnest.com/api/v1/pets/state_cities');
                setStatesData(response.data.data);
            } catch (error) {
                console.error('Error fetching states and cities:', error);
            }
        };

        fetchStates();
    }, []);

    const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedStateName = e.target.value;
        setSelectedState(selectedStateName);
        setSelectedCity('');
        
        const selectedStateObj = statesData.find((state: any) => state.name === selectedStateName);
        if (selectedStateObj) {
            setCities(selectedStateObj.cities || []);
            onStateChange(selectedStateObj.id); 
            onCityChange('');
        }
    };

    const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCityName = e.target.value;
        setSelectedCity(selectedCityName);

        const selectedCityObj = cities.find((city: any) => city.name === selectedCityName);
        if (selectedCityObj) {
            onCityChange(selectedCityObj.id);
        }
    };

    const handlePetCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newCategory = e.target.value;
        if (newCategory === "1") {
            router.push('/adopt-a-dog');
        } else if (newCategory === "2") {
            router.push('/adopt-a-cat');
        }
    };

    return (
        <div className='hidden md:block border border-[#e0e0e0] p-4 w-1/5 mt-2 mb-8 h-full relative bg-white rounded shadow-sm'>
            <div>
                <h2 className={headingStyles}>Pet Type</h2>
                <select 
            value={petCategory}
            onChange={handlePetCategoryChange}
            className={selectStyles}
        >
            <option value="1">Dog</option>
            <option value="2">Cat</option>
        </select>
            </div>

            <div>
                <h2 className={headingStyles}>Search by State</h2>
                <select value={selectedState} onChange={handleStateChange} className={selectStyles}>
                    <option disabled value="">Select State</option>
                    {statesData.map((state: any) => (
                        <option key={state.id} value={state.name}>
                            {state.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <h2 className={headingStyles}>Search by City</h2>
                <select defaultValue="" onChange={handleCityChange} className={selectStyles}>
                    <option disabled value="">Select City</option>
                    {cities.map((city: any) => (
                        <option key={city.id} value={city.name}>
                            {city.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default SearchFilters;
