
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Plus, 
  Calendar, 
  Lock, 
  Eye,
  MessageSquare
} from "lucide-react";

interface PrivateJournalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface JournalEntry {
  id: number;
  title: string;
  content: string;
  date: string;
  mentorReviewed: boolean;
  mentorFeedback?: string;
  tags: string[];
}

export const PrivateJournalModal = ({ isOpen, onClose }: PrivateJournalModalProps) => {
  const [newEntryTitle, setNewEntryTitle] = useState("");
  const [newEntryContent, setNewEntryContent] = useState("");
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: 1,
      title: "My First Options Trade Experience",
      content: "Today I executed my first options trade. I bought a call option on NIFTY with strike price 19500. The experience was nerve-wracking but educational. I learned the importance of timing and volatility analysis...",
      date: "2024-01-15",
      mentorReviewed: true,
      mentorFeedback: "Great start! Your analysis of volatility was spot on. For next time, consider the time decay factor more carefully.",
      tags: ["Options", "First Trade", "Learning"]
    },
    {
      id: 2,
      title: "Risk Management Lessons",
      content: "After last week's session on risk management, I realized I was overleveraging my positions. Today I set strict position sizing rules - never risk more than 2% of my capital on a single trade...",
      date: "2024-01-12",
      mentorReviewed: false,
      tags: ["Risk Management", "Position Sizing"]
    },
    {
      id: 3,
      title: "Market Psychology Insights",
      content: "Noticed my emotions affecting my trading decisions today. When the market moved against me, I held onto losing positions hoping they would turn around. Need to work on cutting losses quickly...",
      date: "2024-01-10",
      mentorReviewed: true,
      mentorFeedback: "Self-awareness is the first step to improvement. Try setting stop-losses before entering trades to remove emotion from the equation.",
      tags: ["Psychology", "Emotions", "Self-Reflection"]
    }
  ]);

  const handleAddEntry = () => {
    if (newEntryTitle.trim() && newEntryContent.trim()) {
      const newEntry: JournalEntry = {
        id: entries.length + 1,
        title: newEntryTitle,
        content: newEntryContent,
        date: new Date().toISOString().split('T')[0],
        mentorReviewed: false,
        tags: []
      };
      setEntries([newEntry, ...entries]);
      setNewEntryTitle("");
      setNewEntryContent("");
      setShowNewEntry(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col p-0">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-blue-50">
          <div className="flex items-center gap-3">
            <Lock className="w-6 h-6 text-blue-600" />
            <div>
              <DialogTitle className="text-xl font-semibold">Private Trading Journal</DialogTitle>
              <p className="text-sm text-gray-600">Only you and your mentor can view these entries</p>
            </div>
          </div>
          
          <Button
            onClick={() => setShowNewEntry(!showNewEntry)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Entry
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* New Entry Form */}
          {showNewEntry && (
            <Card className="border-2 border-blue-200">
              <CardContent className="p-4 space-y-4">
                <h3 className="font-semibold text-gray-900">Add New Journal Entry</h3>
                <Input
                  placeholder="Entry title..."
                  value={newEntryTitle}
                  onChange={(e) => setNewEntryTitle(e.target.value)}
                />
                <Textarea
                  placeholder="Write your thoughts, experiences, lessons learned..."
                  value={newEntryContent}
                  onChange={(e) => setNewEntryContent(e.target.value)}
                  rows={6}
                />
                <div className="flex gap-2">
                  <Button onClick={handleAddEntry} className="bg-blue-600 hover:bg-blue-700">
                    Save Entry
                  </Button>
                  <Button variant="outline" onClick={() => setShowNewEntry(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Journal Entries */}
          <div className="space-y-4">
            {entries.map((entry) => (
              <Card key={entry.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{entry.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>{entry.date}</span>
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>{entry.mentorReviewed ? "Reviewed by mentor" : "Pending review"}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant={entry.mentorReviewed ? "default" : "secondary"}>
                      {entry.mentorReviewed ? "Reviewed" : "Pending"}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-700 mb-3 leading-relaxed">{entry.content}</p>
                  
                  {entry.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {entry.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  {entry.mentorFeedback && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-3">
                      <div className="flex items-start gap-2">
                        <MessageSquare className="w-4 h-4 text-green-600 mt-1" />
                        <div>
                          <p className="text-sm font-medium text-green-800 mb-1">Mentor Feedback:</p>
                          <p className="text-sm text-green-700">{entry.mentorFeedback}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
