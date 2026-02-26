// ─── Feed Types ───────────────────────────────────────────────────────────────

export type ReactionType = "like" | "love" | "celebrate";

export type Reaction = {
  type: ReactionType;
  emoji: string;
  count: number;
};

export type PostAuthor = {
  id: string;
  name: string;
  avatar: string;
  avatarGradient: string;
  headline?: string;
};

export type Post = {
  id: string;
  author: PostAuthor;
  publishedAt: string;
  content: string;
  imageUrl?: string | null;
  reactions: Reaction[];
  commentCount: number;
  shareCount: number;
  savedCount: number;
  userReacted: Record<ReactionType, boolean>;
  comments: PostComment[];
};

export type PostComment = {
  id: string;
  author: PostAuthor;
  content: string;
  publishedAt: string;
};

// ─── Profile ──────────────────────────────────────────────────────────────────

export type UserProfile = {
  id: string;
  name: string;
  headline: string;
  avatar: string;
  avatarGradient: string;
  profileCompletionPercent: number;
  analyticsData: AnalyticsDataPoint[];
};

export type AnalyticsDataPoint = {
  label: string;
  connections: number;
  views: number;
};

// ─── Social ───────────────────────────────────────────────────────────────────

export type SocialStory = {
  id: string;
  name: string;
  role: string;
  gradient: string;
  isFollowing: boolean;
};

// ─── Suggestions ─────────────────────────────────────────────────────────────

export type CourseCard = {
  id: string;
  title: string;
  instructor: string;
  rating: number;
  thumbnail?: string;
};

// ─── Feed State ───────────────────────────────────────────────────────────────

export type FeedState = {
  posts: Post[];
  stories: SocialStory[];
  commentDrafts: Record<string, string>;
};