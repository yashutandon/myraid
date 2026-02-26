import React from "react";
import { cn } from "@/lib/utils";
import {
  StarIcon, MapPinIcon, BuildingIcon,
  ArrowRightIcon, DotsHorizontalIcon,
} from "@/components/ui/Icons";
import { RECOMMENDED_JOBS } from "@/data/dashboard";
import type { RecommendedJob } from "@/types/dashboard";

type RecommendedJobsProps = {
  className?: string;
};

const JobItem: React.FC<{ job: RecommendedJob; isLast: boolean }> = ({
  job,
  isLast,
}) => (
  <div
    className={cn(
      "cursor-pointer py-3 transition-opacity hover:opacity-80",
      !isLast && "border-b border-surface-border/50",
    )}
  >
    {/* Header */}
    <div className="mb-2 flex items-start gap-2.5">
      <div
        className={cn(
          "flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-[10px]",
          "bg-[#5052FF]  from-brand-500 to-purple-500 shadow-brand-sm",
          "text-[13px] font-semibold text-white",
        )}
      >
        S
      </div>
      <div>
        <p className="text-[13px] font-semibold leading-tight text-text-primary">
          {job.title}
        </p>
        <p className="mt-0.5 text-[11px]  text-[#444444]">
          {job.company}
        </p>
      </div>
    </div>

    {/* Meta */}
    <div className="mb-1.5 flex flex-wrap items-center gap-2.5">
      <span className="flex items-center gap-1 text-[10px]  text-[#444444]">
        <StarIcon className="text-[10px] text-[#444444]" />
        {job.rating} Trusted
      </span>
      <span className="flex items-center gap-1 text-[10px] text-[#444444]">
        <MapPinIcon className="text-[10px]" />
        {job.location}
      </span>
      <span className="flex items-center gap-1 text-[10px] text-[#444444]">
        <BuildingIcon className="text-[10px]" />
        {job.workType}
      </span>
    </div>

    {/* Footer */}
    <div className="flex items-center justify-between">
      <span className="text-[10px] text-[#444444]">
        4.5 Trusted
      </span>
      <span className="text-[10px] text-text-muted">{job.postedAt}</span>
    </div>
  </div>
);

export const RecommendedJobs: React.FC<RecommendedJobsProps> = ({
  className,
}) => (
  <aside
    className={cn(
      "sticky top-17 rounded-4xl border border-surface-border bg-surface p-4",
      "shadow-card",
      className,
    )}
  >
    {/* Header */}
    <div className="mb-1 flex items-center justify-between">
      <h2 className="text-sm font-semibold text-text-primary">
        Recommended Jobs
      </h2>
      <button
        aria-label="More options"
        className="text-text-placeholder transition-colors hover:text-text-muted"
      >
        <DotsHorizontalIcon className="text-base" />
      </button>
    </div>
    <p className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-text-muted">
      Today
    </p>

    {/* Jobs */}
    <div>
      {RECOMMENDED_JOBS.map((job, i) => (
        <JobItem
          key={job.id}
          job={job}
          isLast={i === RECOMMENDED_JOBS.length - 1}
        />
      ))}
    </div>

    {/* CTA */}
    <button
      className={cn(
        "mt-3 flex w-full items-center justify-center gap-1.5",
        "border-t border-surface-border pt-3",
        "text-[13px] font-semibold text-text-secondary",
        "transition-colors hover:text-brand-500",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
      )}
    >
      View all posts <ArrowRightIcon className="text-sm" />
    </button>
  </aside>
);