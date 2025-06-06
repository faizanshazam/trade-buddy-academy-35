
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send, X, Minimize2 } from "lucide-react";

interface Message {
  id: string;
  sender: 'student' | 'mentor';
  message: string;
  timestamp: Date;
}

interface ChatPopupProps {
  mentorName: string;
  mentorId: number;
  onClose: () => void;
}

const ChatPopup = ({ mentorName, mentorId, onClose }: ChatPopupProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'mentor',
      message: `Hi! I'm ${mentorName}. Feel free to ask me any questions about my courses or trading strategies. I'm here to help!`,
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const studentMessage: Message = {
      id: Date.now().toString(),
      sender: 'student',
      message: newMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, studentMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate mentor response
    setTimeout(() => {
      const mentorResponse = generateMentorResponse(newMessage);
      const mentorMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'mentor',
        message: mentorResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, mentorMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const generateMentorResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('course') || lowerMessage.includes('learn')) {
      return "I offer various courses from beginner to advanced levels. Each course includes live sessions, recorded content, and ongoing support. Would you like to know about any specific course?";
    }
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      return "My courses range from ₹1,999 for single sessions to ₹15,999 for comprehensive programs. All include lifetime access to recordings and ongoing support.";
    }
    
    if (lowerMessage.includes('strategy') || lowerMessage.includes('trading')) {
      return "I focus on systematic trading approaches with proper risk management. My methods are based on years of market experience and proven strategies.";
    }
    
    return "That's a great question! I'm here to help you with anything related to trading and my courses. Feel free to ask me about specific topics you're interested in.";
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 left-4 z-50">
        <Button
          onClick={() => setIsMinimized(false)}
          className="bg-blue-600 hover:bg-blue-700 rounded-full h-12 w-12 p-0"
        >
          <MessageSquare className="w-6 h-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 w-80">
      <Card className="shadow-lg">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-sm">
              <MessageSquare className="w-4 h-4" />
              Chat with {mentorName}
            </CardTitle>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(true)}
                className="h-6 w-6 p-0"
              >
                <Minimize2 className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-6 w-6 p-0"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-64 overflow-y-auto p-3 space-y-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'student' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-2 rounded-lg text-xs ${
                    message.sender === 'student'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p>{message.message}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'student' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 p-2 rounded-lg text-xs">
                  <p>Typing...</p>
                </div>
              </div>
            )}
          </div>
          
          <form onSubmit={handleSendMessage} className="p-3 border-t flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 text-xs"
            />
            <Button type="submit" size="sm" className="px-2">
              <Send className="w-3 h-3" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatPopup;
