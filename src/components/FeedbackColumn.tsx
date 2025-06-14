
import React, { useEffect, useMemo, useState } from "react";
import FeedbackCard, { FeedbackCardProps } from "./FeedbackCard";

type Direction = "up" | "down";

interface FeedbackColumnProps {
  cards: FeedbackCardProps[];
  direction: Direction;
  intervalMs?: number; // default to 4500 for even slower
}

const VISIBLE_COUNT = 3;

// Helper to get circular index
const mod = (n: number, m: number) => ((n % m) + m) % m;

const FeedbackColumn: React.FC<FeedbackColumnProps> = ({
  cards,
  direction,
  intervalMs = 4500, // even slower by default
}) => {
  const [startIdx, setStartIdx] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  // Animation duration for css transition
  const TRANSITION_MS = 1700;

  // Array of visible + 1 cards for stacking
  const circularCards = useMemo(() => {
    const result: FeedbackCardProps[] = [];
    for (let i = 0; i < VISIBLE_COUNT + 1; i++) {
      let idx = direction === "down"
        ? mod(startIdx + i, cards.length)
        : mod(startIdx + cards.length - i, cards.length);
      result.push(cards[idx]);
    }
    return result;
  }, [cards, direction, startIdx]);

  // Animate column motion on interval
  useEffect(() => {
    const timer = setInterval(() => {
      setIsSliding(true);
      setTimeout(() => {
        setStartIdx((prev) =>
          direction === "down"
            ? mod(prev + 1, cards.length)
            : mod(prev - 1, cards.length)
        );
        setIsSliding(false);
      }, TRANSITION_MS);
    }, intervalMs);
    return () => clearInterval(timer);
    // eslint-disable-next-line
  }, [cards.length, direction, intervalMs]);

  // Determine offset for sliding
  const offset = isSliding ? (direction === "down" ? 1 : -1) : 0;

  // Fading mask for top & bottom
  const FADE_SIZE = 48;

  return (
    <div
      className="flex-1 flex flex-col min-w-[320px] max-w-lg items-stretch relative overflow-hidden"
      style={{
        minHeight: 0,
        maxHeight: "80vh",
      }}
    >
      <div
        className="flex flex-col gap-6 transition-transform"
        style={{
          transform: `translateY(${-offset * 100}%)`,
          transition: isSliding 
            ? `transform ${TRANSITION_MS}ms cubic-bezier(0.65,0,0.35,1)`
            : "none",
          willChange: "transform",
        }}
      >
        {circularCards.map((card, idx) => (
          <FeedbackCard key={card.url + "_" + idx} {...card} />
        ))}
      </div>
      {/* Fade overlay for top & bottom for circular visual effect */}
      <div
        className="pointer-events-none absolute left-0 w-full"
        style={{
          height: FADE_SIZE,
          top: 0,
          background: "linear-gradient(to bottom, rgba(240,246,255,.98) 70%, rgba(240,246,255,0))",
          zIndex: 10,
        }}
      />
      <div
        className="pointer-events-none absolute left-0 w-full"
        style={{
          height: FADE_SIZE,
          bottom: 0,
          background: "linear-gradient(to top, rgba(240,246,255,.98) 70%, rgba(240,246,255,0))",
          zIndex: 10,
        }}
      />
    </div>
  );
};

export default FeedbackColumn;
