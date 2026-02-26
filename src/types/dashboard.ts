import type { StatusVariant } from "./common";

// ─── Stat Card ────────────────────────────────────────────────────────────────

export type StatCardData = {
  id: string;
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  color: string;
  bars: number[];
};

// ─── Vacancy Chart ────────────────────────────────────────────────────────────

export type VacancyDataPoint = {
  month: string;
  applicationsSent: number;
  interviews: number;
  rejected: number;
};

export type ChartSeriesKey = "applicationsSent" | "interviews" | "rejected";

export type ChartSeries = {
  key: ChartSeriesKey;
  label: string;
  color: string;
  gradientId: string;
};

export type ChartFilterState = Record<ChartSeriesKey, boolean>;

export type TimeRangeOption = "This Week" | "This Month" | "This Quarter" | "This Year";

// ─── Job Application ──────────────────────────────────────────────────────────

export type JobApplicationStatus = StatusVariant;

export type JobApplication = {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  appliedDate: string;
  status: JobApplicationStatus;
};

export type ApplicationFilterState = {
  new: boolean;
  inProgress: boolean;
  pendingTask: boolean;
};

export type ApplicationSortKey = "title" | "company" | "appliedDate" | "status";

// ─── Recommended Jobs ─────────────────────────────────────────────────────────

export type RecommendedJob = {
  id: string;
  title: string;
  company: string;
  rating: number;
  location: string;
  workType: "Remote" | "Hybrid" | "On-site";
  postedAt: string;
};

// ─── Dashboard Page State ─────────────────────────────────────────────────────

export type DashboardFilters = {
  chart: ChartFilterState;
  timeRange: TimeRangeOption;
  applications: ApplicationFilterState;
};