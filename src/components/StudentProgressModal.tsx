
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, BookOpen, Award } from "lucide-react";

interface Student {
  id: number;
  name: string;
  course: string;
  progress: number;
  lastActive: string;
}

interface StudentProgressModalProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
}

export const StudentProgressModal = ({ student, isOpen, onClose }: StudentProgressModalProps) => {
  if (!student) return null;

  const modules = [
    { name: "Introduction to Options", completed: true, score: 95 },
    { name: "Basic Strategies", completed: true, score: 88 },
    { name: "Risk Management", completed: true, score: 92 },
    { name: "Advanced Strategies", completed: false, score: 0 },
    { name: "Portfolio Management", completed: false, score: 0 },
    { name: "Market Analysis", completed: false, score: 0 }
  ];

  const completedModules = modules.filter(m => m.completed).length;
  const averageScore = completedModules
    ? modules.filter(m => m.completed).reduce((acc, m) => acc + m.score, 0) / completedModules
    : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            {student.name} - Progress Report
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Overall Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Overall Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{student.progress}%</p>
                  <p className="text-sm text-gray-600">Course Completion</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{averageScore.toFixed(0)}%</p>
                  <p className="text-sm text-gray-600">Average Score</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">{completedModules}/6</p>
                  <p className="text-sm text-gray-600">Modules Completed</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Course: {student.course}</span>
                  <span>Last Active: {student.lastActive}</span>
                </div>
                <Progress value={student.progress} className="h-3" />
              </div>
            </CardContent>
          </Card>

          {/* Module Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Module Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {modules.map((module, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      {module.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <Clock className="w-5 h-5 text-gray-400" />
                      )}
                      <span className="font-medium">{module.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {module.completed ? (
                        <>
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            <Award className="w-3 h-3 mr-1" />
                            {module.score}%
                          </Badge>
                          <Badge className="bg-green-600">Completed</Badge>
                        </>
                      ) : (
                        <Badge variant="outline">Not Started</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm">Completed "Risk Management" module</span>
                  <span className="text-xs text-gray-500">2 days ago</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm">Scored 88% on "Basic Strategies" quiz</span>
                  <span className="text-xs text-gray-500">5 days ago</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm">Attended group session</span>
                  <span className="text-xs text-gray-500">1 week ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
