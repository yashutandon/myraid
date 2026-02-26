"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MAIN_NAV, BOTTOM_NAV } from "@/constants/navigation";
import {
  HomeIcon,
  UserIcon,
  BriefcaseIcon,
  PeopleIcon,
  MessageSquareIcon,
  BarChartIcon,
  SettingsIcon,
  LayoutIcon,
} from "@/components/ui/Icons";
import type { NavItemId } from "@/constants/navigation";
import Image from "next/image";

// ─── Icon Map ─────────────────────────────────────────────────

const NAV_ICONS: Record<
  NavItemId,
  React.FC<{ className?: string }>
> = {
  feed: HomeIcon,
  profile: UserIcon,
  dashboard: BriefcaseIcon,
  network: PeopleIcon,
  messages: MessageSquareIcon,
  analytics: BarChartIcon,
  settings: SettingsIcon,
};

// ─── Safe Active Matcher ─────────────────────────────────────

function isRouteActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

// ─── Nav Button ──────────────────────────────────────────────

const NavButton: React.FC<{
  id: NavItemId;
  label: string;
  href: string;
  isActive: boolean;
  expanded: boolean;
  onClick?: () => void;
}> = ({ id, label, href, isActive, expanded, onClick }) => {
  const Icon = NAV_ICONS[id];

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "group relative flex h-10 w-full items-center gap-3 ",
        "px-2 text-[13px] font-semibold transition-all duration-200",
        isActive
          ? "bg-[#5052FF]/10 text-[#5052FF] w-full "
          : "text-text-muted hover:bg-surface-secondary hover:text-text-secondary"
      )}
    >
      {/* Blue Left Indicator */}
      {isActive && (
        <span className="absolute -left-0.5 top-1/2 h-10 w-[2.75] -translate-y-1/2  bg-[#5052FF]" />
      )}

      <Icon
        className={cn(
          "shrink-0 text-[18px]",
          isActive && "text-[#5052FF]"
        )}
      />

      <span
        className={cn(
          "whitespace-nowrap transition-all duration-200",
          expanded
            ? "opacity-100 w-auto"
            : "opacity-0 w-0 overflow-hidden"
        )}
      >
        {label}
      </span>

      {/* Tooltip when collapsed */}
      {!expanded && (
        <span
          className={cn(
            "pointer-events-none absolute left-[calc(100%+10px)] z-50 rounded-md",
            "bg-black px-2 py-1 text-[11px] font-semibold text-white whitespace-nowrap",
            "opacity-0 transition-opacity group-hover:opacity-100"
          )}
        >
          {label}
        </span>
      )}
    </Link>
  );
};

// ─── Sidebar ─────────────────────────────────────────────────

type SidebarProps = {
  expanded: boolean;
  onToggleExpand: () => void;
  onClose?: () => void;
  isMobileDrawer?: boolean;
};

export const Sidebar: React.FC<SidebarProps> = ({
  expanded,
  onToggleExpand,
  onClose,
  isMobileDrawer = false,
}) => {
  const pathname = usePathname();
  const width = expanded ? 220 : 60;

  return (
    <aside
      className={cn(
        "flex h-full flex-col bg-white border-r border-surface-border transition-[width] duration-300",
        isMobileDrawer && "shadow-xl"
      )}
      style={{ width, minWidth: width }}
    >
      {/* Logo */}
      <div className="mt-4 mb-4 flex w-full items-center px-3">
        <Image src="/favicon.png" alt="Logo" width={28} height={28} />
        <span
          className={cn(
            "ml-3 text-[15px] font-semibold text-text-primary transition-all duration-200",
            expanded
              ? "opacity-100 w-auto"
              : "opacity-0 w-0 overflow-hidden"
          )}
        >
          SyncUp
        </span>
      </div>

      {/* Toggle Button */}
      <div className="mb-2 flex w-full px-3">
        <button
          onClick={isMobileDrawer ? onClose : onToggleExpand}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-[10px]",
            "text-text-muted hover:bg-surface-secondary hover:text-text-secondary",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          )}
        >
          <LayoutIcon className="text-[18px]" />
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="flex w-full flex-1 flex-col gap-1 px-3">
        {MAIN_NAV.map((item) => (
          <NavButton
            key={item.id}
            id={item.id}
            label={item.label}
            href={item.href}
            isActive={isRouteActive(pathname, item.href)}
            expanded={expanded}
            onClick={isMobileDrawer ? onClose : undefined}
          />
        ))}
      </nav>

      {/* Bottom Navigation */}
      <div className="flex w-full flex-col gap-1 px-3 pb-4">
        {BOTTOM_NAV.map((item) => (
          <NavButton
            key={item.id}
            id={item.id}
            label={item.label}
            href={item.href}
            isActive={isRouteActive(pathname, item.href)}
            expanded={expanded}
            onClick={isMobileDrawer ? onClose : undefined}
          />
        ))}
      </div>
    </aside>
  );
};