
import { useState } from "react";
import Navigation from "@/components/Navigation";
import { FilterTabs } from "@/components/FilterTabs";
import { TraderCard } from "@/components/TraderCard";

const Explore = () => {
  const [activeFilter, setActiveFilter] = useState("Full Course");

  // Extended mock data for traders/mentors
  const traders = [
    {
      id: 1,
      name: "Rajesh Kumar",
      photo: "/placeholder.svg",
      rating: 4.9,
      languages: ["Hindi", "English"],
      qualification: "CFA, MBA Finance",
      sebiVerified: true,
      speciality: "Options Trading",
      experience: "8+ years",
      studentsCount: 150
    },
    {
      id: 2,
      name: "Priya Sharma",
      photo: "/placeholder.svg",
      rating: 4.8,
      languages: ["English", "Tamil"],
      qualification: "CA, FRM",
      sebiVerified: true,
      speciality: "Equity Research",
      experience: "6+ years",
      studentsCount: 200
    },
    {
      id: 3,
      name: "Amit Gupta",
      photo: "/placeholder.svg",
      rating: 4.7,
      languages: ["Hindi", "English"],
      qualification: "CFA, NISM",
      sebiVerified: true,
      speciality: "Technical Analysis",
      experience: "10+ years",
      studentsCount: 300
    },
    {
      id: 4,
      name: "Neha Patel",
      photo: "/placeholder.svg",
      rating: 4.9,
      languages: ["English", "Gujarati"],
      qualification: "MBA, CFA",
      sebiVerified: true,
      speciality: "Swing Trading",
      experience: "7+ years",
      studentsCount: 180
    },
    {
      id: 5,
      name: "Vikram Singh",
      photo: "/placeholder.svg",
      rating: 4.6,
      languages: ["Hindi", "English", "Punjabi"],
      qualification: "NISM, FRM",
      sebiVerified: true,
      speciality: "Intraday Trading",
      experience: "5+ years",
      studentsCount: 250
    },
    {
      id: 6,
      name: "Anita Reddy",
      photo: "/placeholder.svg",
      rating: 4.8,
      languages: ["English", "Telugu"],
      qualification: "CA, CFA",
      sebiVerified: true,
      speciality: "Commodity Trading",
      experience: "9+ years",
      studentsCount: 120
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore Trading Experts</h1>
          <p className="text-gray-600">Find the perfect mentor for your trading journey</p>
        </div>
        
        <FilterTabs activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {traders.map((trader) => (
            <TraderCard key={trader.id} trader={trader} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;
