"use client";

import { useState, useCallback } from "react";
import type { Post, SocialStory, ReactionType } from "@/types/feed";
import { INITIAL_POSTS, SOCIAL_STORIES } from "@/data/feed";

type UseFeedStateReturn = {
  posts: Post[];
  stories: SocialStory[];
  commentDrafts: Record<string, string>;
  newPostDraft: string;

  // Actions
  toggleReaction: (postId: string, type: ReactionType) => void;
  setCommentDraft: (postId: string, value: string) => void;
  submitComment: (postId: string) => void;
  toggleFollow: (storyId: string) => void;
  setNewPostDraft: (value: string) => void;
  submitNewPost: () => void;
};

/**
 * Manages all interactive state for the social feed:
 * reactions, comment drafts, follow toggles, new post creation.
 */
export function useFeedState(): UseFeedStateReturn {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [stories, setStories] = useState<SocialStory[]>(SOCIAL_STORIES);
  const [commentDrafts, setCommentDrafts] = useState<Record<string, string>>(
    {},
  );
  const [newPostDraft, setNewPostDraft] = useState<string>("");

  // ─── Reactions ─────────────────────────────────────────────────────────────

  const toggleReaction = useCallback(
    (postId: string, type: ReactionType) => {
      setPosts((prev) =>
        prev.map((post) => {
          if (post.id !== postId) return post;

          const wasReacted = post.userReacted[type];
          return {
            ...post,
            userReacted: { ...post.userReacted, [type]: !wasReacted },
            reactions: post.reactions.map((r) =>
              r.type === type
                ? { ...r, count: wasReacted ? r.count - 1 : r.count + 1 }
                : r,
            ),
          };
        }),
      );
    },
    [],
  );

  // ─── Comments ──────────────────────────────────────────────────────────────

  const setCommentDraft = useCallback(
    (postId: string, value: string) => {
      setCommentDrafts((prev) => ({ ...prev, [postId]: value }));
    },
    [],
  );

  const submitComment = useCallback(
    (postId: string) => {
      const content = commentDrafts[postId]?.trim();
      if (!content) return;

      setPosts((prev) =>
        prev.map((post) =>
          post.id !== postId
            ? post
            : {
                ...post,
                commentCount: post.commentCount + 1,
                comments: [
                  ...post.comments,
                  {
                    id: `c-${Date.now()}`,
                    author: {
                      id: "u-001",
                      name: "Minnie Armstrong",
                      avatar: "M",
                      avatarGradient: "from-violet-400 to-pink-400",
                    },
                    content,
                    publishedAt: "Just now",
                  },
                ],
              },
        ),
      );
      setCommentDrafts((prev) => ({ ...prev, [postId]: "" }));
    },
    [commentDrafts],
  );

  // ─── Follow ────────────────────────────────────────────────────────────────

  const toggleFollow = useCallback((storyId: string) => {
    setStories((prev) =>
      prev.map((s) =>
        s.id === storyId ? { ...s, isFollowing: !s.isFollowing } : s,
      ),
    );
  }, []);

  // ─── New Post ──────────────────────────────────────────────────────────────

  const submitNewPost = useCallback(() => {
    const content = newPostDraft.trim();
    if (!content) return;

    const newPost: Post = {
      id: `post-${Date.now()}`,
      author: {
        id: "u-001",
        name: "Minnie Armstrong",
        avatar: "M",
        avatarGradient: "from-violet-400 to-pink-400",
        headline: "UI / UX Designer",
      },
      publishedAt: "Just now",
      content,
      imageUrl: null,
      reactions: [
        { type: "like", emoji: "👍", count: 0 },
        { type: "love", emoji: "😄", count: 0 },
        { type: "celebrate", emoji: "🎉", count: 0 },
      ],
      commentCount: 0,
      shareCount: 0,
      savedCount: 0,
      userReacted: { like: false, love: false, celebrate: false },
      comments: [],
    };

    setPosts((prev) => [newPost, ...prev]);
    setNewPostDraft("");
  }, [newPostDraft]);

  return {
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
  };
}