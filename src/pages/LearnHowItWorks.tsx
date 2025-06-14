
import { Navigation } from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Users, BookOpen, MessageSquare, TrendingUp, Star, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const LearnHowItWorks = () => {
  const steps = [
    {
      icon: <Users className="w-12 h-12 text-blue-600" />,
      title: "Explore Expert Traders",
      description: "Browse through our verified SEBI-registered trading experts and mentors with proven track records."
    },
    {
      icon: <BookOpen className="w-12 h-12 text-blue-600" />,
      title: "Choose Your Learning Path",
      description: "Select from full courses, mentorship programs, or one-on-one sessions based on your needs and experience level."
    },
    {
      icon: <MessageSquare className="w-12 h-12 text-blue-600" />,
      title: "Interactive Learning",
      description: "Engage in live sessions, access recorded content, and get personalized guidance from your chosen mentor."
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-blue-600" />,
      title: "Apply & Grow",
      description: "Implement what you learn with ongoing support and watch your trading skills and confidence grow."
    }
  ];

  const features = [
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "SEBI Verified Experts",
      description: "All our mentors are verified and registered with SEBI for your safety and trust."
    },
    {
      icon: <Star className="w-8 h-8 text-yellow-600" />,
      title: "Proven Track Record",
      description: "Learn from traders with years of experience and documented success in the markets."
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Personalized Learning",
      description: "Get customized guidance based on your experience level and trading goals."
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-purple-600" />,
      title: "Ongoing Support",
      description: "Access to mentors and community support even after completing your courses."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">How StockSensei Works</h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Your journey to becoming a successful trader starts here. Learn from verified experts and grow your skills step by step.
          </p>
        </div>
      </div>

      {/* How It Works Steps */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Your Learning Journey</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="flex justify-center mb-4">
                  {step.icon}
                </div>
                <div className="mb-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose StockSensei?</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Success Stories</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya S.",
                role: "Software Engineer",
                testimonial: "StockSensei helped me transition from a complete beginner to confident options trader in just 3 months.",
                rating: 5
              },
              {
                name: "Amit K.",
                role: "Business Owner",
                testimonial: "The personalized mentorship program gave me the confidence to start trading with real money.",
                rating: 5
              },
              {
                name: "Neha R.",
                role: "Teacher",
                testimonial: "I love how the platform connects me with verified experts. The quality of education is outstanding.",
                rating: 5
              }
            ].map((story, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(story.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{story.testimonial}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{story.name}</p>
                    <p className="text-sm text-gray-500">{story.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Start Your Trading Journey?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of successful traders who learned with StockSensei's expert mentors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/explore">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8">
                Explore Mentors
              </Button>
            </Link>
            <Link to="/courses">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8">
                Browse Courses
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnHowItWorks;
