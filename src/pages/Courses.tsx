
import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { FilterTabs } from "@/components/FilterTabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const [activeFilter, setActiveFilter] = useState("Full Course");
  const navigate = useNavigate();

  const courses = [
    {
      id: 1,
      title: "Complete Options Trading Mastery",
      instructor: "Rajesh Kumar",
      instructorId: 1,
      type: "Full Course",
      price: "₹12,999",
      originalPrice: "₹15,999",
      duration: "15-20 hours",
      rating: 4.9,
      studentsCount: 150,
      image: "/placeholder.svg",
      description: "Master the art of options trading with comprehensive coverage from basics to advanced strategies.",
      level: "Beginner to Advanced"
    },
    {
      id: 2,
      title: "Personal Trading Mentorship",
      instructor: "Priya Sharma",
      instructorId: 2,
      type: "Mentorship Only",
      price: "₹8,999",
      originalPrice: "₹10,999",
      duration: "1 month",
      rating: 4.8,
      studentsCount: 200,
      image: "/placeholder.svg",
      description: "One-on-one guidance for your personal trading journey with expert mentorship.",
      level: "All Levels"
    },
    {
      id: 3,
      title: "Single Consultation Session",
      instructor: "Amit Gupta",
      instructorId: 3,
      type: "1:1 Session",
      price: "₹1,999",
      originalPrice: "₹2,499",
      duration: "1 hour",
      rating: 4.7,
      studentsCount: 300,
      image: "/placeholder.svg",
      description: "Get expert advice on specific trading questions in a focused consultation.",
      level: "All Levels"
    },
    {
      id: 4,
      title: "Advanced Options Strategies",
      instructor: "Neha Patel",
      instructorId: 4,
      type: "Full Course",
      price: "₹15,999",
      originalPrice: "₹18,999",
      duration: "12-15 hours",
      rating: 4.9,
      studentsCount: 180,
      image: "/placeholder.svg",
      description: "Master complex options strategies for professional trading with advanced techniques.",
      level: "Advanced"
    },
    {
      id: 5,
      title: "Weekend Options Workshop",
      instructor: "Vikram Singh",
      instructorId: 5,
      type: "Workshop",
      price: "₹5,999",
      originalPrice: "₹7,499",
      duration: "2 days (16 hours)",
      rating: 4.6,
      studentsCount: 250,
      image: "/placeholder.svg",
      description: "Intensive weekend workshop covering practical options trading strategies.",
      level: "Intermediate"
    },
    {
      id: 6,
      title: "Commodity Trading Essentials",
      instructor: "Anita Reddy",
      instructorId: 6,
      type: "Full Course",
      price: "₹10,999",
      originalPrice: "₹13,499",
      duration: "10-12 hours",
      rating: 4.8,
      studentsCount: 120,
      image: "/placeholder.svg",
      description: "Learn the fundamentals of commodity trading with real market examples.",
      level: "Beginner"
    }
  ];

  const filteredCourses = courses.filter(course => {
    if (activeFilter === "All") return true;
    return course.type === activeFilter;
  });

  const handleCourseClick = (courseId: number, instructorId: number) => {
    navigate(`/course/${courseId}?traderId=${instructorId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Courses</h1>
          <p className="text-gray-600">Discover comprehensive trading courses from expert mentors</p>
        </div>
        
        <FilterTabs activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredCourses.map((course) => (
            <Card 
              key={course.id} 
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => handleCourseClick(course.id, course.instructorId)}
            >
              <CardContent className="p-0">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-6">
                  <Badge className="mb-3">{course.type}</Badge>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 mb-3 text-sm">{course.description}</p>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <span className="font-medium">By {course.instructor}</span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{course.studentsCount}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="outline">{course.level}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-blue-600">{course.price}</span>
                      <span className="text-sm text-gray-500 line-through">{course.originalPrice}</span>
                    </div>
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCourseClick(course.id, course.instructorId);
                      }}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
