
import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Send, 
  Phone, 
  Video, 
  Image, 
  Users, 
  MoreVertical,
  Clock
} from "lucide-react";

interface BatchChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  batchName: string;
  studentCount: number;
}

interface Message {
  id: number;
  sender: string;
  content: string;
  type: 'text' | 'image';
  timestamp: string;
  isOwn: boolean;
}

export const BatchChatModal = ({ isOpen, onClose, batchName, studentCount }: BatchChatModalProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "Rajesh (Mentor)",
      content: "Welcome to the Options Trading Mastery batch! Feel free to ask any questions.",
      type: 'text',
      timestamp: "10:30 AM",
      isOwn: true
    },
    {
      id: 2,
      sender: "Amit Sharma",
      content: "Thank you sir! Looking forward to learning from you.",
      type: 'text',
      timestamp: "10:32 AM",
      isOwn: false
    },
    {
      id: 3,
      sender: "Priya Singh",
      content: "When will we start with the practical sessions?",
      type: 'text',
      timestamp: "10:35 AM",
      isOwn: false
    }
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        sender: "Rajesh (Mentor)",
        content: message,
        type: 'text',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newMessage: Message = {
        id: messages.length + 1,
        sender: "Rajesh (Mentor)",
        content: "Image shared: " + file.name,
        type: 'image',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true
      };
      setMessages([...messages, newMessage]);
    }
  };

  const handleStartCall = (type: 'voice' | 'video') => {
    alert(`Starting ${type} call with batch: ${batchName}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col p-0">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 border-b bg-blue-50">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 bg-blue-600">
              <AvatarFallback className="text-white font-semibold">
                {batchName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <DialogTitle className="text-lg font-semibold">{batchName}</DialogTitle>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span>{studentCount} students</span>
                <Badge variant="outline" className="text-xs">
                  Online
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleStartCall('voice')}
              className="flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Voice Call
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleStartCall('video')}
              className="flex items-center gap-2"
            >
              <Video className="w-4 h-4" />
              Video Call
            </Button>
            <Button size="sm" variant="ghost">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs lg:max-w-md ${msg.isOwn ? 'order-2' : 'order-1'}`}>
                <div
                  className={`p-3 rounded-lg ${
                    msg.isOwn
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-900 border'
                  }`}
                >
                  {!msg.isOwn && (
                    <p className="text-xs font-semibold mb-1 text-blue-600">
                      {msg.sender}
                    </p>
                  )}
                  <p className="text-sm">{msg.content}</p>
                  {msg.type === 'image' && (
                    <div className="mt-2 p-2 bg-gray-100 rounded text-center text-xs text-gray-600">
                      📷 Image
                    </div>
                  )}
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <Clock className="w-3 h-3 opacity-70" />
                    <span className="text-xs opacity-70">{msg.timestamp}</span>
                  </div>
                </div>
              </div>
              
              {!msg.isOwn && (
                <Avatar className="w-8 h-8 order-1 mr-2">
                  <AvatarFallback className="text-xs bg-gray-300">
                    {msg.sender.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t bg-white">
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={handleImageUpload}
              className="p-2"
            >
              <Image className="w-5 h-5" />
            </Button>
            
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            
            <Button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
