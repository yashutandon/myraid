"use client";

import React, { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_EXPANDED_WIDTH, TOPBAR_HEIGHT } from "@/constants/navigation";

type AppShellProps = {
  children: React.ReactNode;
};

/**
 * Top-level layout shell that orchestrates:
 * - Desktop: persistent collapsible sidebar
 * - Mobile: drawer overlay with backdrop
 * - Topbar with correct left offset based on sidebar state
 *
 * Children receive proper padding-left and padding-top.
 */
export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const [isMd, setIsMd] = useState(() => 
    typeof window !== "undefined" ? window.innerWidth >= 768 : false
  );
  const [desktopExpanded, setDesktopExpanded] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Sync breakpoint
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      const md = window.innerWidth >= 768;
      setIsMd(md);
      if (md) setMobileOpen(false); // close drawer on resize to desktop
    });
    observer.observe(document.documentElement);
    return () => observer.disconnect();
  }, []);

  const sidebarWidth = isMd
    ? desktopExpanded
      ? SIDEBAR_EXPANDED_WIDTH
      : SIDEBAR_COLLAPSED_WIDTH
    : 0;

  const handleMenuClick = useCallback(() => {
    if (isMd) {
      setDesktopExpanded((v) => !v);
    } else {
      setMobileOpen((v) => !v);
    }
  }, [isMd]);

  const handleCloseMobileDrawer = useCallback(() => {
    setMobileOpen(false);
  }, []);

  return (
    <div className="relative min-h-screen bg-surface-secondary font-sans">
      {/* ─── Desktop Sidebar ───────────────────────────────────────────────── */}
      {isMd && (
        <div
          className="fixed left-0 top-0 z-50 h-full"
          style={{ width: sidebarWidth }}
        >
          <Sidebar
            expanded={desktopExpanded}
            onToggleExpand={() => setDesktopExpanded((v) => !v)}
          />
        </div>
      )}

      {/* ─── Mobile Drawer Overlay ─────────────────────────────────────────── */}
      {!isMd && mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={handleCloseMobileDrawer}
            aria-hidden="true"
          />
          {/* Drawer */}
          <div
            className={cn(
              "fixed left-0 top-0 z-50 h-full shadow-xl",
              "animate-slide-in",
            )}
            style={{ width: SIDEBAR_EXPANDED_WIDTH }}
          >
            <Sidebar
              expanded={true}
              onToggleExpand={handleCloseMobileDrawer}
              onClose={handleCloseMobileDrawer}
              isMobileDrawer
            />
          </div>
        </>
      )}

      {/* ─── Topbar ────────────────────────────────────────────────────────── */}
      <Topbar
        onMenuClick={handleMenuClick}
        leftOffset={isMd ? sidebarWidth : 0}
      />

      {/* ─── Main Content ──────────────────────────────────────────────────── */}
      <main
        className="min-h-screen transition-[padding] duration-250"
        style={{
          paddingLeft: isMd ? sidebarWidth : 0,
          paddingTop: TOPBAR_HEIGHT,
        }}
      >
        <div className="mx-auto max-w-350 px-4 py-5 sm:px-5 md:px-6">
          {children}
        </div>
      </main>
    </div>
  );
};