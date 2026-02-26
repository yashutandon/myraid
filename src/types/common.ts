export type WithClassName = {
  className?: string;
};

export type NavItem = {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

export type SelectOption<T extends string = string> = {
  value: T;
  label: string;
};

export type SortDirection = "asc" | "desc";

export type SortConfig<T extends string = string> = {
  key: T;
  direction: SortDirection;
};

export type FilterToggleState = {
  label: string;
  active: boolean;
  color?: string;
};

export type ChartDataPoint = {
  month: string;
  [key: string]: number | string;
};

export type StatusVariant =
  | "in-progress"
  | "applied"
  | "offered"
  | "rejected"
  | "shortlisted"
  | "pending";
