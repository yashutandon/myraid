import React from "react";
import { cn } from "@/lib/utils";

type MiniBarChartProps = {
  values: number[];
  color: string; // hex color
  className?: string;
  height?: number;
  barWidth?: number;
  gap?: number;
};

/**
 * Lightweight sparkline bar chart rendered with pure CSS.
 * No Recharts dependency for maximum performance in stat cards.
 */
export const MiniBarChart: React.FC<MiniBarChartProps> = ({
  values,
  color,
  className,
  height = 36,
  barWidth = 5,
  gap = 2,
}) => {
  const max = Math.max(...values, 1);

  return (
    <div
      className={cn("flex items-end", className)}
      style={{ height, gap }}
      aria-hidden="true"
    >
      {values.map((v, i) => {
        const pct = (v / max) * 100;
        const opacity = 0.45 + (i / (values.length - 1)) * 0.55;

        return (
          <div
            key={i}
            style={{
              width: barWidth,
              height: `${pct}%`,
              backgroundColor: color,
              opacity,
              borderRadius: 3,
              flexShrink: 0,
            }}
          />
        );
      })}
    </div>
  );
};