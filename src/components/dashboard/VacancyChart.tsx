"use client";

import React, { useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, type TooltipProps,
} from "recharts";
import { cn } from "@/lib/utils";
import { Toggle } from "../ui/toggle";
import { ChevronDownIcon } from "@/components/ui/Icons";
import { VACANCY_DATA, CHART_SERIES, TIME_RANGE_OPTIONS } from "@/data/dashboard";
import type {
  ChartFilterState, ChartSeriesKey,
  TimeRangeOption, VacancyDataPoint,
} from "@/types/dashboard";

type VacancyChartProps = {
  filters: ChartFilterState;
  onToggleSeries: (key: ChartSeriesKey) => void;
  timeRange: TimeRangeOption;
  onTimeRangeChange: (range: TimeRangeOption) => void;
  className?: string;
};

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
  active, payload, label,
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-[14px] border border-surface-border bg-white p-3 shadow-xl">
      <p className="mb-2 text-[11px] font-semibold text-text-muted">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="mb-1 flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: entry.color }}
          />
          <span className="text-[11px] text-text-secondary flex-1">{entry.name}</span>
          <span className="ml-3 text-sm font-semibold text-text-primary">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

// ─── Time Range Dropdown ──────────────────────────────────────────────────────

const TimeRangeDropdown: React.FC<{
  value: TimeRangeOption;
  onChange: (v: TimeRangeOption) => void;
}> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex items-center gap-1.5 rounded-[10px] border border-surface-border-strong",
          "bg-white px-3 py-1.5 text-[12px] font-semibold text-text-secondary",
          "transition-colors hover:bg-surface-secondary",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
        )}
      >
        {value}
        <ChevronDownIcon className="text-[12px]" />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
          />
          <div
            className={cn(
              "absolute right-0 top-[calc(100%+6px)] z-20 min-w-35",
              "rounded-xl border border-surface-border bg-white shadow-xl",
              "py-1",
            )}
          >
            {TIME_RANGE_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => { onChange(opt); setOpen(false); }}
                className={cn(
                  "flex w-full items-center px-3 py-2 text-left text-[12px] font-semibold",
                  "transition-colors hover:bg-surface-secondary",
                  opt === value
                    ? "text-brand-500"
                    : "text-text-secondary",
                )}
              >
                {opt}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

export const VacancyChart: React.FC<VacancyChartProps> = ({
  filters,
  onToggleSeries,
  timeRange,
  onTimeRangeChange,
  className,
}) => {
  // Build recharts-compatible data from raw vacancy data
  const chartData = VACANCY_DATA.map((d: VacancyDataPoint) => ({
    month: d.month,
    ...(filters.applicationsSent ? { "Application Sent": d.applicationsSent } : {}),
    ...(filters.interviews ? { Interviews: d.interviews } : {}),
    ...(filters.rejected ? { Rejected: d.rejected } : {}),
  }));

  return (
    <section
      className={cn(
        "rounded-4xl border border-surface-border bg-surface p-5",
        "shadow-card transition-all duration-200 hover:shadow-card-hover",
        className,
      )}
    >
      {/* Header */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-text-primary">Vacancy Stats</h2>

        <div className="flex flex-wrap items-center gap-4">
          {/* Series Toggles */}
          {CHART_SERIES.map((series) => (
            <label
              key={series.key}
              className="flex cursor-pointer items-center gap-2 text-[12px] font-semibold text-black select-none"
            >
              <Toggle
                pressed={filters[series.key]}
                onPressedChange={() => onToggleSeries(series.key)}
                aria-label={`Toggle ${series.label}`}
        
              />
              {series.label}
            </label>
          ))}

          {/* Time Range */}
          <TimeRangeDropdown value={timeRange} onChange={onTimeRangeChange} />
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -28, bottom: 0 }}>
          <defs>
            {CHART_SERIES.map((s) => (
              <linearGradient key={s.gradientId} id={s.gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={s.color} stopOpacity={0.12} />
                <stop offset="95%" stopColor={s.color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: "#94A3B8", fontWeight: 600 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#94A3B8", fontWeight: 600 }}
            axisLine={false}
            tickLine={false}
            domain={[0, 1000]}
            ticks={[0, 200, 400, 600, 800, 1000]}
          />
          <Tooltip content={<CustomTooltip />} />

          {CHART_SERIES.map((s) =>
            filters[s.key] ? (
              <Area
                key={s.key}
                type="monotone"
                dataKey={s.label === "Application Sent" ? "Application Sent" : s.label}
                name={s.label}
                stroke={s.color}
                strokeWidth={2.5}
                fill={`url(#${s.gradientId})`}
                dot={false}
                activeDot={{ r: 5, fill: s.color, strokeWidth: 0 }}
              />
            ) : null,
          )}
        </AreaChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-5">
        {CHART_SERIES.map((s) => (
          <div key={s.key} className="flex items-center gap-1.5 text-[12px] font-semibold text-text-secondary">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: s.color }}
            />
            {s.label}
          </div>
        ))}
      </div>
    </section>
  );
};