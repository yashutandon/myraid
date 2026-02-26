"use client";

import { useState, useCallback, useMemo } from "react";
import type {
  ChartFilterState,
  ChartSeriesKey,
  ApplicationFilterState,
  ApplicationSortKey,
  JobApplication,
  TimeRangeOption,
  DashboardFilters,
} from "@/types/dashboard";
import type { SortConfig } from "@/types/common";
import { JOB_APPLICATIONS } from "@/data/dashboard";

const DEFAULT_CHART_FILTERS: ChartFilterState = {
  applicationsSent: true,
  interviews: true,
  rejected: false,
};

const DEFAULT_APP_FILTERS: ApplicationFilterState = {
  new: true,
  inProgress: true,
  pendingTask: false,
};

const DEFAULT_SORT: SortConfig<ApplicationSortKey> = {
  key: "appliedDate",
  direction: "desc",
};

type UseDashboardFiltersReturn = {
  // Chart
  chartFilters: ChartFilterState;
  toggleChartSeries: (key: ChartSeriesKey) => void;
  timeRange: TimeRangeOption;
  setTimeRange: (range: TimeRangeOption) => void;

  // Applications
  appFilters: ApplicationFilterState;
  toggleAppFilter: (key: keyof ApplicationFilterState) => void;
  sortConfig: SortConfig<ApplicationSortKey>;
  setSortConfig: (key: ApplicationSortKey) => void;
  filteredApplications: JobApplication[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  // Reset
  resetAllFilters: () => void;

  // Derived state snapshot for display
  filters: DashboardFilters;
};

/**
 * Centralized hook for all dashboard filter and sort state.
 * Keeps all filtering/sorting logic out of components.
 */
export function useDashboardFilters(): UseDashboardFiltersReturn {
  const [chartFilters, setChartFilters] =
    useState<ChartFilterState>(DEFAULT_CHART_FILTERS);
  const [timeRange, setTimeRange] = useState<TimeRangeOption>("This Year");
  const [appFilters, setAppFilters] =
    useState<ApplicationFilterState>(DEFAULT_APP_FILTERS);
  const [sortConfig, setSortConfigState] =
    useState<SortConfig<ApplicationSortKey>>(DEFAULT_SORT);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // ─── Chart ─────────────────────────────────────────────────────────────────

  const toggleChartSeries = useCallback((key: ChartSeriesKey) => {
    setChartFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  // ─── Application Filters ───────────────────────────────────────────────────

  const toggleAppFilter = useCallback(
    (key: keyof ApplicationFilterState) => {
      setAppFilters((prev) => ({ ...prev, [key]: !prev[key] }));
    },
    [],
  );

  // ─── Sort ──────────────────────────────────────────────────────────────────

  const setSortConfig = useCallback((key: ApplicationSortKey) => {
    setSortConfigState((prev) => ({
      key,
      direction:
        prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  }, []);

  // ─── Derived: Filtered + Sorted Applications ───────────────────────────────

  const filteredApplications = useMemo<JobApplication[]>(() => {
    let result = [...JOB_APPLICATIONS];

    // Filter by status
    if (!appFilters.inProgress) {
      result = result.filter((j) => j.status !== "in-progress");
    }
    if (!appFilters.pendingTask) {
      result = result.filter((j) => j.status !== "pending");
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.company.toLowerCase().includes(q),
      );
    }

    // Sort
    result.sort((a, b) => {
      let aVal: string = "";
      let bVal: string = "";

      switch (sortConfig.key) {
        case "title":
          aVal = a.title;
          bVal = b.title;
          break;
        case "company":
          aVal = a.company;
          bVal = b.company;
          break;
        case "appliedDate":
          // Parse DD/MM/YYYY
          aVal = a.appliedDate.split("/").reverse().join("");
          bVal = b.appliedDate.split("/").reverse().join("");
          break;
        case "status":
          aVal = a.status;
          bVal = b.status;
          break;
      }

      const cmp = aVal.localeCompare(bVal);
      return sortConfig.direction === "asc" ? cmp : -cmp;
    });

    return result;
  }, [appFilters, searchQuery, sortConfig]);

  // ─── Reset ─────────────────────────────────────────────────────────────────

  const resetAllFilters = useCallback(() => {
    setChartFilters(DEFAULT_CHART_FILTERS);
    setTimeRange("This Year");
    setAppFilters(DEFAULT_APP_FILTERS);
    setSortConfigState(DEFAULT_SORT);
    setSearchQuery("");
  }, []);

  // ─── Snapshot ──────────────────────────────────────────────────────────────

  const filters: DashboardFilters = {
    chart: chartFilters,
    timeRange,
    applications: appFilters,
  };

  return {
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
    resetAllFilters,
    filters,
  };
}