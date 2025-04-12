'use client'
import Hero from "@/components/Home/Hero";
import LearnMore from "@/components/LearnMore";
import PetsList from "@/components/Search/PetsList";
import SearchFilters from "@/components/Search/SearchFilters";
import Image from "next/image";
import React, { useEffect, useState } from 'react';

export default function AdoptCat() {
  const [selectedCityId, setSelectedCityId] = useState<string | null>(null);
  const [selectedStateId, setSelectedStateId] = useState<string | null>(null);

  const petCategory = 2; //2 for Cat
  return (
    <div className="mx-5 flex justify-evenly mt-[30px] min-h-[calc(100vh-100px)]">
     <SearchFilters 
                onStateChange={setSelectedStateId} 
                onCityChange={setSelectedCityId} 
                petCategory={petCategory}
            />
      <PetsList
              stateId={selectedStateId} 
              cityId={selectedCityId} 
              petCategory={petCategory}
          />
    </div>
  );
}
