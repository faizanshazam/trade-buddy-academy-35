
import React, { useEffect, useMemo, useState } from "react";
import FeedbackCard, { FeedbackCardProps } from "./FeedbackCard";

type Direction = "up" | "down";

interface FeedbackColumnProps {
  cards: FeedbackCardProps[];
  direction: Direction;
  intervalMs?: number; // default to 3500 for slower
}

const VISIBLE_COUNT = 3;

// Helper to get circular index
const mod = (n: number, m: number) => ((n % m) + m) % m;

const FeedbackColumn: React.FC<FeedbackColumnProps> = ({
  cards,
  direction,
  intervalMs = 3500, // slower animation
}) => {
  const [startIdx, setStartIdx] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  // Animation duration for css transition
  const TRANSITION_MS = 1150;

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

  return (
    <div
      className="flex-1 flex flex-col min-w-[320px] max-w-lg items-stretch relative overflow-hidden"
      style={{
        minHeight: 0,
        maxHeight: "70vh",
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
          // Height adapts: no fixed height
        }}
      >
        {circularCards.map((card, idx) => (
          <FeedbackCard key={card.url + "_" + idx} {...card} />
        ))}
      </div>

      {/* Fade overlay for top and bottom, only on larger screens */}
      {/* Not strictly needed here, handled in parent for full columns */}
    </div>
  );
};

export default FeedbackColumn;
