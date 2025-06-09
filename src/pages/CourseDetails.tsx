
import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Clock, Users, Calendar, MessageSquare, CheckCircle, PlayCircle, Lock, ExternalLink, User } from "lucide-react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import CourseChat from "@/components/CourseChat";

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const showChat = searchParams.get('chat') === 'true';
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  
  // Mock enrollment status - in real app this would come from user data
  const [isEnrolled, setIsEnrolled] = useState(false);

  // Mock course data with progress tracking
  const course = {
    id: 1,
    title: "Complete Options Trading Mastery",
    instructor: "Rajesh Kumar",
    instructorId: 1,
    type: "Full Course",
    price: "₹12,999",
    duration: "15-20 hours",
    format: "Live + Recorded",
    description: "Master the art of options trading with comprehensive coverage from basics to advanced strategies. This course includes live sessions, recorded content, and ongoing mentorship support.",
    whatYouLearn: [
      "Options basics and terminology",
      "Various options strategies", 
      "Risk management techniques",
      "Technical analysis for options",
      "Portfolio hedging strategies",
      "Real-time trade execution"
    ],
    included: [
      "15-20 hours of live sessions",
      "Recorded video access for 1 year",
      "1-month group chat mentorship",
      "Trading tools and calculators",
      "Real trading examples",
      "Certificate of completion"
    ],
    schedule: [
      { 
        week: "Week 1", 
        topic: "Options Fundamentals", 
        status: isEnrolled ? "completed" : "locked",
        classes: ["Introduction to Options", "Call & Put Options", "Options Pricing"]
      },
      { 
        week: "Week 2", 
        topic: "Basic Strategies", 
        status: isEnrolled ? "completed" : "locked",
        classes: ["Covered Calls", "Protective Puts", "Long Straddles"]
      },
      { 
        week: "Week 3", 
        topic: "Advanced Strategies", 
        status: isEnrolled ? "current" : "locked",
        classes: ["Iron Condors", "Butterfly Spreads", "Calendar Spreads"]
      },
      { 
        week: "Week 4", 
        topic: "Risk Management", 
        status: isEnrolled ? "upcoming" : "locked",
        classes: ["Position Sizing", "Portfolio Hedging", "Exit Strategies"]
      }
    ]
  };

  const availableSlots = [
    { id: "1", time: "Today 6:00 PM", available: true },
    { id: "2", time: "Tomorrow 6:00 PM", available: true },
    { id: "3", time: "Dec 15, 6:00 PM", available: false },
    { id: "4", time: "Dec 16, 6:00 PM", available: true },
    { id: "5", time: "Dec 17, 6:00 PM", available: true }
  ];

  const handleEnrollNow = () => {
    if (!selectedSlot) {
      toast({
        title: "Select Time Slot",
        description: "Please select a time slot before enrolling",
        variant: "destructive",
      });
      return;
    }

    // Simulate enrollment process
    const success = Math.random() > 0.2; // 80% success rate for demo
    
    if (success) {
      setIsEnrolled(true);
      toast({
        title: "Enrollment Successful! 🎉",
        description: `You're enrolled for ${selectedSlot}. Welcome to the course!`,
      });
    } else {
      toast({
        title: "Enrollment Failed",
        description: "Unable to process enrollment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleContactInstructor = () => {
    navigate(`/trader/${course.instructorId}`);
  };

  const handleViewTraderProfile = () => {
    navigate(`/trader/${course.instructorId}`);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "current":
        return <PlayCircle className="w-5 h-5 text-blue-500" />;
      case "upcoming":
        return <Clock className="w-5 h-5 text-orange-500" />;
      case "locked":
        return <Lock className="w-5 h-5 text-gray-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-50 border-green-200";
      case "current":
        return "bg-blue-50 border-blue-200";
      case "upcoming":
        return "bg-orange-50 border-orange-200";
      case "locked":
        return "bg-gray-50 border-gray-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 main-content">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Header */}
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Badge className="bg-blue-100 text-blue-800">{course.type}</Badge>
                  {isEnrolled && (
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Enrolled
                    </Badge>
                  )}
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
                
                {/* Instructor Info */}
                <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">Instructor</p>
                    <h3 className="font-semibold text-gray-900">{course.instructor}</h3>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleViewTraderProfile}
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Profile
                  </Button>
                </div>
                
                <p className="text-lg text-gray-600 mb-6">{course.description}</p>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{course.format}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>Group Support</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What You'll Learn */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">What You'll Learn</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {course.whatYouLearn.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Course Progress & Schedule */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">
                  {isEnrolled ? "Your Progress & Schedule" : "Course Curriculum"}
                </h2>
                {!isEnrolled && (
                  <p className="text-sm text-gray-600 mb-4">
                    Enroll now to unlock all course content and track your progress
                  </p>
                )}
                <div className="space-y-4">
                  {course.schedule.map((week, index) => (
                    <div key={index} className={`p-6 rounded-lg border-2 ${getStatusColor(week.status)}`}>
                      <div className="flex items-center gap-4 mb-4">
                        {getStatusIcon(week.status)}
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-semibold text-gray-900">{week.week}</h3>
                            {isEnrolled && (
                              <Badge variant={week.status === "current" ? "default" : "secondary"}>
                                {week.status === "completed" ? "Completed" : 
                                 week.status === "current" ? "In Progress" : 
                                 week.status === "upcoming" ? "Upcoming" : "Locked"}
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-700 font-medium">{week.topic}</p>
                        </div>
                      </div>
                      <div className="ml-9">
                        <p className="text-sm text-gray-600 mb-2">Classes:</p>
                        <div className="flex flex-wrap gap-2">
                          {week.classes.map((className, classIndex) => (
                            <Badge 
                              key={classIndex} 
                              variant="outline" 
                              className={`text-xs ${
                                !isEnrolled ? "bg-gray-100 text-gray-500" :
                                week.status === "completed" ? "bg-green-100 text-green-700" :
                                week.status === "current" ? "bg-blue-100 text-blue-700" :
                                week.status === "upcoming" ? "bg-orange-100 text-orange-700" :
                                "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {className}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Chat Section */}
            {showChat && (
              <CourseChat 
                mentorName={course.instructor}
                courseTitle={course.title}
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{course.price}</div>
                  <p className="text-gray-600">One-time payment</p>
                </div>
                
                <div className="space-y-4 mb-6">
                  <h3 className="font-semibold text-gray-900">This course includes:</h3>
                  {course.included.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{item}</span>
                    </div>
                  ))}
                </div>

                {!isEnrolled ? (
                  <>
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700 mb-4"
                      onClick={handleEnrollNow}
                    >
                      Enroll Now
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={handleContactInstructor}
                    >
                      Contact Instructor
                    </Button>
                  </>
                ) : (
                  <div className="space-y-3">
                    <Button className="w-full bg-green-600 hover:bg-green-700" disabled>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Enrolled
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={handleContactInstructor}
                    >
                      Contact Instructor
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Available Slots - Only show if not enrolled */}
            {!isEnrolled && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Select Time Slot</h3>
                  <div className="space-y-2">
                    {availableSlots.map((slot) => (
                      <button
                        key={slot.id}
                        disabled={!slot.available}
                        className={`w-full p-3 text-left border rounded-lg transition-colors ${
                          !slot.available 
                            ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                            : selectedSlot === slot.time
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                        }`}
                        onClick={() => slot.available && setSelectedSlot(slot.time)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">{slot.time}</span>
                          </div>
                          {selectedSlot === slot.time && (
                            <CheckCircle className="w-4 h-4 text-blue-600" />
                          )}
                          {!slot.available && (
                            <Badge variant="secondary" className="text-xs">Full</Badge>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
