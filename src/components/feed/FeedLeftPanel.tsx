"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Avatar } from "../ui/avatar";
import { AreaChart, Area, XAxis, ResponsiveContainer } from "recharts";
import type { UserProfile, SocialStory } from "@/types/feed";

// ─── Profile Card ─────────────────────────────────────────────────────────────

type ProfileCardProps = {
  profile: UserProfile;
  className?: string;
};

export const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  className,
}) => (
  <div
    className={cn(
      "rounded-4xl border border-surface-border bg-surface p-5 text-center",
      "shadow-card animate-fade-up",
      className,
    )}
  >
    <div className="mb-3 flex  justify-center">
      <Avatar
        size="lg"
        className=" flex items-center justify-center bg-[#5052FF] text-white shadow-xl "
      >
        {profile.avatar}
      </Avatar>
    </div>

    <h3 className="text-base font-semibold text-[#5052FF]">{profile.name}</h3>
    <p className="mb-4 mt-1 text-[12px] font-medium text-text-muted">
      {profile.headline}
    </p>

    {/* Completion Bar */}
    <div className="mb-4">
      <div className="h-1.25 w-full overflow-hidden rounded-full bg-surface-secondary">
        <div
          className="mb-1.5 h-full rounded-full bg-emerald-400"
          style={{ width: `${profile.profileCompletionPercent}%` }}
        />
      </div>
      <div className="mt-2 flex items-center justify-between text-[11px]">
        <span className="font-semibold text-text-secondary">
          {profile.profileCompletionPercent}% Completed
        </span>
        <button className="font-bold text-[#5052FF] transition-colors ">
         ✏️ Update profile
        </button>
      </div>
      
    </div>

    {/* Actions */}
    <div className="flex gap-2">
      {["View Full Profile", "Share Profile"].map((label) => (
        <button
          key={label}
          className={cn(
            "flex-1 rounded-[10px] border border-surface-border-strong text-[#5052FF]",
            "bg-white py-2 text-[11px] text-[#5052FF] font-bold ",
            "transition-colors hover:bg-surface-secondary",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
          )}
        >
          {label}
        </button>
      ))}
    </div>
  </div>
);

// ─── Analytics Widget ─────────────────────────────────────────────────────────

type AnalyticsWidgetProps = {
  data: UserProfile["analyticsData"];
  className?: string;
};

export const AnalyticsWidget: React.FC<AnalyticsWidgetProps> = ({
  data,
  className,
}) => (
  <div
    className={cn(
      "rounded-4xl border border-surface-border bg-surface p-4",
      "shadow-card animate-fade-up overflow-hidden",
      className,
    )}
    style={{ animationDelay: "80ms" }}
  >
    <p className="mb-0.5 text-[13px] font-semibold text-text-primary">
      Analytics
    </p>
    <p className="mb-3 text-[11px] font-medium text-text-muted">
      Connections
    </p>

    <div className="relative h-25">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 5, left: -32, bottom: 0 }}>
          <defs>
            {[["ag1", "#6366f1"], ["ag2", "#10b981"]].map(([id, c]) => (
              <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={c} stopOpacity={0.2} />
                <stop offset="95%" stopColor={c} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <XAxis
            dataKey="label"
            tick={{ fontSize: 9, fill: "#94A3B8", fontWeight: 600 }}
            axisLine={false}
            tickLine={false}
          />
          <Area type="monotone" dataKey="connections" stroke="#6366f1" strokeWidth={2} fill="url(#ag1)" dot={false} />
          <Area type="monotone" dataKey="views" stroke="#10b981" strokeWidth={2} fill="url(#ag2)" dot={false} />
        </AreaChart>
      </ResponsiveContainer>

      {/* Locked overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={cn(
            "rounded-2xl bg-[#5052FF] from-brand-500 to-purple-500",
            "px-3 py-1.5 text-[11px] font-bold text-white shadow-brand",
          )}
        >
          🔒 Analytics
        </div>
      </div>
    </div>
  </div>
);

// ─── Social Stories ───────────────────────────────────────────────────────────

type SocialStoriesProps = {
  stories: SocialStory[];
  onToggleFollow: (storyId: string) => void;
  className?: string;
};

export const SocialStories: React.FC<SocialStoriesProps> = ({
  stories,
  onToggleFollow,
  className,
}) => (
  <div
    className={cn(
      "rounded-4xl border border-surface-border bg-surface p-4",
      "shadow-card animate-fade-up",
      className,
    )}
    style={{ animationDelay: "160ms" }}
  >
    {/* Header */}
    <div className="mb-4 flex items-center justify-between">
      <p className="text-[13px] font-semibold text-text-primary">
        Sosmed Stories
      </p>
      <button
        aria-label="More options"
        className="text-text-placeholder hover:text-text-muted transition-colors"
      >
        •••
      </button>
    </div>

    {/* Stories */}
    <div className="flex flex-col gap-4">
      {stories.map((story) => (
        <div key={story.id}>
          {/* Person info */}
          <div className="mb-2 flex items-center gap-2.5">
            <Avatar
              size="default"
               className=" flex items-center justify-center bg-[#5052FF] text-white shadow-xl "
            >
              {story.name[0]}
            </Avatar>
            <div>
              <p className="text-[12px]  font-semibold text-text-primary leading-tight">
                {story.name}
              </p>
              <p className="text-[10px]  text-[#444444] leading-tight mt-3">
                {story.role}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={() => onToggleFollow(story.id)}
              className={cn(
                "flex-1 rounded-[10px] py-1.5 text-[11px] font-bold",
                "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                story.isFollowing
                  ? "bg-[#EAF0FB] text-[#5052FF] "
                  : "bg-[#EAF0FB] text-[#5052FF] ",
              )}
            >
              {story.isFollowing ? "✓ Following" : "+ Follow"}
            </button>
            <button
              className={cn(
                "flex-1 rounded-[10px] border border-surface-border-strong",
                "bg-[#EAF0FB] py-1.5 text-[11px] font-bold text-text-secondary",
                "transition-colors hover:bg-surface-secondary",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
              )}
            >
              💬 Message
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);