"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Toggle } from "../ui/toggle";
import { Badge } from "@/components/ui/badge";
import { SortIcon, ChevronDownIcon } from "@/components/ui/Icons";
import type {
  JobApplication,
  ApplicationFilterState,
  ApplicationSortKey,
} from "@/types/dashboard";
import type { SortConfig } from "@/types/common";
import Image from "next/image";

type JobApplicationTableProps = {
  applications: JobApplication[];
  filters: ApplicationFilterState;
  onToggleFilter: (key: keyof ApplicationFilterState) => void;
  sortConfig: SortConfig<ApplicationSortKey>;
  onSort: (key: ApplicationSortKey) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  className?: string;
};


const STATUS_STYLES: Record<string, string> = {
  "in-progress":
    "bg-yellow-100 text-yellow-700 border border-yellow-200",
  applied:
    "bg-purple-100 text-purple-700 border border-purple-200",
  offered:
    "bg-green-100 text-green-700 border border-green-200",
  rejected:
    "bg-red-100 text-red-700 border border-red-200",
  shortlisted:
    "bg-blue-100 text-blue-700 border border-blue-200",
  pending:
    "bg-gray-100 text-gray-700 border border-gray-200",
};

// ─── Filter Toggle Row ────────────────────────────────────────────────────────

const FilterRow: React.FC<{
  filters: ApplicationFilterState;
  onToggle: (key: keyof ApplicationFilterState) => void;
  onSort: () => void;
}> = ({ filters, onToggle, onSort }) => (
  <div className="flex flex-wrap items-center gap-3 sm:gap-4">
    {(
      [
        { key: "new", label: "New", color: "#6366f1" },
        { key: "inProgress", label: "In Progress", color: "#6366f1" },
        { key: "pendingTask", label: "Pending Task", color: "#6366f1" },
      ] as { key: keyof ApplicationFilterState; label: string; color: string }[]
    ).map(({ key, label, color }) => (
      <label
        key={key}
        className="flex cursor-pointer select-none items-center gap-1.5 text-[12px] font-semibold text-text-secondary"
      >
        <Toggle
          pressed={filters[key]}
          onPressedChange={() => onToggle(key)}
          color={color}
          aria-label={`Toggle ${label}`}
        />
        {label}
      </label>
    ))}

    <button
      onClick={onSort}
      className={cn(
        "ml-auto flex items-center gap-1.5 rounded-[10px] border border-surface-border-strong",
        "bg-white px-3 py-1.5 text-[12px] font-semibold text-text-secondary",
        "transition-colors hover:bg-surface-secondary",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
      )}
    >
      Sort By <SortIcon className="text-sm" />
    </button>
  </div>
);

// ─── Table Header Cell ────────────────────────────────────────────────────────

const ThCell: React.FC<{
  label: string;
  sortKey: ApplicationSortKey;
  currentSort: SortConfig<ApplicationSortKey>;
  onSort: (k: ApplicationSortKey) => void;
}> = ({ label, sortKey, currentSort, onSort }) => {
  const isActive = currentSort.key === sortKey;
  return (
    <th
      scope="col"
      className={cn(
        "cursor-pointer select-none pb-2.5 pr-3 text-left text-[10px]  uppercase tracking-wider",
        "transition-colors hover:text-brand-500",
        isActive ? "text-brand-500" : "text-text-muted",
      )}
      onClick={() => onSort(sortKey)}
    >
      <span className="flex items-center gap-1">
        {label}
        {isActive && (
          <ChevronDownIcon
            className={cn(
              "text-[10px] transition-transform",
              currentSort.direction === "asc" && "rotate-180",
            )}
          />
        )}
      </span>
    </th>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

export const JobApplicationTable: React.FC<JobApplicationTableProps> = ({
  applications,
  filters,
  onToggleFilter,
  sortConfig,
  onSort,
  searchQuery,
  onSearchChange,
  className,
}) => {
  return (
    <section
      className={cn(
        "rounded-4xl border border-surface-border bg-surface p-5",
        "shadow-card",
        className,
      )}
    >
      {/* Section Header */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-text-primary">
          Job Application Status
        </h2>
        {/* Search */}
        <input
          type="search"
          placeholder="Search title or company…"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className={cn(
            "h-8 rounded-lg border border-surface-border-strong bg-surface-secondary",
            "px-3 text-[12px] font-medium text-text-secondary placeholder:text-text-muted",
            "focus:outline-none focus:ring-2 focus:ring-brand-500",
          )}
        />
      </div>

      {/* Filters */}
      <FilterRow
        filters={filters}
        onToggle={onToggleFilter}
        onSort={() => onSort(sortConfig.key)}
      />

      {/* Table */}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-collapse" style={{ minWidth: 480 }}>
          <thead>
            <tr className="border-b border-surface-border">
              <ThCell label="Job Title" sortKey="title" currentSort={sortConfig} onSort={onSort} />
              <ThCell label="Company" sortKey="company" currentSort={sortConfig} onSort={onSort} />
              <ThCell label="Applied On" sortKey="appliedDate" currentSort={sortConfig} onSort={onSort} />
              <ThCell label="Status" sortKey="status" currentSort={sortConfig} onSort={onSort} />
            </tr>
          </thead>
          <tbody>
            {applications.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-sm text-text-muted">
                  No applications match your filters.
                </td>
              </tr>
            ) : (
              applications.map((job) => (
                <tr
                  key={job.id}
                  className={cn(
                    "border-b border-surface-border/50",
                    "cursor-pointer transition-colors hover:bg-surface-tertiary",
                  )}
                >
                  <td className="py-3.5 pr-3 text-[14px] font-semibold text-text-primary">
                    {job.title}
                  </td>
                  <td className="py-3.5 pr-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="flex h-6.5 w-6.5 shrink-0 items-center justify-center rounded-[7px] text-[11px]  text-white"
                      >
                        <Image src={job.companyLogo} alt={job.company} width={24} height={24} unoptimized />
                      </div>
                      <span className="text-[13px] font-semibold text-text-secondary">
                        {job.company}
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 pr-3 text-[12px] font-medium text-text-muted">
                    {job.appliedDate}
                  </td>
                  <td className="py-3.5">
                    <Badge
                      className={cn(
                        "capitalize rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
                        STATUS_STYLES[job.status] || "bg-gray-100 text-gray-700"
                      )}
                    >
                      {job.status.replace("-", " ")}
                    </Badge>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};