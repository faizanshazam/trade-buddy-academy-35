
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MessageSquare, BookOpen, Play, FileText, Lock } from "lucide-react";
import { PrivateJournalModal } from "@/components/PrivateJournalModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [isPrivateJournalOpen, setIsPrivateJournalOpen] = useState(false);

  const upcomingClasses = [
    {
      id: 1,
      title: "Options Strategies Deep Dive",
      instructor: "Rajesh Kumar",
      date: "Today",
      time: "6:00 PM",
      duration: "2 hours",
      type: "Live Session"
    },
    {
      id: 2,
      title: "Risk Management Workshop",
      instructor: "Priya Sharma",
      date: "Tomorrow",
      time: "7:00 PM", 
      duration: "1.5 hours",
      type: "Live Session"
    }
  ];

  const enrolledCourses = [
    {
      id: 1,
      title: "Complete Options Trading Mastery",
      instructor: "Rajesh Kumar",
      progress: 65,
      nextClass: "Today 6:00 PM",
      totalHours: 20,
      completedHours: 13
    },
    {
      id: 2,
      title: "Technical Analysis Fundamentals",
      instructor: "Priya Sharma",
      progress: 30,
      nextClass: "Dec 16, 7:00 PM",
      totalHours: 15,
      completedHours: 4.5
    }
  ];

  const activeChats = [
    {
      id: 1,
      name: "Options Trading Mastery - Batch A",
      lastMessage: "Rajesh: Great question about volatility...",
      unreadCount: 3,
      time: "2 min ago",
      detail: "25 students"
    },
    {
      id: 2,
      name: "Technical Analysis - Batch B",
      lastMessage: "Priya: Market update for tomorrow...",
      unreadCount: 1,
      time: "1 hour ago",
      detail: "18 students"
    }
  ];

  const handleOpenPrivateJournal = () => {
    setIsPrivateJournalOpen(true);
  };

  // Quick Actions button definitions (for mapping, route fix, etc)
  const quickActions = [
    {
      label: "Private Trading Lab",
      icon: <Lock className="w-4 h-4 mr-2" />,
      onClick: handleOpenPrivateJournal,
      primary: true
    },
    {
      label: "Browse More Courses",
      icon: <BookOpen className="w-4 h-4 mr-2" />,
      onClick: () => navigate('/courses'),
      primary: false
    },
    {
      label: "Book 1:1 Session",
      icon: <Calendar className="w-4 h-4 mr-2" />,
      onClick: () => navigate('/explore'),
      primary: false
    },
    {
      label: "Private Journal",
      icon: <FileText className="w-4 h-4 mr-2" />,
      onClick: handleOpenPrivateJournal,
      primary: false
    },
    {
      label: "Contact Support",
      icon: <MessageSquare className="w-4 h-4 mr-2" />,
      onClick: () => navigate('/contact'),
      primary: false
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your learning progress.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Left/Main Area */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Upcoming Classes */}
            <Card className="shadow-none border border-gray-200">
              <CardHeader className="pb-2 px-6 pt-6">
                <CardTitle className="flex items-center gap-2 text-xl font-bold">
                  <Calendar className="w-6 h-6" />
                  Upcoming Classes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 px-6 pb-6">
                {upcomingClasses.map((class_item) => (
                  <div
                    key={class_item.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white border border-gray-200 rounded-lg px-5 py-4"
                  >
                    <div className="flex flex-col gap-0.5">
                      <h3 className="font-semibold text-gray-900 text-base">{class_item.title}</h3>
                      <span className="text-sm text-gray-500 mb-0.5">with {class_item.instructor}</span>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>{class_item.date} at {class_item.time}</span>
                        <span>•</span>
                        <span>{class_item.duration}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 min-w-[130px]">
                      <Badge className="mb-2 px-3 py-1 text-xs font-medium" variant="default">
                        {class_item.type}
                      </Badge>
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 rounded font-semibold"
                      >
                        Join Class
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Enrolled Courses */}
            <Card className="shadow-none border border-gray-200">
              <CardHeader className="pb-2 px-6 pt-6">
                <CardTitle className="flex items-center gap-2 text-xl font-bold">
                  <BookOpen className="w-6 h-6" />
                  My Courses
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 px-6 pb-6">
                {enrolledCourses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white border border-gray-200 rounded-lg px-5 py-4 flex flex-col gap-3"
                  >
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-2 mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-0.5">{course.title}</h3>
                        <span className="text-sm text-gray-500">by {course.instructor}</span>
                      </div>
                      <span className="text-sm text-blue-600 font-medium">{course.progress}% complete</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-xs text-gray-500 mb-3 gap-1">
                      <span>{course.completedHours}/{course.totalHours} hours completed</span>
                      <span>
                        Next class: {course.nextClass}
                      </span>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1"
                      >
                        <Play className="w-4 h-4" />
                        Continue Learning
                      </Button>
                      <Button size="sm" variant="outline">View Details</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6 w-full">
            {/* Quick Actions */}
            <Card className="shadow-none border border-gray-200">
              <CardHeader className="pb-2 px-6 pt-6">
                <CardTitle className="text-xl font-bold">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="flex flex-col gap-2">
                  {quickActions.map((action, idx) =>
                    <Button
                      key={action.label}
                      className={`w-full justify-start font-medium text-base rounded ${action.primary ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-white border text-gray-900 hover:bg-gray-50"}`}
                      variant={action.primary ? "default" : "outline"}
                      onClick={action.onClick}
                    >
                      {action.icon}{action.label}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Batch Chats (Group Chats) */}
            <Card className="shadow-none border border-gray-200">
              <CardHeader className="pb-2 px-6 pt-6">
                <CardTitle className="flex items-center gap-2 text-xl font-bold">
                  <MessageSquare className="w-6 h-6" />
                  Batch Chats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 px-6 pb-6">
                {activeChats.map((chat) => (
                  <div
                    key={chat.id}
                    className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white border border-gray-200 rounded-lg px-4 py-3 gap-2 hover:border-blue-300 transition-colors cursor-pointer"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-gray-900 text-sm">{chat.name}</h4>
                        {chat.unreadCount > 0 && (
                          <Badge
                            variant="secondary"
                            className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5"
                          >
                            {chat.unreadCount}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mb-1 truncate">{chat.lastMessage}</p>
                      <span className="text-xs text-gray-400">{chat.time}&nbsp;&nbsp;•&nbsp;{chat.detail}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <PrivateJournalModal
        isOpen={isPrivateJournalOpen}
        onClose={() => setIsPrivateJournalOpen(false)}
      />
    </div>
  );
};

export default StudentDashboard;
