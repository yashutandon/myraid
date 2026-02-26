import type {
  StatCardData,
  VacancyDataPoint,
  JobApplication,
  RecommendedJob,
  ChartSeries,
  TimeRangeOption,
} from "@/types/dashboard";

// ─── Stat Cards ───────────────────────────────────────────────────────────────

export const STAT_CARDS: StatCardData[] = [
  {
    id: "active",
    label: "Active Jobs",
    value: "03",
    change: 5,
    changeLabel: "+5 from yesterday",
    color: "#6366f1",
    bars: [30, 55, 40, 70, 50, 75, 55],
  },
  {
    id: "in-progress",
    label: "Jobs In Progress",
    value: "03",
    change: 5,
    changeLabel: "+5 from yesterday",
    color: "#f59e0b",
    bars: [50, 35, 65, 45, 60, 40, 70],
  },
  {
    id: "shortlisted",
    label: "Shortlisted",
    value: "03",
    change: 5,
    changeLabel: "+5 from yesterday",
    color: "#10b981",
    bars: [45, 60, 40, 70, 50, 75, 55],
  },
  {
    id: "on-hold",
    label: "On Hold",
    value: "03",
    change: 5,
    changeLabel: "+5 from yesterday",
    color: "#ef4444",
    bars: [65, 45, 60, 35, 70, 50, 40],
  },
];

// ─── Chart Series Config ──────────────────────────────────────────────────────

export const CHART_SERIES: ChartSeries[] = [
  {
    key: "applicationsSent",
    label: "Application Sent",
    color: "#6366f1",
    gradientId: "sentGradient",
  },
  {
    key: "interviews",
    label: "Interviews",
    color: "#10b981",
    gradientId: "interviewsGradient",
  },
  {
    key: "rejected",
    label: "Rejected",
    color: "#ef4444",
    gradientId: "rejectedGradient",
  },
];

// ─── Vacancy Chart Data ───────────────────────────────────────────────────────

export const VACANCY_DATA: VacancyDataPoint[] = [
  { month: "Jan", applicationsSent: 620, interviews: 480, rejected: 120 },
  { month: "Feb", applicationsSent: 580, interviews: 300, rejected: 95 },
  { month: "Mar", applicationsSent: 680, interviews: 820, rejected: 140 },
  { month: "Apr", applicationsSent: 550, interviews: 580, rejected: 85 },
  { month: "May", applicationsSent: 720, interviews: 700, rejected: 160 },
  { month: "Jun", applicationsSent: 600, interviews: 520, rejected: 110 },
  { month: "Jul", applicationsSent: 660, interviews: 480, rejected: 130 },
  { month: "Aug", applicationsSent: 640, interviews: 550, rejected: 145 },
  { month: "Sep", applicationsSent: 700, interviews: 700, rejected: 155 },
  { month: "Oct", applicationsSent: 680, interviews: 640, rejected: 125 },
  { month: "Nov", applicationsSent: 660, interviews: 460, rejected: 100 },
  { month: "Dec", applicationsSent: 640, interviews: 380, rejected: 90 },
];

// ─── Job Applications ─────────────────────────────────────────────────────────

export const JOB_APPLICATIONS: JobApplication[] = [
  {
    id: "ja-001",
    title: "Jr. Front-end Developer",
    company: "Microsoft",
    companyLogo: "/microsoft.ico",
    appliedDate: "08/08/2023",
    status: "in-progress",
  },
  {
    id: "ja-002",
    title: "Senior Back-end Developer",
    company: "Google",
    companyLogo: "/google.ico",
    appliedDate: "24/07/2023",
    status: "applied",
  },
  {
    id: "ja-003",
    title: "UI/UX Designer",
    company: "Meta",
    companyLogo: "/meta.svg",
    appliedDate: "01/05/2023",
    status: "offered",
  },
  {
    id: "ja-004",
    title: "Product Manager",
    company: "Apple",
    companyLogo: "/apple-logo.png",
    appliedDate: "15/04/2023",
    status: "rejected",
  },
  {
    id: "ja-005",
    title: "Data Scientist",
    company: "Netflix",
    companyLogo: "/Netflix.png",
    appliedDate: "10/03/2023",
    status: "shortlisted",
  },
  {
    id: "ja-006",
    title: "DevOps Engineer",
    company: "Amazon",
    companyLogo: "/amazon.ico",
    appliedDate: "02/02/2023",
    status: "pending",
  },
];

// ─── Recommended Jobs ─────────────────────────────────────────────────────────

export const RECOMMENDED_JOBS: RecommendedJob[] = [
  {
    id: "rj-001",
    title: "UI UX Designer",
    company: "SyncUp Technologies",
    rating: 4.5,
    location: "Bangalore",
    workType: "Hybrid",
    postedAt: "24 min. ago",
  },
  {
    id: "rj-002",
    title: "Product Designer",
    company: "TechCorp India",
    rating: 4.2,
    location: "Mumbai",
    workType: "Remote",
    postedAt: "1 hr. ago",
  },
  {
    id: "rj-003",
    title: "Senior UX Lead",
    company: "Flipkart",
    rating: 4.7,
    location: "Bangalore",
    workType: "On-site",
    postedAt: "3 hr. ago",
  },
  {
    id: "rj-004",
    title: "Visual Designer",
    company: "Razorpay",
    rating: 4.4,
    location: "Pune",
    workType: "Hybrid",
    postedAt: "5 hr. ago",
  },
];

// ─── Time Range Options ───────────────────────────────────────────────────────

export const TIME_RANGE_OPTIONS: TimeRangeOption[] = [
  "This Week",
  "This Month",
  "This Quarter",
  "This Year",
];