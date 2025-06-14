
import { Navigation } from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Award, TrendingUp, Shield } from "lucide-react";

const About = () => {
  const stats = [
    { icon: Users, label: "Active Students", value: "5,000+" },
    { icon: Award, label: "SEBI Verified Trainers", value: "50+" },
    { icon: TrendingUp, label: "Success Rate", value: "85%" },
    { icon: Shield, label: "Years of Experience", value: "10+" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About TradeMentor</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're India's leading platform for trading education, connecting aspiring traders 
            with SEBI-verified professionals to master the art of financial markets.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <Icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Mission */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              To democratize trading education in India by providing access to high-quality, 
              practical training from verified market professionals. We believe that with the 
              right guidance and education, anyone can learn to navigate financial markets successfully.
            </p>
          </CardContent>
        </Card>

        {/* Why Choose Us */}
        <Card>
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose TradeMentor?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  <Badge className="mr-2">1</Badge>
                  SEBI Verified Trainers
                </h3>
                <p className="text-gray-600">
                  All our trainers are verified by SEBI and have proven track records in the markets.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  <Badge className="mr-2">2</Badge>
                  Practical Learning
                </h3>
                <p className="text-gray-600">
                  Learn through real market examples and hands-on trading strategies.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  <Badge className="mr-2">3</Badge>
                  Ongoing Support
                </h3>
                <p className="text-gray-600">
                  Get continuous support through our community and mentorship programs.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  <Badge className="mr-2">4</Badge>
                  Affordable Pricing
                </h3>
                <p className="text-gray-600">
                  Quality education at prices that won't break the bank.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
