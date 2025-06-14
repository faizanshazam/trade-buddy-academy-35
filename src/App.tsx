
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Explore from "./pages/Explore";
import Courses from "./pages/Courses";
import TraderProfile from "./pages/TraderProfile";
import TraderCourses from "./pages/TraderCourses";
import CourseDetails from "./pages/CourseDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import SessionJoin from "./pages/SessionJoin";
import ChatSupport from "./pages/ChatSupport";
import LearnHowItWorks from "./pages/LearnHowItWorks";
import MentorDashboard from "./pages/MentorDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import NotFound from "./pages/NotFound";
import { Toaster } from "@/components/ui/sonner";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/trader/:id" element={<TraderProfile />} />
          <Route path="/trader/:id/courses" element={<TraderCourses />} />
          <Route path="/course/:courseId" element={<CourseDetails />} />
          <Route path="/session/:sessionId" element={<SessionJoin />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/chat-support" element={<ChatSupport />} />
          <Route path="/learn-how-it-works" element={<LearnHowItWorks />} />
          <Route path="/mentor-dashboard" element={<MentorDashboard />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
