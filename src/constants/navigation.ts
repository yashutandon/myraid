// All sidebar nav items defined in one place for easy maintenance.

export type NavItemId =
  | "feed"
  | "profile"
  | "dashboard"
  | "network"
  | "messages"
  | "analytics"
  | "settings";

export type NavItemConfig = {
  id: NavItemId;
  label: string;
  href: string;
  group: "main" | "bottom";
};

export const NAV_ITEMS: NavItemConfig[] = [
  { id: "feed",      label: "Feed",      href: "/feed",      group: "main" },
  { id: "profile",   label: "Profile",   href: "/profile",   group: "main" },
  { id: "dashboard", label: "Jobs",      href: "/dashboard", group: "main" },
  { id: "network",   label: "Network",   href: "/network",   group: "main" },
  { id: "messages",  label: "Messages",  href: "/messages",  group: "main" },
  { id: "analytics", label: "Analytics", href: "/analytics", group: "bottom" },
  { id: "settings",  label: "Settings",  href: "/settings",  group: "bottom" },
];

export const MAIN_NAV = NAV_ITEMS.filter((i) => i.group === "main");
export const BOTTOM_NAV = NAV_ITEMS.filter((i) => i.group === "bottom");

export const SIDEBAR_COLLAPSED_WIDTH = 56;
export const SIDEBAR_EXPANDED_WIDTH = 220;
export const TOPBAR_HEIGHT = 56;