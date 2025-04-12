'use client'
import Hero from "@/components/Home/Hero";
import NearbyPets from "@/components/Home/Nearby";
import Subscribe from "@/components/Home/Subscribe";
import LearnMore from "@/components/LearnMore";
import Image from "next/image";

export default function Home() {
  return (
    <div className="p-5 sm:px-10 md:px-20">
      <Hero />
      <NearbyPets />
      <LearnMore />
      <Subscribe />
    </div>
  );
}
