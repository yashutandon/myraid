"use client";

import React from "react";

import { cn } from "@/lib/utils";
import { StatCard } from "@/components/dashboard/StateCard";
import { VacancyChart } from "@/components/dashboard/VacancyChart";
import { JobApplicationTable } from "@/components/dashboard/JobApplicationTable";
import { RecommendedJobs } from "@/components/dashboard/RecommendedJobs";
import { ChevronDownIcon } from "@/components/ui/Icons";
import { useDashboardFilters } from "@/hooks/useDashboardFilters";
import { STAT_CARDS } from "@/data/dashboard";


export default function DashboardPage() {
  const {
    chartFilters,
    toggleChartSeries,
    timeRange,
    setTimeRange,
    appFilters,
    toggleAppFilter,
    sortConfig,
    setSortConfig,
    filteredApplications,
    searchQuery,
    setSearchQuery,
  } = useDashboardFilters();

  return (
    <div className="flex gap-5">
      {/* ─── Main Column ────────────────────────────────────────────────── */}
      <div className="min-w-0 flex-1">
        {/* Page Header */}
        <div
          className={cn(
            "mb-6 flex flex-wrap items-start justify-between gap-3",
            "animate-fade-up",
          )}
        >
          <div>
            <h3 className="text-[24px]  ">
              Welcome back, Julie 👋
            </h3>
            <p className="mt-1 text-[13px]  text-muted-foreground">
              Here&apos;s what you need to focus on today
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button
              className={cn(
                "flex items-center gap-1.5 rounded-xl border border-surface-border-strong",
                "bg-white px-4 py-2 text-[13px] font-semibold text-text-secondary",
                "shadow-sm transition-colors hover:bg-surface-secondary",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
              )}
            >
              Last 30 Days
              <ChevronDownIcon className="text-[12px]" />
            </button>
            <button
              className={cn(
                "rounded-xl bg-[#5052FF] from-brand-500 to-purple-500",
                "px-5 py-2 text-[13px] font-bold text-white shadow-brand",
                "hover:opacity-90 transition-opacity",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
              )}
            >
              Search Job
            </button>
          </div>
        </div>

        {/* Stat Cards */}
        <div
          className="mb-5 grid gap-3.5"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          }}
        >
          {STAT_CARDS.map((card, i) => (
            <StatCard
              key={card.id}
              data={card}
              className={cn(
                "animate-fade-up",
                i === 1 && "[animation-delay:80ms]",
                i === 2 && "[animation-delay:160ms]",
                i === 3 && "[animation-delay:240ms]",
              )}
            />
          ))}
        </div>

        {/* Vacancy Chart */}
        <VacancyChart
          filters={chartFilters}
          onToggleSeries={toggleChartSeries}
          timeRange={timeRange}
          onTimeRangeChange={setTimeRange}
          className="mb-5 animate-fade-up [animation-delay:320ms]"
        />

        {/* Job Application Table */}
        <JobApplicationTable
          applications={filteredApplications}
          filters={appFilters}
          onToggleFilter={toggleAppFilter}
          sortConfig={sortConfig}
          onSort={setSortConfig}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          className="animate-fade-up [animation-delay:400ms]"
        />
      </div>

      {/* ─── Recommended Jobs Sidebar ────────────────────────────────────── */}
      <div className="hidden w-64 shrink-0 lg:block xl:w-72">
        <RecommendedJobs />
      </div>
    </div>
  );
}