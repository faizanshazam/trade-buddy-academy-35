
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Users, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TraderCardProps {
  trader: {
    id: number;
    name: string;
    photo: string;
    rating: number;
    languages: string[];
    qualification: string;
    sebiVerified: boolean;
    speciality: string;
    experience: string;
    studentsCount: number;
  };
}

export const TraderCard = ({ trader }: TraderCardProps) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/trader/${trader.id}`);
  };

  const handleViewCourses = () => {
    navigate(`/trader/${trader.id}/courses`);
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
      <CardContent className="p-6">
        <div className="flex items-start gap-4 mb-4" onClick={handleViewProfile}>
          <img
            src={trader.photo}
            alt={trader.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-gray-900">{trader.name}</h3>
              {trader.sebiVerified && (
                <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                  <Check className="w-3 h-3 mr-1" />
                  SEBI
                </Badge>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-1">{trader.speciality}</p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>⭐ {trader.rating}</span>
              <span>•</span>
              <span>{trader.experience}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <p className="text-sm text-gray-600">
            <strong>Qualification:</strong> {trader.qualification}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Languages:</strong> {trader.languages.join(", ")}
          </p>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Users className="w-4 h-4" />
            <span>{trader.studentsCount} students</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            className="flex-1 bg-blue-600 hover:bg-blue-700" 
            size="sm"
            onClick={handleViewProfile}
          >
            View Profile
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleViewCourses}
            className="flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            Open Courses
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
