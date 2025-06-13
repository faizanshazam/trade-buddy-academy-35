import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Users, Clock, MessageSquare, ExternalLink, Upload, TrendingUp, BarChart3, X } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const TraderProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const [tradingCharts, setTradingCharts] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

  const handleBackgroundUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
<<<<<<< HEAD
      console.log('Background file selected:', file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        console.log('Background file loaded successfully');
        setBackgroundImage(result);
      };
      reader.onerror = (error) => {
        console.error('Error reading background file:', error);
=======
      const reader = new FileReader();
      reader.onload = (e) => {
        setBackgroundImage(e.target?.result as string);
>>>>>>> 3965d7d (feat: Add trader profile enhancements)
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChartUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setTradingCharts(prev => [...prev, e.target?.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

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
        {/* Trader Profile Header with Background */}
        <Card className="mb-8 overflow-hidden">
          <div 
            className="relative bg-gradient-to-r from-blue-600 to-blue-800 p-8"
            style={backgroundImage ? {
              backgroundImage: `linear-gradient(rgba(37, 99, 235, 0.8), rgba(29, 78, 216, 0.8)), url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            } : {}}
          >
            {/* Background Upload Button */}
            <div className="absolute top-4 right-4">
              <label htmlFor="background-upload" className="cursor-pointer">
                <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                  <Upload className="w-4 h-4 mr-2" />
                  Change Background
                </Button>
                <input
                  id="background-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleBackgroundUpload}
                  className="hidden"
                />
              </label>
            </div>

            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src={trader.photo}
                  alt={trader.name}
                  className="w-32 h-32 rounded-full object-cover mx-auto md:mx-0 border-4 border-white shadow-lg"
                />
                <div className="flex-1 text-center md:text-left text-white">
                  <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                    <h1 className="text-3xl font-bold">{trader.name}</h1>
                    {trader.sebiVerified && (
                      <Badge className="bg-green-500 text-white border-green-400">
                        <Check className="w-3 h-3 mr-1" />
                        SEBI Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-xl font-semibold mb-2 text-blue-100">{trader.speciality}</p>
                  <div className="flex items-center justify-center md:justify-start gap-4 mb-4 text-blue-100">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span>{trader.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{trader.studentsCount} students</span>
                    </div>
                    <span>{trader.experience}</span>
                  </div>
                  <p className="mb-4 text-blue-50">{trader.bio}</p>
                  <div className="space-y-2 text-sm mb-4 text-blue-100">
                    <p><strong>Qualification:</strong> {trader.qualification}</p>
                    <p><strong>Languages:</strong> {trader.languages.join(", ")}</p>
                    <p><strong>Availability:</strong> {trader.availability}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      variant="secondary" 
                      onClick={handleContactInstructor}
                      className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white border-white/30"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Contact Instructor
                    </Button>
                    <Button 
                      onClick={handleExternalProfile}
                      className="flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View External Profile
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>

        {/* Trading Performance Charts Section - Image Grid */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Trading Performance</h2>
              </div>
              <label htmlFor="chart-upload" className="cursor-pointer">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Upload Charts
                </Button>
                <input
                  id="chart-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleChartUpload}
                  className="hidden"
                />
              </label>
            </div>

            {tradingCharts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {tradingCharts.map((chart, index) => (
                  <div 
                    key={index} 
                    className="relative bg-white rounded-lg border shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow group"
                    onClick={() => handleImageClick(chart)}
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={chart}
                        alt={`Trading Chart ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-white rounded-full p-2 shadow-lg">
                          <BarChart3 className="w-5 h-5 text-blue-600" />
                        </div>
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-medium text-gray-700">Chart {index + 1}</p>
                      <p className="text-xs text-gray-500">Click to view full size</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Trading Charts Yet</h3>
                <p className="text-gray-600 mb-4">Upload your trading performance charts to showcase your expertise</p>
                <label htmlFor="chart-upload-center" className="cursor-pointer">
                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Your First Chart
                  </Button>
                  <input
                    id="chart-upload-center"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleChartUpload}
                    className="hidden"
                  />
                </label>
              </div>
            )}
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

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={handleCloseModal}
              className="absolute -top-4 -right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors z-10"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
            <img
              src={selectedImage}
              alt="Trading Chart Full View"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TraderProfile;
