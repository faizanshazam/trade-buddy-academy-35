
import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, User, Headphones } from "lucide-react";

interface Message {
  id: string;
  sender: 'user' | 'support';
  message: string;
  timestamp: Date;
  supportAgent?: string;
}

const ChatSupport = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'support',
      message: 'Hello! Welcome to StockSensei support. How can I help you today?',
      timestamp: new Date(),
      supportAgent: 'Priya'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      message: newMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate support response
    setTimeout(() => {
      const supportResponse = generateSupportResponse(newMessage);
      const supportMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'support',
        message: supportResponse,
        timestamp: new Date(),
        supportAgent: 'Priya'
      };
      setMessages(prev => [...prev, supportMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const generateSupportResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('payment') || lowerMessage.includes('refund')) {
      return "I can help you with payment-related queries. Our payment system supports UPI, cards, and net banking. For refunds, we process them within 5-7 business days. Is there a specific payment issue you're facing?";
    }
    
    if (lowerMessage.includes('course') || lowerMessage.includes('enrollment')) {
      return "For course-related questions, I'm here to help! You can browse our courses, enroll directly, and access your progress anytime. Do you need help with a specific course or enrollment process?";
    }
    
    if (lowerMessage.includes('trader') || lowerMessage.includes('mentor')) {
      return "Our expert traders and mentors are here to guide your learning journey. You can view their profiles, check their specialties, and book sessions directly. Would you like help finding a specific type of mentor?";
    }
    
    if (lowerMessage.includes('technical') || lowerMessage.includes('video') || lowerMessage.includes('session')) {
      return "For technical issues with video sessions or platform access, please try refreshing your browser first. If the issue persists, I can escalate this to our technical team. Can you describe the specific problem you're experiencing?";
    }
    
    return "Thank you for reaching out! I'm here to help with any questions about StockSensei - whether it's about courses, payments, traders, or technical issues. Could you please provide more details about what you need assistance with?";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Live Chat Support</h1>
          <p className="text-gray-600">Get instant help from our support team</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="pb-3 border-b">
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Support Chat
                  <Badge className="ml-2 bg-green-100 text-green-800">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                    Online
                  </Badge>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col p-0">
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                        {message.sender === 'support' && (
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                              <Headphones className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-xs text-gray-600">{message.supportAgent} - Support</span>
                          </div>
                        )}
                        <div
                          className={`p-3 rounded-lg ${
                            message.sender === 'user'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{message.message}</p>
                          <p className={`text-xs mt-1 ${
                            message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 text-gray-900 p-3 rounded-lg">
                        <p className="text-sm">Support is typing...</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <form onSubmit={handleSendMessage} className="p-4 border-t flex gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1"
                  />
                  <Button type="submit" size="sm" className="px-3">
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Support Info Sidebar */}
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Quick Help</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-600">Average response time: <span className="font-medium text-green-600">2 minutes</span></p>
                  <p className="text-gray-600">Support hours: 9 AM - 9 PM IST</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Common Topics</h3>
                <div className="space-y-2">
                  <Badge variant="outline" className="text-xs">Course Enrollment</Badge>
                  <Badge variant="outline" className="text-xs">Payment Issues</Badge>
                  <Badge variant="outline" className="text-xs">Video Sessions</Badge>
                  <Badge variant="outline" className="text-xs">Trader Profiles</Badge>
                  <Badge variant="outline" className="text-xs">Technical Support</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSupport;
