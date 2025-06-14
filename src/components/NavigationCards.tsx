
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, User } from "lucide-react";

export const NavigationCards = () => {
  const cards = [
    {
      icon: BookOpen,
      title: "Explore Courses",
      description: "Comprehensive trading courses from basics to advanced strategies",
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
      link: "/courses"
    },
    {
      icon: User,
      title: "Browse Mentors",
      description: "Find verified traders for personalized mentorship",
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600",
      link: "/explore"
    },
    {
      icon: Users,
      title: "Learn How It Works",
      description: "Understand our platform and start your trading journey",
      color: "bg-purple-500",
      hoverColor: "hover:bg-purple-600",
      link: "/faq"
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid md:grid-cols-3 gap-8">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Link key={index} to={card.link}>
              <Card className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-0 bg-white">
                <CardContent className="p-8 text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${card.color} ${card.hoverColor} transition-colors duration-300 mb-6 group-hover:scale-110`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
