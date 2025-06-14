import React, { useEffect, useRef, useState } from "react";
import { Linkedin, Twitter } from "lucide-react";
import FeedbackColumn from "./FeedbackColumn";
import FeedbackCard, { FeedbackCardProps } from "./FeedbackCard";

// Expanded feedback data (added even more posts)
const FEEDBACKS: FeedbackCardProps[] = [
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
  {
    name: "Shweta K",
    avatar: "https://randomuser.me/api/portraits/women/53.jpg",
    platform: "x",
    content: "Even as a busy mom, these concise WhatsApp tips helped me stay in the market.",
    url: "https://x.com/shwetak/status/92839102",
  },
  {
    name: "Rahul Ahuja",
    avatar: "https://randomuser.me/api/portraits/men/47.jpg",
    platform: "linkedin",
    content: "Loved the honest breakdowns and no-nonsense strategy discussion.",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:11118228/",
  },
  {
    name: "Harshita Singh",
    avatar: "https://randomuser.me/api/portraits/women/19.jpg",
    platform: "linkedin",
    content: "Quality mentoring, responsive team. My friends join too now!",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:92939101/",
  },
  {
    name: "Subham Roy",
    avatar: "https://randomuser.me/api/portraits/men/37.jpg",
    platform: "x",
    content: "I doubled my confidence and capital in 4 months. Thank you, team.",
    url: "https://x.com/subhamroy/status/38592920",
  },
];

const COL_COUNT = 3;
const CARDS_PER_COL = 3;
// Distribute posts among columns (round-robin)
function splitIntoColumns<T>(items: T[], colCount: number): T[][] {
  const columns: T[][] = Array.from({ length: colCount }, () => []);
  items.forEach((item, idx) => {
    columns[idx % colCount].push(item);
  });
  return columns;
}

export const TraderFeedbackCarousel: React.FC = () => {
  const cols = splitIntoColumns(FEEDBACKS, COL_COUNT);
  // viewport height calculation so all cards are big/clear
  const VISIBLE_CARDS = 3;
  const feedbackSectionId = "feedback-carousel-section";

  // Scroll-to-action on first scroll of Index page
  React.useEffect(() => {
    let hasJumped = false;
    const handleScroll = () => {
      if (!hasJumped) {
        hasJumped = true;
        const section = document.getElementById(feedbackSectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Responsive: Full viewport section (on large screens), still readable mobile
  return (
    <section
      id={feedbackSectionId}
      className="w-full bg-blue-50 border-t border-blue-100"
      style={{ minHeight: "min(92vh,1000px)", display: "flex", alignItems: "center" }}
    >
      <div className="w-full max-w-7xl mx-auto px-4 py-20 flex flex-col items-center">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Where we shine
        </h2>
        <div className="w-full flex flex-col sm:flex-row gap-8 justify-center items-stretch">
          <FeedbackColumn
            cards={cols[0]}
            direction="down"
            heightPx={540}
            visibleCount={VISIBLE_CARDS}
          />
          <FeedbackColumn
            cards={cols[1]}
            direction="up"
            heightPx={540}
            visibleCount={VISIBLE_CARDS}
          />
          <FeedbackColumn
            cards={cols[2]}
            direction="down"
            heightPx={540}
            visibleCount={VISIBLE_CARDS}
          />
        </div>
        {/* Optional: indicator dots, but cards themselves are now big enough */}
      </div>
    </section>
  );
};

export default TraderFeedbackCarousel;

// NOTE: TraderFeedbackCarousel.tsx is now much shorter and easier to maintain.
// FeedbackColumn.tsx and FeedbackCard.tsx separate concerns for readability.
