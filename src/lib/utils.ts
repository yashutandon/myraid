import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { JobApplicationStatus } from "@/types/dashboard";

/**
 * Merge Tailwind classes safely, resolving conflicts.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format a number with K/M suffix for large values.
 */
export function formatCompactNumber(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return String(value);
}

/**
 * Get Tailwind color classes for a given job application status.
 */
export function getStatusClasses(status: JobApplicationStatus): {
  bg: string;
  text: string;
} {
  const map: Record<JobApplicationStatus, { bg: string; text: string }> = {
    "in-progress": {
      bg: "bg-status-in-progress-bg",
      text: "text-status-in-progress-text",
    },
    applied: {
      bg: "bg-status-applied-bg",
      text: "text-status-applied-text",
    },
    offered: {
      bg: "bg-status-offered-bg",
      text: "text-status-offered-text",
    },
    rejected: {
      bg: "bg-status-rejected-bg",
      text: "text-status-rejected-text",
    },
    shortlisted: {
      bg: "bg-status-shortlisted-bg",
      text: "text-status-shortlisted-text",
    },
    pending: {
      bg: "bg-amber-100",
      text: "text-amber-700",
    },
  };
  return map[status] ?? { bg: "bg-gray-100", text: "text-gray-600" };
}

/**
 * Humanize a status key to display label.
 */
export function humanizeStatus(status: JobApplicationStatus): string {
  const map: Record<JobApplicationStatus, string> = {
    "in-progress": "In Progress",
    applied: "Applied",
    offered: "Offered",
    rejected: "Rejected",
    shortlisted: "Shortlisted",
    pending: "Pending",
  };
  return map[status] ?? status;
}

/**
 * Clamp a number between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Debounce a function.
 */
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}