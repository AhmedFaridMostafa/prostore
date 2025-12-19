"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  maxRating?: number;
  defaultRating?: number;
  color?: string;
  size?: number;
  className?: string;
  onSetRating?: (rating: number) => void;
  readOnly?: boolean;
  allowHalf?: boolean;
}

export default function StarRating({
  maxRating = 5,
  color = "#fcc419",
  size = 48,
  className = "",
  defaultRating = 0,
  onSetRating,
  readOnly = false,
  allowHalf = false,
}: StarRatingProps) {
  const [rating, setRating] = useState(defaultRating);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  const handleRating = (newRating: number) => {
    if (readOnly) return;
    setRating(newRating);
    onSetRating?.(newRating);
  };

  const activeRating = hoveredRating !== null ? hoveredRating : rating;

  return (
    <div
      className={cn("flex", className)}
      onMouseLeave={() => !readOnly && setHoveredRating(null)}
    >
      {Array.from({ length: maxRating }, (_, i) => (
        <Star
          key={`stat-${i}`}
          index={i}
          activeRating={activeRating}
          onRate={handleRating}
          onHover={setHoveredRating}
          color={color}
          size={size}
          readOnly={readOnly}
          allowHalf={allowHalf}
        />
      ))}
    </div>
  );
}

interface StarProps {
  index: number;
  activeRating: number;
  onRate: (rating: number) => void;
  onHover: (rating: number) => void;
  color: string;
  size: number;
  readOnly: boolean;
  allowHalf: boolean;
}

const Star = ({
  index,
  activeRating,
  onRate,
  onHover,
  color,
  size,
  readOnly,
  allowHalf,
}: StarProps) => {
  const starValue = index + 1;
  const isFull = activeRating >= starValue;
  const isHalf =
    allowHalf && activeRating >= starValue - 0.5 && activeRating < starValue;

  const calculateRating = (e: React.MouseEvent<HTMLButtonElement>): number => {
    if (!allowHalf) return starValue;
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const isLeftHalf = mouseX < rect.width / 2;
    return isLeftHalf ? starValue - 0.5 : starValue;
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (readOnly) return;
    onRate(calculateRating(e));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (readOnly || !allowHalf) return;
    onHover(calculateRating(e));
  };

  const handleMouseEnter = () => {
    if (readOnly) return;
    if (!allowHalf) {
      onHover(starValue);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      disabled={readOnly}
      className={cn(
        "relative border-0 bg-transparent p-0 transition-transform",
        readOnly ? "cursor-default" : "cursor-pointer hover:scale-110"
      )}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
      aria-label={
        readOnly
          ? `Rated ${activeRating} out of ${5} stars`
          : `Rate ${starValue} stars`
      }
    >
      {/* Background (empty star) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute inset-0 transition-colors"
      >
        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>

      {/* Foreground (filled star or half star) */}
      {(isFull || isHalf) && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={color}
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute inset-0 transition-colors"
          style={{
            clipPath: isHalf ? "inset(0 50% 0 0)" : "none",
          }}
        >
          <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      )}
    </button>
  );
};
