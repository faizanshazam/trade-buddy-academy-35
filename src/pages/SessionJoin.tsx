import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Clock, Video } from "lucide-react";

import { ZoomMtg } from "@zoom/meetingsdk";
import "@zoom/meetingsdk/dist/css/bootstrap.css";
import "@zoom/meetingsdk/dist/css/react-select.css";

import { SessionChat } from "@/components/SessionChat";

const SessionJoin = () => {
  const { sessionId } = useParams();
  const [searchParams] = useSearchParams();
  const [isJoining, setIsJoining] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);
  const [signature, setSignature] = useState<string | null>(null);
  const [isSdkReady, setIsSdkReady] = useState(false);

  const sessionTitle = searchParams.get("title") || "Live Trading Session";
  const mentorName = searchParams.get("mentor") || "Rajesh Kumar";
  const startTime = searchParams.get("time") || "6:00 PM";

  const meetingNumber = "71509380993";
  const passWord = "SS2025";
  const userName = "XYZUser";
  const sdkKey = "13uzy1wwRfCajEKdERsfHQ";

  const joinMeeting = (signature: string) => {
    // Add zoom-active class to prevent scroll issues
    document.body.classList.add('zoom-active');
    document.documentElement.classList.add('zoom-active');
    
    const zoomRoot = document.getElementById("zmmtg-root");
    if (zoomRoot) zoomRoot.style.display = "block";

    ZoomMtg.init({
      leaveUrl: window.location.href,
      success: () => {
        ZoomMtg.join({
          sdkKey,
          signature,
          meetingNumber,
          userName,
          passWord,
          success: () => {
            console.log("🎥 Joined Zoom meeting");
          },
          error: (err: any) => {
            console.error("❌ Join error", err);
            alert("Join failed. Check credentials or signature.");
            // Remove zoom classes on error
            document.body.classList.remove('zoom-active');
            document.documentElement.classList.remove('zoom-active');
          },
        });
      },
      error: (err: any) => {
        console.error("❌ Init error", err);
        alert("Zoom SDK init failed.");
        // Remove zoom classes on error
        document.body.classList.remove('zoom-active');
        document.documentElement.classList.remove('zoom-active');
      },
    });
  };

  const handleJoinSession = async () => {
    setIsJoining(true);
    const sig = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZGtLZXkiOiIxM3V6eTF3d1JmQ2FqRUtkRVJzZkhRIiwibW4iOiI3MTUwOTM4MDk5MyIsInJvbGUiOjAsImlhdCI6MTc0OTM3MTI0MiwiZXhwIjoxNzQ5Mzc0ODQyLCJhcHBLZXkiOiIxM3V6eTF3d1JmQ2FqRUtkRVJzZkhRIiwidG9rZW5FeHAiOjE3NDkzNzQ4NDJ9.I5OcPGTP4CgzGdUjC5O2Ed8tpjF78MvkcMmWLoJ1D4k";
    if (sig) {
      setSignature(sig);
      setHasJoined(true);
      joinMeeting(sig);
    } else {
      alert("Unable to join session. Signature error.");
    }
    setIsJoining(false);
  };

  const handleLeaveMeeting = () => {
    // Remove zoom-active classes to restore scroll
    document.body.classList.remove('zoom-active');
    document.documentElement.classList.remove('zoom-active');
    window.location.reload();
  };

  useEffect(() => {
    console.log("SessionJoin loaded for:", sessionId);
  }, [sessionId]);

  useEffect(() => {
    try {
      ZoomMtg.setZoomJSLib("https://source.zoom.us/3.13.2/lib", "/av");
      ZoomMtg.preLoadWasm();
      ZoomMtg.prepareWebSDK();
      ZoomMtg.i18n.load("en-US");
      ZoomMtg.i18n.reload("en-US");
      setIsSdkReady(true);
      console.log("✅ Zoom Meeting SDK initialized");
    } catch (err) {
      console.error("❌ Failed to initialize Zoom Meeting SDK", err);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div
        id="zmmtg-root"
        className={`w-full h-[70vh] rounded-lg bg-gray-100 ${hasJoined ? "" : "hidden"}`}
        style={{ zIndex: 1000, position: "relative" }}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!hasJoined ? (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="w-5 h-5" /> Session Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">{sessionTitle}</h3>
                    <p className="text-sm text-gray-600">with {mentorName}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" /> <span>Started at {startTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" /> <span>47 participants</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Live</Badge>
                  <div className="pt-4 border-t">
                    <p className="text-xs text-gray-500 mb-2">Meeting ID: {meetingNumber}</p>
                    <p className="text-xs text-gray-500">Password: {passWord}</p>
                    <p className="text-xs text-gray-500">Joining as: {userName}</p>
                  </div>
                  <Button
                    onClick={handleJoinSession}
                    disabled={isJoining || !isSdkReady}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {isJoining ? "Joining..." : "Join Session"}
                  </Button>
                </CardContent>
              </Card>
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
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Live Session</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <Video className="w-16 h-16 text-gray-400 mx-auto" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Ready to join?</h3>
                        <p className="text-gray-600">Click "Join Session" to connect to the live session</p>
                        <p className="text-sm text-gray-500 mt-2">You'll join as {userName}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="fixed top-4 right-4 z-50">
            <Button
              onClick={handleLeaveMeeting}
              variant="destructive"
              className="bg-red-600 hover:bg-red-700"
            >
              Leave Meeting
            </Button>
          </div>
        )}
      </div>
      
      {/* Session Chat - only show when not in Zoom meeting */}
      {!hasJoined && <SessionChat />}
    </div>
  );
};

export default SessionJoin;
