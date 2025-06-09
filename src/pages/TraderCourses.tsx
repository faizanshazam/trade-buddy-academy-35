import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, Users, Star, Clock, BookOpen, ArrowLeft } from "lucide-react";

const TraderCourses = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock trader data
  const trader = {
    id: 1,
    name: "Rajesh Kumar",
    photo: "/placeholder.svg",
    rating: 4.9,
    languages: ["Hindi", "English"],
    qualification: "CFA, MBA Finance",
    sebiVerified: true,
    speciality: "Options Trading",
    experience: "8+ years",
    studentsCount: 150,
    totalCourses: 5
  };

  // Mock courses data
  const courses = [
    {
      id: 1,
      title: "Advanced Options Trading Strategies",
      description: "Master complex options strategies for consistent profits",
      price: 4999,
      duration: "8 weeks",
      level: "Advanced",
      enrolledStudents: 85,
      rating: 4.8,
      thumbnail: "/placeholder.svg",
      status: "active",
      nextBatch: "Dec 15, 2024"
    },
    {
      id: 2,
      title: "Options Basics for Beginners",
      description: "Complete guide to understanding options trading from scratch",
      price: 2999,
      duration: "4 weeks",
      level: "Beginner",
      enrolledStudents: 120,
      rating: 4.9,
      thumbnail: "/placeholder.svg",
      status: "active",
      nextBatch: "Dec 20, 2024"
    },
    {
      id: 3,
      title: "Risk Management in Trading",
      description: "Learn to protect your capital with proven risk management techniques",
      price: 3499,
      duration: "6 weeks",
      level: "Intermediate",
      enrolledStudents: 95,
      rating: 4.7,
      thumbnail: "/placeholder.svg",
      status: "active",
      nextBatch: "Jan 5, 2025"
    },
    {
      id: 4,
      title: "Market Psychology & Trading",
      description: "Understanding market emotions and behavioral patterns",
      price: 3999,
      duration: "5 weeks",
      level: "Intermediate",
      enrolledStudents: 67,
      rating: 4.8,
      thumbnail: "/placeholder.svg",
      status: "coming_soon",
      nextBatch: "Jan 15, 2025"
    },
    {
      id: 5,
      title: "Advanced Technical Analysis",
      description: "Deep dive into chart patterns and technical indicators",
      price: 4499,
      duration: "10 weeks",
      level: "Advanced",
      enrolledStudents: 45,
      rating: 4.9,
      thumbnail: "/placeholder.svg",
      status: "coming_soon",
      nextBatch: "Feb 1, 2025"
    }
  ];

  const activeCourses = courses.filter(course => course.status === 'active');
  const upcomingCourses = courses.filter(course => course.status === 'coming_soon');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Trader Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start gap-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={trader.photo} alt={trader.name} />
                <AvatarFallback>{trader.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{trader.name}</h1>
                  {trader.sebiVerified && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <Check className="w-4 h-4 mr-1" />
                      SEBI Verified
                    </Badge>
                  )}
                </div>
                <p className="text-xl text-blue-600 mb-3">{trader.speciality}</p>
                <div className="flex items-center gap-6 text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="font-medium">{trader.rating}</span>
                  </div>
                  <span>•</span>
                  <span>{trader.experience}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Users className="w-5 h-5" />
                    <span>{trader.studentsCount} students</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-5 h-5" />
                    <span>{trader.totalCourses} courses</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Qualification: </span>
                    <span className="font-medium">{trader.qualification}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Languages: </span>
                    <span className="font-medium">{trader.languages.join(", ")}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Link to={`/trader/${trader.id}`}>
                  <Button variant="outline">View Profile</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Courses */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Active Courses</h2>
            <Badge className="bg-green-100 text-green-800">
              {activeCourses.length} Available
            </Badge>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeCourses.map((course) => (
              <Link key={course.id} to={`/course/${course.id}`} className="block">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="aspect-video bg-gradient-to-br from-blue-500 to-blue-600 rounded-t-lg flex items-center justify-center">
                    <BookOpen className="w-12 h-12 text-white" />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <Badge className={`text-xs ${
                        course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                        course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {course.level}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span>{course.rating}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                    
                    <div className="space-y-2 mb-4 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span className="font-medium">{course.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Students:</span>
                        <span className="font-medium">{course.enrolledStudents}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Next Batch:</span>
                        <span className="font-medium">{course.nextBatch}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="text-2xl font-bold text-gray-900">₹{course.price}</div>
                      <Button 
                        size="sm" 
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={(e) => e.preventDefault()}
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Upcoming Courses */}
        {upcomingCourses.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Upcoming Courses</h2>
              <Badge variant="outline" className="border-orange-300 text-orange-700">
                <Clock className="w-4 h-4 mr-1" />
                Coming Soon
              </Badge>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingCourses.map((course) => (
                <Link key={course.id} to={`/course/${course.id}`} className="block">
                  <Card className="opacity-75 hover:opacity-100 transition-opacity cursor-pointer">
                    <div className="aspect-video bg-gradient-to-br from-gray-400 to-gray-500 rounded-t-lg flex items-center justify-center">
                      <Clock className="w-12 h-12 text-white" />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <Badge variant="outline" className="border-orange-300 text-orange-700 text-xs">
                          {course.level}
                        </Badge>
                        <Badge variant="outline" className="border-orange-300 text-orange-700 text-xs">
                          Coming Soon
                        </Badge>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                      
                      <div className="space-y-2 mb-4 text-sm text-gray-600">
                        <div className="flex justify-between">
                          <span>Duration:</span>
                          <span className="font-medium">{course.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Launch Date:</span>
                          <span className="font-medium">{course.nextBatch}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="text-2xl font-bold text-gray-900">₹{course.price}</div>
                        <Button size="sm" variant="outline" disabled>
                          Notify Me
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TraderCourses;
