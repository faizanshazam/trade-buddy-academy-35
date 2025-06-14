
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Plus, 
  Calendar,
  Clock,
  BookOpen
} from "lucide-react";

interface PrivateJournalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface JournalEntry {
  id: number;
  title: string;
  date: string;
  time: string;
  content: string;
  type: 'trade' | 'lesson' | 'reflection';
  tags: string[];
}

export const PrivateJournalModal = ({ isOpen, onClose }: PrivateJournalModalProps) => {
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);

  const journalEntries: JournalEntry[] = [
    {
      id: 1,
      title: "Options Trade Analysis - AAPL Call",
      date: "Dec 14, 2024",
      time: "2:30 PM",
      content: "Bought AAPL 190 Call expiring Friday. Entry at $2.50, target $4.00. Risk management: Stop loss at $1.75. Market showing bullish momentum...",
      type: 'trade',
      tags: ['AAPL', 'Options', 'Calls']
    },
    {
      id: 2,
      title: "Risk Management Lesson Notes",
      date: "Dec 13, 2024", 
      time: "7:15 PM",
      content: "Key takeaways from today's session: 1. Never risk more than 2% of portfolio, 2. Position sizing is crucial, 3. Always have an exit plan...",
      type: 'lesson',
      tags: ['Risk Management', 'Position Sizing']
    },
    {
      id: 3,
      title: "Weekly Reflection - Trading Psychology",
      date: "Dec 12, 2024",
      time: "6:00 PM", 
      content: "This week I noticed I'm still struggling with FOMO. Need to stick to my trading plan and avoid impulsive decisions...",
      type: 'reflection',
      tags: ['Psychology', 'FOMO', 'Discipline']
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'trade': return 'bg-green-100 text-green-800';
      case 'lesson': return 'bg-blue-100 text-blue-800'; 
      case 'reflection': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'trade': return <FileText className="w-4 h-4" />;
      case 'lesson': return <BookOpen className="w-4 h-4" />;
      case 'reflection': return <Clock className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl h-[80vh] flex flex-col p-0">
        <DialogHeader className="p-6 border-b">
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Private Trading Journal
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 flex overflow-hidden">
          {/* Journal Entries List */}
          <div className="w-1/2 border-r bg-gray-50 overflow-y-auto">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-900">Journal Entries</h3>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  New Entry
                </Button>
              </div>
              
              <div className="space-y-3">
                {journalEntries.map((entry) => (
                  <Card 
                    key={entry.id} 
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedEntry?.id === entry.id ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => setSelectedEntry(entry)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-sm font-medium line-clamp-2">
                          {entry.title}
                        </CardTitle>
                        <Badge className={getTypeColor(entry.type)}>
                          {getTypeIcon(entry.type)}
                          <span className="ml-1 capitalize">{entry.type}</span>
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                        <Calendar className="w-3 h-3" />
                        <span>{entry.date}</span>
                        <Clock className="w-3 h-3 ml-2" />
                        <span>{entry.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                        {entry.content}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {entry.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {entry.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{entry.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Entry Details */}
          <div className="w-1/2 bg-white overflow-y-auto">
            {selectedEntry ? (
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      {selectedEntry.title}
                    </h2>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{selectedEntry.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{selectedEntry.time}</span>
                      </div>
                    </div>
                  </div>
                  <Badge className={getTypeColor(selectedEntry.type)}>
                    {getTypeIcon(selectedEntry.type)}
                    <span className="ml-1 capitalize">{selectedEntry.type}</span>
                  </Badge>
                </div>

                <div className="prose prose-sm max-w-none mb-6">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {selectedEntry.content}
                  </p>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedEntry.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 mt-6">
                  <Button size="sm" variant="outline">
                    Edit Entry
                  </Button>
                  <Button size="sm" variant="outline">
                    Add Follow-up
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-center">
                <div>
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Select an entry to view details
                  </h3>
                  <p className="text-gray-500">
                    Choose a journal entry from the list to read the full content
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
