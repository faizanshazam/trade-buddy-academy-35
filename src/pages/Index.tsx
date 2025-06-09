
import Navigation from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { NavigationCards } from "@/components/NavigationCards";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navigation />
      <Hero />
      <NavigationCards />
    </div>
  );
};

export default Index;
