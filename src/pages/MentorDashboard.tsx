import React from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, DollarSign, Users, MessageSquare, Clock, TrendingUp } from "lucide-react";

const MentorDashboard = () => {
  const upcomingSessions = [
    {
      id: 1,
      student: "Amit Sharma",
      course: "Options Trading Mastery",
      type: "Group Session",
      time: "Today 6:00 PM",
      duration: "2 hours"
    },
    {
      id: 2,
      student: "Priya Singh",
      course: "1:1 Consultation",
      type: "Personal Session",
      time: "Tomorrow 7:30 PM",
      duration: "1 hour"
    }
  ];

  const recentEarnings = [
    { month: "November", amount: "₹45,000", sessions: 23 },
    { month: "October", amount: "₹38,500", sessions: 19 },
    { month: "September", amount: "₹42,000", sessions: 21 }
  ];

  const activeStudents = [
    {
      id: 1,
      name: "Amit Sharma",
      course: "Options Trading Mastery",
      progress: 75,
      lastActive: "2 hours ago"
    },
    {
      id: 2,
      name: "Priya Singh",
      course: "Technical Analysis",
      progress: 45,
      lastActive: "1 day ago"
    },
    {
      id: 3,
      name: "Rajesh Patel",
      course: "Risk Management",
      progress: 90,
      lastActive: "3 hours ago"
    }
  ];

  const stats = {
    totalStudents: 150,
    thisMonthEarnings: "₹45,000",
    completedSessions: 23,
    averageRating: 4.9
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mentor Dashboard</h1>
          <p className="text-gray-600">Welcome back, Rajesh! Here's your teaching overview.</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Students</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalStudents}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">This Month</p>
                  <p className="text-3xl font-bold text-green-600">{stats.thisMonthEarnings}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Sessions Done</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.completedSessions}</p>
                </div>
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Rating</p>
                  <p className="text-3xl font-bold text-yellow-600">{stats.averageRating}⭐</p>
                </div>
                <TrendingUp className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Sessions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Upcoming Sessions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingSessions.map((session) => (
                    <div key={session.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">{session.course}</h3>
                          <p className="text-sm text-gray-600">
                            {session.type === "Group Session" ? "Group Session" : `with ${session.student}`}
                          </p>
                        </div>
                        <Badge>{session.type}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <span>{session.time}</span>
                        <span>•</span>
                        <span>{session.duration}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Start Session
                        </Button>
                        <Button size="sm" variant="outline">
                          Reschedule
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Active Students */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Active Students
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeStudents.map((student) => (
                    <div key={student.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">{student.name}</h3>
                          <p className="text-sm text-gray-600">{student.course}</p>
                        </div>
                        <span className="text-sm text-gray-500">Last active: {student.lastActive}</span>
                      </div>
                      
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-sm text-gray-600">Progress:</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${student.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{student.progress}%</span>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Message
                        </Button>
                        <Button size="sm" variant="outline">
                          View Progress
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
                    <Calendar className="w-4 h-4 mr-2" />
                    Manage Calendar
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Group Chat Tools
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <DollarSign className="w-4 h-4 mr-2" />
                    View Earnings
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Earnings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Recent Earnings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentEarnings.map((earning, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{earning.month}</p>
                        <p className="text-sm text-gray-600">{earning.sessions} sessions</p>
                      </div>
                      <span className="font-bold text-green-600">{earning.amount}</span>
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

export default MentorDashboard;
