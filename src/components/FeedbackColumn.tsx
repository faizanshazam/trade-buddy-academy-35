
import React, { useRef, useEffect, useState } from "react";
import FeedbackCard, { FeedbackCardProps } from "./FeedbackCard";

interface FeedbackColumnProps {
  cards: FeedbackCardProps[];
  direction: "up" | "down";
  durationMs?: number; // duration in ms for a full loop
}

const VISIBLE_COUNT = 3;

const FeedbackColumn: React.FC<FeedbackColumnProps> = ({
  cards,
  direction,
  durationMs = 18000, // 18 seconds for a full loop
}) => {
  const columnRef = useRef<HTMLDivElement>(null);
  const [cardHeights, setCardHeights] = useState<number[]>([]);
  const [totalHeight, setTotalHeight] = useState(0);

  // Measure each card to get total column height
  useEffect(() => {
    if (!columnRef.current) return;
    const cardEls = Array.from(columnRef.current.children) as HTMLElement[];
    const heights = cardEls.map((el) => el.getBoundingClientRect().height);
    setCardHeights(heights);
    setTotalHeight(heights.reduce((a, b) => a + b, 0));
  }, [cards]);

  // Reset animation on cards/config change
  useEffect(() => {
    if (!columnRef.current) return;
    columnRef.current.style.animation = "none";
    // Trigger reflow
    void columnRef.current.offsetWidth;
    columnRef.current.style.animation = `${direction === "down" ? "column-down" : "column-up"} ${durationMs}ms linear infinite`;
  }, [cards, totalHeight, direction, durationMs]);

  // Duplicate card list (for seamless scroll loop)
  const displayCards = [...cards, ...cards];

  // Fading mask height (px)
  const FADE_SIZE = 60;

  return (
    <div
      className="flex-1 flex flex-col min-w-[320px] max-w-lg items-stretch relative overflow-hidden"
      style={{
        minHeight: 0,
        maxHeight: "80vh",
      }}
    >
      {/* Animated column */}
      <div
        ref={columnRef}
        className="flex flex-col gap-6"
        style={{
          animation: `${direction === "down" ? "column-down" : "column-up"} ${durationMs}ms linear infinite`,
        }}
      >
        {displayCards.map((card, idx) => (
          <FeedbackCard
            key={card.url + "_" + idx}
            {...card}
          />
        ))}
      </div>
      {/* Fade overlay for top & bottom for circular visual effect */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 w-full"
        style={{
          height: FADE_SIZE,
          top: 0,
          background: "linear-gradient(to bottom, rgba(240,246,255,.98) 70%, rgba(240,246,255,0))",
          zIndex: 10,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 w-full"
        style={{
          height: FADE_SIZE,
          bottom: 0,
          background: "linear-gradient(to top, rgba(240,246,255,.98) 70%, rgba(240,246,255,0))",
          zIndex: 10,
        }}
      />
      {/* Keyframes injected for column scroll */}
      <style>
        {`
          @keyframes column-down {
            0% { transform: translateY(0); }
            100% { transform: translateY(-50%); }
          }
          @keyframes column-up {
            0% { transform: translateY(-50%); }
            100% { transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default FeedbackColumn;
