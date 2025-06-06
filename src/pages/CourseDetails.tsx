
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Clock, Users, Calendar, MessageSquare } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  // Mock course data
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
      { day: "Week 1", topic: "Options Fundamentals" },
      { day: "Week 2", topic: "Basic Strategies" },
      { day: "Week 3", topic: "Advanced Strategies" },
      { day: "Week 4", topic: "Risk Management" }
    ]
  };

  const availableSlots = [
    "Today 6:00 PM",
    "Tomorrow 6:00 PM", 
    "Dec 15, 6:00 PM",
    "Dec 16, 6:00 PM",
    "Dec 17, 6:00 PM"
  ];

  const handleEnrollNow = () => {
    navigate(`/checkout?courseId=${courseId}&traderId=${course.instructorId}`);
  };

  const handleContactInstructor = () => {
    navigate(`/trader/${course.instructorId}`);
  };

  const handleSlotSelect = (slot: string) => {
    console.log("Selected slot:", slot);
    // Handle slot selection
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Header */}
            <Card>
              <CardContent className="p-8">
                <Badge className="mb-4">{course.type}</Badge>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
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

            {/* Course Schedule */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Course Schedule</h2>
                <div className="space-y-4">
                  {course.schedule.map((week, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-20 text-sm font-medium text-gray-600">{week.day}</div>
                      <div className="flex-1 text-gray-900">{week.topic}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
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
              </CardContent>
            </Card>

            {/* Available Slots */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Available Time Slots</h3>
                <div className="space-y-2">
                  {availableSlots.map((slot, index) => (
                    <button
                      key={index}
                      className="w-full p-3 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                      onClick={() => handleSlotSelect(slot)}
                    >
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{slot}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
