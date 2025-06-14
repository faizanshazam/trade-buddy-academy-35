
import React, { useEffect, useRef, useState } from "react";
import FeedbackCard, { FeedbackCardProps } from "./FeedbackCard";

type Direction = "up" | "down";

interface FeedbackColumnProps {
  cards: FeedbackCardProps[];
  direction: Direction;
  heightPx: number;
  visibleCount: number;
  intervalMs?: number;
}

const FeedbackColumn: React.FC<FeedbackColumnProps> = ({
  cards, direction, heightPx, visibleCount, intervalMs = 2200
}) => {
  const [startIdx, setStartIdx] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [slideOffset, setSlideOffset] = useState(0); // 0 or 1

  // Calculate children for smooth circular animation
  const circularCards: FeedbackCardProps[] = [];
  for (let i = 0; i < visibleCount + 1; i++) {
    const idx = (startIdx + (direction === "down" ? i : cards.length - i)) % cards.length;
    const actualIdx = ((idx % cards.length) + cards.length) % cards.length;
    circularCards.push(cards[actualIdx]);
  }
  // The topmost card (for sliding) is at start

  useEffect(() => {
    const timer = setInterval(() => {
      setIsSliding(true);
      setSlideOffset(1);
      setTimeout(() => {
        setStartIdx(prev => (direction === "down"
          ? (prev + 1) % cards.length
          : (prev - 1 + cards.length) % cards.length
        ));
        setIsSliding(false);
        setSlideOffset(0);
      }, 520); // should match duration below
    }, intervalMs);
    return () => clearInterval(timer);
  }, [cards.length, direction, intervalMs]);

  const colHeight = heightPx;
  const cardHeight = colHeight / visibleCount;

  // For "down", cards stack downwards; for "up", upwards. Transform Y movement accordingly.
  let transform: string;
  if (direction === "down") {
    transform = `translateY(${slideOffset * cardHeight * 1}px)`;
  } else {
    transform = `translateY(-${slideOffset * cardHeight * 1}px)`;
  }

  return (
    <div style={{ height: `${colHeight}px`, overflow: "hidden" }} className="flex-1 flex flex-col">
      <div
        className="flex flex-col gap-5 transition-transform duration-500 will-change-transform"
        style={{
          transform,
          transitionTimingFunction: "cubic-bezier(0.65,0,0.35,1)",
          height: cardHeight * (visibleCount + 1)
        }}
      >
        {circularCards.map((card, idx) =>
          <FeedbackCard key={card.url + "_" + idx} {...card} />
        )}
      </div>
    </div>
  );
};

export default FeedbackColumn;
