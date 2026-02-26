import React from "react";
import { cn } from "@/lib/utils";
import { MiniBarChart } from "@/components/ui/MiniBarChart";
import { TrendUpIcon } from "@/components/ui/Icons";
import type { StatCardData } from "@/types/dashboard";

type StatCardProps = {
  data: StatCardData;
  className?: string;
};

/**
 * Dashboard stat card showing a key metric with a sparkline.
 * Fully presentational — no local state.
 */
export const StatCard: React.FC<StatCardProps> = ({ data, className }) => {
  const isPositive = data.change >= 0;

  return (
    <article
      className={cn(
        "group rounded-4xl border border-surface-border bg-surface p-5",
        "shadow-card transition-all duration-200",
        "hover:-translate-y-0.5 hover:shadow-card-hover",
        "animate-fade-up",
        className,
      )}
    >
      <p className="mb-1.5 text-[18px]   text-text-muted">
        {data.label}
      </p>
      <p className="mb-3 text-[25.93px]  leading-none tracking-tight text-text-primary">
        {data.value}
      </p>
      <div className="flex items-center justify-between">
        <div
          className={cn(
            "flex items-center gap-1 text-[11px] font-bold",
            isPositive ? "text-emerald-500" : "text-red-500",
          )}
        >
          <TrendUpIcon className="text-[12px]" />
          {data.changeLabel}
        </div>
        <MiniBarChart values={data.bars} color={data.color} />
      </div>
    </article>
  );
};