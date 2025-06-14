import React, { useEffect } from "react";
import FeedbackColumn from "./FeedbackColumn";
import { FeedbackCardProps } from "./FeedbackCard";

// Updated feedback data: removed id property
const FEEDBACKS: FeedbackCardProps[] = [
  {
    name: "Ankit Verma",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
    platform: "linkedin",
    content: "The options course truly changed how I trade—clear, actionable mentorship. Highly recommended! 🚀",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:123456/",
  },
  {
    name: "Riya Sharma",
    avatar: "https://randomuser.me/api/portraits/women/43.jpg",
    platform: "x",
    content: "Amazing mentorship and strategies from Rajesh. My profits are now more consistent.",
    url: "https://x.com/riya_sharma/status/17786442",
  },
  {
    name: "Saurabh Jain",
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
    platform: "linkedin",
    content: "Group chat and weekly Q&A really added practical value. Thanks for being so responsive!",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:24124124/",
  },
  {
    name: "Priya Mehra",
    avatar: "https://randomuser.me/api/portraits/women/36.jpg",
    platform: "x",
    content: "I never thought I'd finally understand risk management until I took this course.",
    url: "https://x.com/priyamehra_trader/status/19239283",
  },
  {
    name: "Akshay Pillai",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    platform: "linkedin",
    content: "Live sessions were so interactive. A must for every aspiring options trader!",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:44223091/",
  },
  {
    name: "Namrata Kulkarni",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    platform: "x",
    content: "Strategies here are next-level—big thanks to the mentor team.",
    url: "https://x.com/namratak/status/38488201",
  },
  {
    name: "Deepak Patel",
    avatar: "https://randomuser.me/api/portraits/men/51.jpg",
    platform: "linkedin",
    content: "Was new to options. The community here made learning enjoyable & profitable!",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:553399881/",
  },
  {
    name: "Sayali Bansode",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    platform: "x",
    content: "Loved the approachable mentors. My confidence in the market is way higher.",
    url: "https://x.com/sayalib/status/299483910",
  },
  {
    name: "Manoj Rao",
    avatar: "https://randomuser.me/api/portraits/men/89.jpg",
    platform: "linkedin",
    content: "The practical examples & weekly assignments made a real difference.",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:66234011/",
  },
  {
    name: "Aparna Joshi",
    avatar: "https://randomuser.me/api/portraits/women/41.jpg",
    platform: "x",
    content: "Clear explanations and real trade breakdowns changed the game for me.",
    url: "https://x.com/aparna_j/status/199948382",
  },
  {
    name: "Karan Ganesh",
    avatar: "https://randomuser.me/api/portraits/men/61.jpg",
    platform: "linkedin",
    content: "Always helpful and transparent. Zero fluff, only real results.",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:64040555/",
  },
  {
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
  // Add more posts for even more variety
  {
    name: "Vidya Chopra",
    avatar: "https://randomuser.me/api/portraits/women/72.jpg",
    platform: "linkedin",
    content: "Straightforward advice, clarity like never before. Joined every session without fail.",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:22010221/",
  },
  {
    name: "Siddharth Kale",
    avatar: "https://randomuser.me/api/portraits/men/24.jpg",
    platform: "x",
    content: "I finally understand credit spreads thanks to this team. Forever grateful!",
    url: "https://x.com/siddkale/status/32019283",
  },
  {
    name: "Aarti Pandey",
    avatar: "https://randomuser.me/api/portraits/women/28.jpg",
    platform: "linkedin",
    content: "The growth I have seen in my P&L is directly due to the mentorship here.",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:78282910/",
  },
];

const COL_COUNT = 3;

// Distribute posts among columns (round-robin)
function splitIntoColumns<T>(items: T[], colCount: number): T[][] {
  const columns: T[][] = Array.from({ length: colCount }, () => []);
  items.forEach((item, idx) => {
    columns[idx % colCount].push(item);
  });
  return columns;
}

export const TraderFeedbackCarousel: React.FC = () => {
  const cols = splitIntoColumns(FEEDBACKS, 3);

  // Section ID for scroll
  const feedbackSectionId = "feedback-carousel-section";

  // Scroll-to-section on first page scroll
  useEffect(() => {
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

  // Layout: take full screen by default, more screen area for feedback!
  return (
    <section
      id={feedbackSectionId}
      className="w-full bg-blue-50 border-t border-blue-100 flex items-center"
      style={{ minHeight: "100vh", height: "100vh" }}
    >
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-6 py-12 flex flex-col items-center justify-center h-full">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Where we shine
        </h2>
        <div className="w-full flex flex-col sm:flex-row gap-8 justify-center items-stretch relative h-full min-h-[60vh]">
          {/* Fade overlays are in the column for even better visual */}
          <FeedbackColumn
            cards={cols[0]}
            direction="down"
            intervalMs={5000}
            />
          <FeedbackColumn
            cards={cols[1]}
            direction="up"
            intervalMs={5000}
            />
          <FeedbackColumn
            cards={cols[2]}
            direction="down"
            intervalMs={5000}
            />
        </div>
      </div>
    </section>
  );
};

export default TraderFeedbackCarousel;
