"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Avatar } from "../ui/avatar";
import {
  DotsHorizontalIcon, CommentIcon, ShareIcon,
  BookmarkIcon, PaperclipIcon, SmileIcon, ImageIcon, SendIcon,
} from "@/components/ui/Icons";
import type { Post, ReactionType } from "@/types/feed";
import Image from "next/image";

type PostCardProps = {
  post: Post;
  commentDraft: string;
  onToggleReaction: (postId: string, type: ReactionType) => void;
  onCommentChange: (postId: string, value: string) => void;
  onCommentSubmit: (postId: string) => void;
  className?: string;
};

// ─── Reaction Button ──────────────────────────────────────────────────────────

const ReactionBtn: React.FC<{
  emoji: string;
  count: number;
  active: boolean;
  onClick: () => void;
}> = ({ emoji, count, active, onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center gap-1 text-[13px] font-bold transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded",
      active ? "text-brand-500" : "text-text-muted hover:text-text-secondary",
    )}
    aria-pressed={active}
  >
    {emoji} {count}
  </button>
);

// ─── Post Image Placeholder ───────────────────────────────────────────────────

const PostImagePlaceholder: React.FC = () => (
  <div
    className={cn(
      "mb-3 flex h-48 items-center justify-center overflow-hidden rounded-[14px]",
      "bg-[#5052FF]  from-slate-700 to-slate-900",
    )}
    aria-hidden="true"
  >
    <div className="text-center text-slate-600">
      <div className="mb-1 text-5xl">🏢</div>
      <p className="text-xs font-semibold">Business meeting</p>
    </div>
  </div>
);

// ─── Comment Input ────────────────────────────────────────────────────────────

const CommentInput: React.FC<{
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
}> = ({ value, onChange, onSubmit }) => {
  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div
      className={cn(
        "mt-3 flex items-center gap-2 rounded-2xl border border-surface-border",
        "bg-surface-tertiary px-3.5 py-2.5",
      )}
    >
      
      <Avatar size="sm">M</Avatar>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKey}
        placeholder="Write your comment..."
        className={cn(
          "flex-1 bg-transparent text-[12px] font-medium",
          "text-text-secondary placeholder:text-text-muted",
          "focus:outline-none",
        )}
        aria-label="Write a comment"
      />
      <div className="flex items-center gap-2 text-text-placeholder">
        <button aria-label="Attach file" className="hover:text-text-muted transition-colors">
          <PaperclipIcon className="text-sm" />
        </button>
        <button aria-label="Add emoji" className="hover:text-text-muted transition-colors">
          <SmileIcon className="text-sm" />
        </button>
        <button aria-label="Attach image" className="hover:text-text-muted transition-colors">
          <ImageIcon className="text-sm" />
        </button>
        {value.trim() && (
          <button
            onClick={onSubmit}
            aria-label="Send comment"
            className="text-brand-500 hover:text-brand-600 transition-colors"
          >
            <SendIcon className="text-sm" />
          </button>
        )}
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

export const PostCard: React.FC<PostCardProps> = ({
  post,
  commentDraft,
  onToggleReaction,
  onCommentChange,
  onCommentSubmit,
  className,
}) => (
  <article
    className={cn(
      "rounded-4xl border border-surface-border bg-surface p-5",
      "shadow-card transition-all duration-200 hover:shadow-card-hover",
      "animate-fade-up",
      className,
    )}
  >
    {/* Author */}
    <div className="mb-3 flex items-start justify-between">
      <div className="flex items-center gap-3">
        <Avatar
          size="lg"
          className="flex items-center justify-center bg-[#5052FF] text-white"
        >
          {post.author.avatar}
        </Avatar>
        <div>
          <p className="text-[14px] font-semibold text-text-primary">{post.author.name}</p>
          <p className="text-[10px]  text-[#444444]">{post.publishedAt}</p>
        </div>
      </div>
      <button
        aria-label="Post options"
        className="text-text-placeholder transition-colors hover:text-text-muted"
      >
        <DotsHorizontalIcon className="text-base" />
      </button>
    </div>

    {/* Content */}
    <p
      className="mb-3 text-[13px] leading-[1.7] text-text-secondary"
      dangerouslySetInnerHTML={{ __html: post.content }}
    />

    {/* Image */}
    {post.imageUrl && (
      <div className="mt-3 flex items-center justify-center">
        <Image src='/feed.png' alt="Post image" width={600} height={600} className="rounded-xl items-center" />
      </div>
    )}

    {/* Reactions Row */}
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-2",
        "border-t border-surface-border pt-3",
      )}
    >
      {/* Emoji reactions */}
      <div className="flex items-center gap-3">
        {post.reactions.map((r) => (
          <ReactionBtn
            key={r.type}
            emoji={r.emoji}
            count={r.count}
            active={post.userReacted[r.type]}
            onClick={() => onToggleReaction(post.id, r.type)}
          />
        ))}
      </div>

      {/* Meta actions */}
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-1 text-[11px] font-semibold text-text-muted hover:text-text-secondary transition-colors">
          <CommentIcon className="text-sm" />
          <span className="hidden sm:inline">{post.commentCount}</span>
          <span className="sm:hidden">{post.commentCount}</span>
        </button>
        <button className="flex items-center gap-1 text-[11px] font-semibold text-text-muted hover:text-text-secondary transition-colors">
          <ShareIcon className="text-sm" />
          <span className="hidden sm:inline">{post.shareCount} Shares</span>
          <span className="sm:hidden">{post.shareCount}</span>
        </button>
        <button className="flex items-center gap-1 text-[11px] font-semibold text-text-muted hover:text-text-secondary transition-colors">
          <BookmarkIcon className="text-sm" />
          <span className="hidden sm:inline">{post.savedCount} Saved</span>
          <span className="sm:hidden">{post.savedCount}</span>
        </button>
      </div>
    </div>

    {/* Comment Input */}
    <CommentInput
      value={commentDraft}
      onChange={(v) => onCommentChange(post.id, v)}
      onSubmit={() => onCommentSubmit(post.id)}
    />

    {/* Submitted comments */}
    {post.comments.length > 0 && (
      <div className="mt-3 space-y-2 pl-2 border-l-2 border-surface-border">
        {post.comments.map((c) => (
          <div key={c.id} className="flex gap-2">
            <Avatar
              size="sm"
            >
              {c.author.name}
            </Avatar>
            <div className="rounded-xl bg-surface-secondary px-3 py-2 text-[12px]">
              <span className="font-bold text-text-primary mr-1">{c.author.name}</span>
              <span className="text-text-secondary">{c.content}</span>
            </div>
          </div>
        ))}
      </div>
    )}
  </article>
);