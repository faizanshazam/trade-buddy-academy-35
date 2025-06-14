import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, Clock, Users, Star, MessageCircle, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import ChatPopup from "@/components/ChatPopup";

const CourseDetails = () => {
  const { courseId } = useParams();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showChat, setShowChat] = useState(false);

  // Mock data for course details
  const course = {
    id: 1,
    title: "Advanced Options Trading Strategies",
    description: "Master complex options strategies for consistent profits",
    price: 4999,
    duration: "8 weeks",
    level: "Advanced",
    enrolledStudents: 85,
    language: "English",
    features: [
      "In-depth options strategies",
      "Risk management techniques",
      "Live trading sessions",
      "Q&A with the instructor"
    ],
    instructor: {
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
    }
  };

  // Mock data for time slots
  const timeSlots = [
    { id: 1, time: "6:00 PM - 7:00 PM", date: "Mon, Nov 25" },
    { id: 2, time: "7:00 PM - 8:00 PM", date: "Wed, Nov 27" },
    { id: 3, time: "8:00 PM - 9:00 PM", date: "Fri, Nov 29" }
  ];

  // Mock data for weekly progress
  const weeks = [
    {
      id: 1,
      title: "Introduction to Options",
      description: "Understanding the basics of options trading",
      status: "completed"
    },
    {
      id: 2,
      title: "Advanced Strategies",
      description: "Learn advanced options trading strategies",
      status: "current"
    },
    {
      id: 3,
      title: "Risk Management",
      description: "Managing risk in options trading",
      status: "upcoming"
    },
    {
      id: 4,
      title: "Live Trading Session",
      description: "Participate in a live trading session",
      status: "upcoming"
    }
  ];

  const handleEnroll = () => {
    if (!selectedTimeSlot) {
      toast.error("Please select a time slot before enrolling");
      return;
    }
    
    setIsEnrolled(true);
    toast.success("Successfully enrolled in the course!");
  };

  const handleContactInstructor = () => {
    setShowChat(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
                    <p className="text-gray-600 text-lg">{course.description}</p>
                  </div>
                  {isEnrolled && (
                    <Badge className="bg-green-100 text-green-800">
                      Enrolled
                    </Badge>
                  )}
                </div>
              </CardHeader>
            </Card>

            {/* Instructor Card - Improved Design */}
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={course.instructor.photo} alt={course.instructor.name} />
                    <AvatarFallback>{course.instructor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      Meet Your Instructor
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg font-medium text-blue-600">{course.instructor.name}</span>
                      {course.instructor.sebiVerified && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                          <Check className="w-3 h-3 mr-1" />
                          SEBI
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span>{course.instructor.rating}</span>
                      </div>
                      <span>•</span>
                      <span>{course.instructor.experience}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{course.instructor.studentsCount} students</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Speciality:</strong> {course.instructor.speciality}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Languages:</strong> {course.instructor.languages.join(", ")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      <strong>Qualification:</strong> {course.instructor.qualification}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Link to={`/trader/${course.instructor.id}`}>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      View Profile
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleContactInstructor}
                    className="flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Contact Instructor
                  </Button>
                  <Link to={`/trader/${course.instructor.id}/courses`}>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      All Courses
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Progress Section - Only show if enrolled */}
            {isEnrolled && (
              <Card>
                <CardHeader>
                  <CardTitle>Course Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Overall Progress</span>
                        <span>30%</span>
                      </div>
                      <Progress value={30} className="w-full" />
                    </div>
                    
                    {/* Weekly Progress */}
                    <div className="space-y-3">
                      {weeks.map((week) => (
                        <div key={week.id} className="flex items-center gap-3 p-3 rounded-lg border">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            week.status === 'completed' ? 'bg-green-100 text-green-600' :
                            week.status === 'current' ? 'bg-blue-100 text-blue-600' :
                            'bg-gray-100 text-gray-400'
                          }`}>
                            {week.status === 'completed' ? (
                              <Check className="w-4 h-4" />
                            ) : week.status === 'current' ? (
                              <Clock className="w-4 h-4" />
                            ) : (
                              week.id
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{week.title}</h4>
                            <p className="text-sm text-gray-600">{week.description}</p>
                          </div>
                          <Badge variant={
                            week.status === 'completed' ? 'default' :
                            week.status === 'current' ? 'secondary' :
                            'outline'
                          }>
                            {week.status === 'completed' ? 'Completed' :
                             week.status === 'current' ? 'In Progress' :
                             'Upcoming'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Course Features */}
            <Card>
              <CardHeader>
                <CardTitle>What You'll Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {course.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Enrollment Card */}
            {!isEnrolled ? (
              <Card>
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-gray-900 mb-4">₹{course.price}</div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Time Slot
                      </label>
                      <select
                        value={selectedTimeSlot}
                        onChange={(e) => setSelectedTimeSlot(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Choose a time slot</option>
                        {timeSlots.map((slot) => (
                          <option key={slot.id} value={slot.time}>
                            {slot.time} ({slot.date})
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700" 
                      size="lg"
                      onClick={handleEnroll}
                    >
                      Enroll Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <Badge className="bg-green-100 text-green-800 mb-4">
                    <Check className="w-4 h-4 mr-1" />
                    Enrolled Successfully
                  </Badge>
                  <p className="text-gray-600 mb-4">You have access to all course materials</p>
                  <Link to={`/session/${courseId}`}>
                    <Button className="w-full">
                      Join Live Session
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}

            {/* Course Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Course Information</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{course.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Level:</span>
                    <span className="font-medium">{course.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Students:</span>
                    <span className="font-medium">{course.enrolledStudents}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Language:</span>
                    <span className="font-medium">{course.language}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {showChat && (
        <ChatPopup
          mentorName={course.instructor.name}
          mentorId={course.instructor.id}
          onClose={() => setShowChat(false)}
        />
      )}
    </div>
  );
};

export default CourseDetails;
