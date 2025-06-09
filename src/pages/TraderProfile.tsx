import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Users, Clock, MessageSquare, ExternalLink } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

const TraderProfile = () => {
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
    bio: "Expert in options trading with 8+ years of experience in Indian markets. Specialized in systematic trading strategies and risk management.",
    availability: "Monday to Friday, 6 PM - 9 PM",
    externalProfile: `https://stocksensei.in/trader${id}`
  };

  const courses = [
    {
      id: 1,
      type: "Full Course",
      title: "Complete Options Trading Mastery",
      description: "Learn everything from basics to advanced options strategies",
      duration: "15-20 hours + 1 month group chat",
      price: "₹12,999",
      included: ["Live sessions", "Recorded videos", "Group mentorship", "Trading tools"]
    },
    {
      id: 2,
      type: "Mentorship Only",
      title: "Personal Trading Mentorship",
      description: "One-on-one guidance for your trading journey",
      duration: "1 month",
      price: "₹8,999",
      included: ["Weekly 1:1 calls", "Portfolio review", "Strategy guidance"]
    },
    {
      id: 3,
      type: "1:1 Session",
      title: "Single Consultation Session",
      description: "Get expert advice on specific trading questions",
      duration: "1 hour",
      price: "₹1,999",
      included: ["Live consultation", "Strategy review", "Q&A session"]
    },
    {
      id: 4,
      type: "Full Course",
      title: "Advanced Options Strategies",
      description: "Master complex options strategies for professional trading",
      duration: "12-15 hours + 2 weeks group chat",
      price: "₹15,999",
      included: ["Advanced strategies", "Live market analysis", "Risk management", "Pro tools"]
    },
    {
      id: 5,
      type: "Workshop",
      title: "Weekend Options Workshop",
      description: "Intensive weekend workshop on options trading",
      duration: "2 days (16 hours)",
      price: "₹5,999",
      included: ["Weekend sessions", "Hands-on practice", "Trading simulator", "Resources"]
    }
  ];

  const handleBookNow = (courseId: number) => {
    navigate(`/course/${courseId}?traderId=${id}`);
  };

  const handleContactInstructor = () => {
    navigate(`/contact?subject=Contact%20${trader.name}`);
  };

  const handleExternalProfile = () => {
    window.open(trader.externalProfile, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Trader Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={trader.photo}
                alt={trader.name}
                className="w-32 h-32 rounded-full object-cover mx-auto md:mx-0"
              />
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{trader.name}</h1>
                  {trader.sebiVerified && (
                    <Badge className="bg-green-100 text-green-800">
                      <Check className="w-3 h-3 mr-1" />
                      SEBI Verified
                    </Badge>
                  )}
                </div>
                <p className="text-xl text-blue-600 font-semibold mb-2">{trader.speciality}</p>
                <div className="flex items-center justify-center md:justify-start gap-4 text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>{trader.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{trader.studentsCount} students</span>
                  </div>
                  <span>{trader.experience}</span>
                </div>
                <p className="text-gray-600 mb-4">{trader.bio}</p>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <p><strong>Qualification:</strong> {trader.qualification}</p>
                  <p><strong>Languages:</strong> {trader.languages.join(", ")}</p>
                  <p><strong>Availability:</strong> {trader.availability}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    variant="outline" 
                    onClick={handleContactInstructor}
                    className="flex items-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Contact Instructor
                  </Button>
                  <Button 
                    onClick={handleExternalProfile}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View External Profile
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Course Cards */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Available Courses & Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Badge className="mb-3">{course.type}</Badge>
                  <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm font-medium text-gray-700">What's included:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {course.included.map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <Check className="w-3 h-3 text-green-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">{course.price}</span>
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleBookNow(course.id)}
                    >
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TraderProfile;
