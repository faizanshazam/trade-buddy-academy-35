import React from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MessageSquare, BookOpen, Play } from "lucide-react";

const StudentDashboard = () => {
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
      name: "Options Trading Group",
      lastMessage: "Rajesh: Great question about volatility...",
      unreadCount: 3,
      time: "2 min ago"
    },
    {
      id: 2,
      name: "Technical Analysis Group",
      lastMessage: "Priya: Market update for tomorrow...",
      unreadCount: 1,
      time: "1 hour ago"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your learning progress.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Classes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Upcoming Classes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingClasses.map((class_item) => (
                    <div key={class_item.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">{class_item.title}</h3>
                          <p className="text-sm text-gray-600">with {class_item.instructor}</p>
                        </div>
                        <Badge>{class_item.type}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <span>{class_item.date} at {class_item.time}</span>
                        <span>•</span>
                        <span>{class_item.duration}</span>
                      </div>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Join Class
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Enrolled Courses */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  My Courses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {enrolledCourses.map((course) => (
                    <div key={course.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-gray-900">{course.title}</h3>
                          <p className="text-sm text-gray-600">by {course.instructor}</p>
                        </div>
                        <span className="text-sm text-blue-600 font-medium">{course.progress}% complete</span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                        <span>{course.completedHours}/{course.totalHours} hours completed</span>
                        <span>Next class: {course.nextClass}</span>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Play className="w-4 h-4 mr-2" />
                          Continue Learning
                        </Button>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Browse More Courses
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Calendar className="w-4 h-4 mr-2" />
                    Book 1:1 Session
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Active Group Chats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Group Chats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {activeChats.map((chat) => (
                    <div key={chat.id} className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-medium text-gray-900 text-sm">{chat.name}</h4>
                        {chat.unreadCount > 0 && (
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                            {chat.unreadCount}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mb-1">{chat.lastMessage}</p>
                      <span className="text-xs text-gray-400">{chat.time}</span>
                    </div>
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

export default StudentDashboard;
