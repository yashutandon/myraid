"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Avatar } from "../ui/avatar";
import { SendIcon } from "@/components/ui/Icons";
import type { CourseCard } from "@/types/feed";
import { SUGGESTED_COURSES } from "@/data/feed";
import Image from "next/image";

// ─── Create Post Card ─────────────────────────────────────────────────────────

type CreatePostCardProps = {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  className?: string;
};

export const CreatePostCard: React.FC<CreatePostCardProps> = ({
  value,
  onChange,
  onSubmit,
  className,
}) => {
  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && value.trim()) onSubmit();
  };

  return (
    <div
      className={cn(
        "rounded-4xl border border-surface-border bg-surface p-4.5",
        "shadow-card animate-fade-up",
        className,
      )}
    >
      <p className="mb-3 text-[14px] font-semibold text-text-primary">
        Create a Post
      </p>
      <div className="flex items-center gap-2.5">
        <Avatar size="default" className="flex items-center justify-center bg-[#5052FF] text-white">M</Avatar>
        <div
          className={cn(
            "flex flex-1 items-center justify-between rounded-2xl",
            "border border-surface-border bg-surface-tertiary px-4 py-2.5",
          )}
        >
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKey}
            placeholder="What's on your mind?"
            className={cn(
              "flex-1 bg-transparent text-[13px] font-medium",
              "text-text-secondary placeholder:text-text-muted",
              "focus:outline-none",
            )}
            aria-label="Create a post"
          />
          <button
            onClick={onSubmit}
            disabled={!value.trim()}
            aria-label="Publish post"
            className={cn(
              "ml-2 transition-colors",
              value.trim()
                ? "text-brand-500 hover:text-brand-600"
                : "text-text-placeholder cursor-not-allowed",
            )}
          >
            <SendIcon className="text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Hire CTA Card ────────────────────────────────────────────────────────────

const HireCtaCard: React.FC = () => (
  <div
    className={cn(
      "rounded-4xl border border-surface-border bg-surface p-4",
      "shadow-card animate-fade-up",
    )}
  >
    <h3 className="mb-1 text-[14px] font-semibold text-text-primary">
      Hire faster with SyncUp!
    </h3>
    <p className="mb-3 text-[11px]  text-[#444444]">
      Network without limits and hire like a pro!
    </p>

    {/* Banner */}
    <div
      className={cn(
        "relative mb-3 flex h-36 items-center justify-center overflow-hidden rounded-[14px]"
      )}
    >
      <div
        className={cn(
          "absolute right-2 top-2 rounded-xl bg-white px-2 py-0.5",
          "text-[10px] font-semibold text-amber-500 shadow",
        )}
      >
        30% OFF
      </div>
      <Image src="/Image.png" alt="Hire CTA Banner" width={300} height={154} />
    </div>

    <button
      className={cn(
        "w-full rounded-[10px] bg-[#5052FF] from-brand-500 to-purple-500",
        "py-2.5 text-[12px] font-bold text-white shadow-brand",
        "hover:opacity-90 transition-opacity",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
      )}
    >
      Get Started →
    </button>
  </div>
);

// ─── Course Card ──────────────────────────────────────────────────────────────

const CourseItem: React.FC<{ course: CourseCard }> = ({ course }) => (
  <div className="mt-4">
    {/* Thumbnail */}
    <div
      className={cn(
        "mb-3 flex h-36 items-center justify-center overflow-hidden rounded-[14px]",
      )}
      aria-hidden="true"
    >
       <Image src="/Image.png" alt="Hire CTA Banner" width={300} height={154} />
    </div>

    <p className="text-[14px] font-semibold text-text-primary">{course.title}</p>
    <div className="mt-1 flex items-center justify-between">
      <p className="text-[11px] font-medium text-text-muted">{course.instructor}</p>
      <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-500">
        ⭐ {course.rating}
      </div>
    </div>
  </div>
);

// ─── Suggestions Sidebar ──────────────────────────────────────────────────────

type SuggestionsSidebarProps = {
  className?: string;
};

export const SuggestionsSidebar: React.FC<SuggestionsSidebarProps> = ({
  className,
}) => (
  <div className={cn("flex flex-col gap-4", className)}>
    <HireCtaCard />

    {/* Suggestions */}
    <div
      className={cn(
        "rounded-4xl border border-surface-border bg-surface p-4",
        "shadow-card animate-fade-up",
      )}
      style={{ animationDelay: "80ms" }}
    >
      <h3 className="mb-1 text-[16px] font-semibold text-[#5052FF]">
        Suggestions
      </h3>
      <p className="mb-0 text-[11px] leading-relaxed text-[#444444]">
       Below courses are suggested based on your current skills & curated to help you stay updated with the current market trends.
      </p>

      {SUGGESTED_COURSES.map((c) => (
        <CourseItem key={c.id} course={c} />
      ))}
    </div>
  </div>
);