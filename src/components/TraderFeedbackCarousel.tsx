
import React, { useEffect, useRef, useState } from "react";
import { Linkedin, Twitter } from "lucide-react";

type Feedback = {
  id: number;
  name: string;
  avatar: string; // URL to avatar image
  platform: "linkedin" | "x";
  content: string; // short text snippet
  url: string; // external post link
};

// Example feedback data
const FEEDBACKS: Feedback[] = [
  {
    id: 1,
    name: "Ankit Verma",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
    platform: "linkedin",
    content: "The options course truly changed how I trade—clear, actionable mentorship. Highly recommended! 🚀",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:123456/",
  },
  {
    id: 2,
    name: "Riya Sharma",
    avatar: "https://randomuser.me/api/portraits/women/43.jpg",
    platform: "x",
    content: "Amazing mentorship and strategies from Rajesh. My profits are now more consistent.",
    url: "https://x.com/riya_sharma/status/17786442",
  },
  {
    id: 3,
    name: "Saurabh Jain",
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
    platform: "linkedin",
    content: "Group chat and weekly Q&A really added practical value. Thanks for being so responsive!",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:24124124/",
  },
  {
    id: 4,
    name: "Priya Mehra",
    avatar: "https://randomuser.me/api/portraits/women/36.jpg",
    platform: "x",
    content: "I never thought I'd finally understand risk management until I took this course.",
    url: "https://x.com/priyamehra_trader/status/19239283",
  },
  {
    id: 5,
    name: "Akshay Pillai",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    platform: "linkedin",
    content: "Live sessions were so interactive. A must for every aspiring options trader!",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:44223091/",
  },
  {
    id: 6,
    name: "Namrata Kulkarni",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    platform: "x",
    content: "Strategies here are next-level—big thanks to the mentor team.",
    url: "https://x.com/namratak/status/38488201",
  },
];

const CARDS_PER_ROW = 3;
const ANIMATION_INTERVAL = 2500; // ms

export const TraderFeedbackCarousel: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cyclically move cards upwards every 2.5s
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setStartIndex((prev) => (prev + CARDS_PER_ROW) % FEEDBACKS.length);
    }, ANIMATION_INTERVAL);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [startIndex]);

  // Get the currently visible cards in order, looping circularly
  const visibleCards = Array(CARDS_PER_ROW)
    .fill(0)
    .map((_, idx) => FEEDBACKS[(startIndex + idx) % FEEDBACKS.length]);

  return (
    <section className="w-full py-14 bg-blue-50 border-t border-blue-100 mt-8">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Trader Feedback</h2>
      <div className="relative max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {visibleCards.map((fb, idx) => (
            <a
              key={fb.id}
              href={fb.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group card-feedback block bg-white rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer border border-gray-200 hover:scale-105"
              style={{
                // Entry animation: slide up on change
                animation: "fade-in 0.7s cubic-bezier(0.4,0,0.6,1)"
              }}
            >
              <div className="flex items-center gap-3 p-5 pb-3">
                <img
                  src={fb.avatar}
                  alt={fb.name}
                  className="w-12 h-12 rounded-full border border-gray-200"
                />
                <div>
                  <p className="font-semibold text-gray-800">{fb.name}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    {fb.platform === "linkedin" ? (
                      <Linkedin className="w-4 h-4 text-blue-700" />
                    ) : (
                      <Twitter className="w-4 h-4 text-blue-500" />
                    )}
                    <span className="ml-1">{fb.platform === "linkedin" ? "LinkedIn" : "X"}</span>
                  </div>
                </div>
              </div>
              <div className="px-5 pb-6">
                <p className="text-gray-600 text-sm">{fb.content}</p>
              </div>
            </a>
          ))}
        </div>
        {/* Simple indicator dots */}
        <div className="flex justify-center gap-1 mt-4">
          {Array(Math.ceil(FEEDBACKS.length / CARDS_PER_ROW))
            .fill(0)
            .map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i === Math.floor(startIndex / CARDS_PER_ROW)
                    ? "bg-blue-600"
                    : "bg-blue-200"
                }`}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default TraderFeedbackCarousel;
