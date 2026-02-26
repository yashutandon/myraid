"use client";

import React, { useState,  useCallback } from "react";
import { cn } from "@/lib/utils";
import { SearchIcon, BellIcon, MessageSquareIcon, ChevronDownIcon, MenuIcon } from "@/components/ui/Icons";
import { Avatar } from "../ui/avatar"; 
import { debounce } from "@/lib/utils";
import Image from "next/image";

type TopbarProps = {
  onMenuClick: () => void;
  onSearch?: (query: string) => void;
  leftOffset?: number;
  className?: string;
};

/**
 * Fixed top navigation bar.
 * Emits onSearch for parent to use if needed (e.g. feed search, job search).
 */
export const Topbar: React.FC<TopbarProps> = ({
  onMenuClick,
  onSearch,
  leftOffset = 0,
  className,
}) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((q: unknown) => onSearch?.(q as string), 300),
    [onSearch],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <header
      className={cn(
        "fixed right-0 top-0 z-40 flex h-14 items-center gap-3 px-5",
        "border-b border-surface-border bg-surface/95 backdrop-blur-sm",
        "transition-[left] duration-250",
        className,
      )}
      style={{ left: leftOffset }}
    >
      {/* Mobile hamburger */}
      <button
        onClick={onMenuClick}
        aria-label="Open navigation menu"
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px]",
          "bg-surface-secondary text-text-secondary",
          "transition-colors hover:bg-surface-border md:hidden",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
        )}
      >
        <MenuIcon className="text-[20px]" />
      </button>

      {/* Mobile logo */}
      <Image src="/favicon.png" alt="SyncUp Logo" width={22} height={22} className="md:hidden" />

      {/* Search */}
      <div className="relative mx-auto w-full max-w-md">
        <div
          className={cn(
            "pointer-events-none absolute inset-y-0 left-3 flex items-center",
            isFocused ? "text-brand-500" : "text-text-muted",
            "transition-colors duration-150",
          )}
        >
          <SearchIcon className="text-base" />
        </div>
        <input
          type="search"
          value={query}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search jobs, companies, people..."
          className={cn(
            "h-9 w-full rounded-xl border bg-surface-secondary pl-9 pr-4",
            "text-[13px] font-medium text-text-secondary placeholder:text-text-muted",
            "transition-all duration-150",
            "focus:outline-none focus:ring-2 focus:ring-brand-500",
            isFocused
              ? "border-brand-200 bg-white"
              : "border-surface-border-strong hover:border-surface-border-strong",
          )}
        />
      </div>

      {/* Right actions */}
      <div className="ml-auto flex shrink-0 items-center gap-2">
        {/* Messages */}
        <NotifButton label="Messages" icon={<MessageSquareIcon className="text-base" />} dotColor="bg-emerald-400" />
        {/* Notifications */}
        <NotifButton label="Notifications" icon={<BellIcon className="text-base" />} dotColor="bg-red-400" />
        {/* Avatar */}
        <button
          className={cn(
            "flex items-center gap-1.5 rounded-xl p-1",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
          )}
          aria-label="User menu"
        >
          <Avatar size="sm">J</Avatar>
          <ChevronDownIcon className="text-[12px] text-text-muted" />
        </button>
      </div>
    </header>
  );
};

// ─── Notification Button ──────────────────────────────────────────────────────

const NotifButton: React.FC<{
  label: string;
  icon: React.ReactNode;
  dotColor: string;
}> = ({ label, icon, dotColor }) => (
  <button
    aria-label={label}
    className={cn(
      "relative flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px]",
      "bg-surface-secondary text-text-secondary",
      "transition-colors hover:bg-surface-border",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
    )}
  >
    {icon}
    <span
      className={cn(
        "absolute right-1.75 top-1.75 h-1.75 w-1.75 rounded-full border border-white",
        dotColor,
      )}
      aria-hidden="true"
    />
  </button>
);