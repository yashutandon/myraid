"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { PostCard} from "@/components/feed/PostCard";
import { CreatePostCard } from "@/components/feed/FeedRightPanel";
import { SuggestionsSidebar } from "@/components/feed/FeedRightPanel";
import {
  ProfileCard,
  AnalyticsWidget,
  SocialStories,
} from "@/components/feed/FeedLeftPanel";
import { useFeedState } from "@/hooks/useFeedState";
import { CURRENT_USER } from "@/data/feed";

export default function FeedPage() {
  const {
    posts,
    stories,
    commentDrafts,
    newPostDraft,
    toggleReaction,
    setCommentDraft,
    submitComment,
    toggleFollow,
    setNewPostDraft,
    submitNewPost,
  } = useFeedState();

  return (
    <div className="flex gap-4 xl:gap-5">
      {/* ─── Left Panel (Profile + Analytics + Stories) ───────────────── */}
      <aside className="hidden w-62 shrink-0 flex-col gap-4 lg:flex">
        <ProfileCard profile={CURRENT_USER} />
        <AnalyticsWidget data={CURRENT_USER.analyticsData} />
        <SocialStories stories={stories} onToggleFollow={toggleFollow} />
      </aside>

      {/* ─── Center Feed ─────────────────────────────────────────────────── */}
      <div className="min-w-0 flex-1 space-y-4">
        {/* Create Post */}
        <CreatePostCard
          value={newPostDraft}
          onChange={setNewPostDraft}
          onSubmit={submitNewPost}
        />

        {/* Posts */}
        {posts.map((post, i) => (
          <PostCard
            key={post.id}
            post={post}
            commentDraft={commentDrafts[post.id] ?? ""}
            onToggleReaction={toggleReaction}
            onCommentChange={setCommentDraft}
            onCommentSubmit={submitComment}
            className={cn(i === 1 && "[animation-delay:100ms]", i === 2 && "[animation-delay:200ms]")}
          />
        ))}

        {/* Empty state */}
        {posts.length === 0 && (
          <div
            className={cn(
              "rounded-4xl border border-surface-border bg-surface p-10",
              "text-center shadow-card",
            )}
          >
            <p className="text-[32px]">📭</p>
            <p className="mt-2 text-[14px] font-bold text-text-muted">
              No posts yet. Be the first to share something!
            </p>
          </div>
        )}
      </div>

      {/* ─── Right Panel (Hire CTA + Suggestions) ────────────────────────── */}
      <aside className="hidden w-60 shrink-0 xl:block">
        <SuggestionsSidebar />
      </aside>
    </div>
  );
}