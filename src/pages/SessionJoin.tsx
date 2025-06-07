import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Clock, Video, Shield } from "lucide-react";

const SessionJoin = () => {
  const { sessionId } = useParams();
  const [searchParams] = useSearchParams();
  const [isJoining, setIsJoining] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);
  
  // Get session details from URL params or mock data
  const sessionTitle = searchParams.get('title') || 'Live Trading Session';
  const mentorName = searchParams.get('mentor') || 'Rajesh Kumar';
  const startTime = searchParams.get('time') || '6:00 PM';
  
  // Real Zoom meeting details
  const zoomMeetingId = "734 1285 1786";
  const zoomPassword = "dOjJzbWlZ9X9U5c2IcBRuuT3bG2hRE.1";
  const zoomWebUrl = "https://us04web.zoom.us/wc/join/73412851786?pwd=dOjJzbWlZ9X9U5c2IcBRuuT3bG2hRE.1";

  const handleJoinSession = () => {
    setIsJoining(true);
    
    // Simulate joining process
    setTimeout(() => {
      setIsJoining(false);
      setHasJoined(true);
    }, 2000);
  };

  useEffect(() => {
    console.log("Session joining page loaded for session:", sessionId);
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Session Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="w-5 h-5" />
                  Session Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{sessionTitle}</h3>
                  <p className="text-sm text-gray-600">with {mentorName}</p>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>Started at {startTime}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>47 participants</span>
                </div>
                
                <Badge className="bg-green-100 text-green-800">Live</Badge>
                
                <div className="pt-4 border-t">
                  <p className="text-xs text-gray-500 mb-2">Meeting ID: {zoomMeetingId}</p>
                  <p className="text-xs text-gray-500 break-all">Password: {zoomPassword}</p>
                </div>
                
                {!hasJoined ? (
                  <Button 
                    onClick={handleJoinSession}
                    disabled={isJoining}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {isJoining ? "Joining..." : "Join Session"}
                  </Button>
                ) : (
                  <div className="flex items-center gap-2 text-green-600 text-sm">
                    <Shield className="w-4 h-4" />
                    <span>Connected to session</span>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Session Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Session Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Keep your microphone muted unless speaking</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Use the chat for questions</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Recording will be available after the session</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>No financial advice - educational purposes only</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Zoom Meeting Embed */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Live Session</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {hasJoined ? (
                  <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
                    <iframe
                      src={zoomWebUrl}
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      allow="camera; microphone; fullscreen; speaker; display-capture"
                      className="w-full h-full"
                      title="Zoom Meeting"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
                    />
                  </div>
                ) : (
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <Video className="w-16 h-16 text-gray-400 mx-auto" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Ready to join?</h3>
                        <p className="text-gray-600">Click "Join Session" to connect to the live session</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionJoin;
