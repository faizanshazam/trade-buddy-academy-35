
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

export const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Learn Trading from
          <span className="text-blue-600 block">Verified Traders</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Master the art of trading with personalized courses and mentorship from 
          SEBI-verified professionals. From beginner basics to advanced strategies.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link to="/courses">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
            >
              Explore Courses
            </Button>
          </Link>
          <Link to="/explore">
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-3"
            >
              Browse Mentors
            </Button>
          </Link>
        </div>
        
        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>SEBI Verified Trainers</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>500+ Successful Students</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>4.8★ Average Rating</span>
          </div>
        </div>
      </div>
    </section>
  );
};
