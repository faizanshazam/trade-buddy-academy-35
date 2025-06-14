
import React, { useEffect, useRef, useState } from "react";
import { Linkedin, Twitter } from "lucide-react";

// Expanded feedback data (as before)
const FEEDBACKS = [
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
  {
    id: 7,
    name: "Deepak Patel",
    avatar: "https://randomuser.me/api/portraits/men/51.jpg",
    platform: "linkedin",
    content: "Was new to options. The community here made learning enjoyable & profitable!",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:553399881/",
  },
  {
    id: 8,
    name: "Sayali Bansode",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    platform: "x",
    content: "Loved the approachable mentors. My confidence in the market is way higher.",
    url: "https://x.com/sayalib/status/299483910",
  },
  {
    id: 9,
    name: "Manoj Rao",
    avatar: "https://randomuser.me/api/portraits/men/89.jpg",
    platform: "linkedin",
    content: "The practical examples & weekly assignments made a real difference.",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:66234011/",
  },
  {
    id: 10,
    name: "Aparna Joshi",
    avatar: "https://randomuser.me/api/portraits/women/41.jpg",
    platform: "x",
    content: "Clear explanations and real trade breakdowns changed the game for me.",
    url: "https://x.com/aparna_j/status/199948382",
  },
  {
    id: 11,
    name: "Karan Ganesh",
    avatar: "https://randomuser.me/api/portraits/men/61.jpg",
    platform: "linkedin",
    content: "Always helpful and transparent. Zero fluff, only real results.",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:64040555/",
  },
  {
    id: 12,
    name: "Jasmine Seth",
    avatar: "https://randomuser.me/api/portraits/women/56.jpg",
    platform: "x",
    content: "Finally found a place to grow as a trader. Friendly, honest, motivating.",
    url: "https://x.com/jasmineseth/status/38488101",
  },
];

const CARDS_PER_COL = 3;
const COL_COUNT = 3;

type Feedback = typeof FEEDBACKS[number];

function splitIntoColumns<T>(items: T[], colCount: number): T[][] {
  // Distribute round-robin
  const columns: T[][] = Array.from({ length: colCount }, () => []);
  items.forEach((item, idx) => {
    columns[idx % colCount].push(item);
  });
  return columns;
}

// Animate smoothly upward with phase offset for each column
const COL_INTERVAL = 2300; // ms, one shared interval

export const TraderFeedbackCarousel: React.FC = () => {
  const cols = splitIntoColumns(FEEDBACKS, COL_COUNT);
  const colLengths = cols.map(col => col.length);

  // Each column has its own index, start at a different phase
  const [startIndices, setStartIndices] = useState([
    0,
    Math.floor(colLengths[1] / 3),
    Math.floor(colLengths[2] / 2),
  ]);
  // For triggering transition effect after mount
  const [isTransitioning, setIsTransitioning] = useState([false, false, false]);
  // For sliding animation
  const [slideOffsets, setSlideOffsets] = useState([0, 0, 0]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // One shared timer
    intervalRef.current = setInterval(() => {
      setSlideOffsets([1, 1, 1]);
      setIsTransitioning([true, true, true]);
      setTimeout(() => {
        setStartIndices((prev) =>
          prev.map((idx, col) => (idx + 1) % colLengths[col])
        );
        setSlideOffsets([0, 0, 0]);
        setIsTransitioning([false, false, false]);
      }, 480); // matches CSS transition duration
    }, COL_INTERVAL);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line
  }, []);

  // Compute the visible cards for a column for circular logic
  const getColCards = (col: number) => {
    const data = cols[col];
    const idx = startIndices[col];
    const arr: Feedback[] = [];
    for (let i = 0; i < CARDS_PER_COL + 1; i++) {
      arr.push(data[(idx + i) % data.length]);
    }
    return arr;
  };

  return (
    <section className="w-full py-14 bg-blue-50 border-t border-blue-100 mt-8">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
        Where we shine
      </h2>
      <div className="relative max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[0, 1, 2].map((colIdx) => (
            <div key={colIdx} className="overflow-hidden h-[320px] flex flex-col">
              <div
                className={`flex flex-col gap-6 transition-transform duration-500 will-change-transform`}
                style={{
                  transform: `translateY(-${
                    slideOffsets[colIdx]
                      ? (100 / CARDS_PER_COL)
                      : 0
                  }%)`,
                  transitionTimingFunction: "cubic-bezier(0.55,0,0.45,1)",
                  transitionDuration: isTransitioning[colIdx] ? "480ms" : "0ms",
                  height: "100%", // ensure height remains stable
                }}
              >
                {getColCards(colIdx).map((fb, cardIdx) => (
                  <a
                    key={fb.id + "_" + cardIdx}
                    href={fb.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group card-feedback block bg-white rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer border border-gray-200 hover:scale-105 animate-fade-in"
                    style={{
                      animation: "fade-in 0.7s cubic-bezier(0.4,0,0.6,1)",
                      minHeight: "96px"
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
                          <span className="ml-1">
                            {fb.platform === "linkedin" ? "LinkedIn" : "X"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="px-5 pb-6">
                      <p className="text-gray-600 text-sm">{fb.content}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Indicator dots for each column */}
        <div className="flex justify-center gap-2 mt-4">
          {[0, 1, 2].map((colIdx) => (
            <div key={colIdx} className="flex gap-1">
              {Array(Math.ceil(cols[colIdx].length / CARDS_PER_COL))
                .fill(0)
                .map((_, i) => (
                  <span
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i === Math.floor(startIndices[colIdx] / 1)
                        ? "bg-blue-600"
                        : "bg-blue-200"
                    }`}
                  />
                ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TraderFeedbackCarousel;

// NOTE: This file is now very long (230+ lines). Consider refactoring into smaller focused components: e.g. FeedbackColumn, FeedbackCard, etc.
