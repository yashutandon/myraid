import type { Post, SocialStory, UserProfile, CourseCard } from "@/types/feed";

// ─── Current User Profile ─────────────────────────────────────────────────────

export const CURRENT_USER: UserProfile = {
  id: "u-001",
  name: "Minnie Armstrong",
  headline: "UI / UX Designer",
  avatar: "M",
  avatarGradient: "from-violet-400 to-pink-400",
  profileCompletionPercent: 75,
  analyticsData: [
    { label: "Sept", connections: 30, views: 20 },
    { label: "Oct", connections: 55, views: 40 },
    { label: "Nov", connections: 45, views: 65 },
  ],
};

// ─── Feed Posts ───────────────────────────────────────────────────────────────

export const INITIAL_POSTS: Post[] = [
  {
    id: "post-001",
    author: {
      id: "u-002",
      name: "Pan Feng Shui",
      avatar: "P",
      avatarGradient: "from-amber-400 to-orange-500",
      headline: "Product Designer @ ABC Co.",
    },
    publishedAt: "12 April at 09:28 PM",
    content:
      "Had an amazing interaction with the founder of <strong class=\"text-text-primary\">ABC Company</strong>, sharing my experience through this small article.",
    imageUrl: "/placeholder-meeting.jpg",
    reactions: [
      { type: "like", emoji: "👍", count: 3 },
      { type: "love", emoji: "😄", count: 8 },
      { type: "celebrate", emoji: "🎉", count: 1 },
    ],
    commentCount: 25,
    shareCount: 231,
    savedCount: 24,
    userReacted: { like: false, love: false, celebrate: false },
    comments: [],
  },
  {
    id: "post-002",
    author: {
      id: "u-003",
      name: "Clara Kim",
      avatar: "C",
      avatarGradient: "from-pink-400 to-rose-500",
      headline: "Fitness Coach & Wellness Writer",
    },
    publishedAt: "12 April at 09:28 PM",
    content:
      "A Great Way To Generate All The Motivation You Need To Get Fit. Sometimes all it takes is one simple change in perspective to unlock your full potential! 💪",
    imageUrl: null,
    reactions: [
      { type: "like", emoji: "👍", count: 3 },
      { type: "love", emoji: "😄", count: 8 },
      { type: "celebrate", emoji: "🎉", count: 1 },
    ],
    commentCount: 25,
    shareCount: 231,
    savedCount: 24,
    userReacted: { like: false, love: false, celebrate: false },
    comments: [],
  },
  {
    id: "post-003",
    author: {
      id: "u-004",
      name: "Raj Mehta",
      avatar: "R",
      avatarGradient: "from-green-400 to-teal-500",
      headline: "Senior Product Manager @ Series B Startup",
    },
    publishedAt: "11 April at 11:00 AM",
    content:
      "Just landed a new role as Senior Product Manager at a Series B startup! Grateful for everyone who helped me on this journey. Time to build something incredible. 🎉",
    imageUrl: null,
    reactions: [
      { type: "like", emoji: "👍", count: 47 },
      { type: "love", emoji: "😄", count: 22 },
      { type: "celebrate", emoji: "🎉", count: 15 },
    ],
    commentCount: 63,
    shareCount: 44,
    savedCount: 18,
    userReacted: { like: false, love: false, celebrate: false },
    comments: [],
  },
];

// ─── Social Stories ───────────────────────────────────────────────────────────

export const SOCIAL_STORIES: SocialStory[] = [
  {
    id: "s-001",
    name: "Rakesh Sharma",
    role: "Front-end Developer",
    gradient: "from-blue-400 to-indigo-500",
    isFollowing: false,
  },
  {
    id: "s-002",
    name: "Anita Gupta",
    role: "UI/UX Designer",
    gradient: "from-purple-400 to-pink-500",
    isFollowing: false,
  },
  {
    id: "s-003",
    name: "Mohit Singh",
    role: "Product Manager",
    gradient: "from-green-400 to-teal-500",
    isFollowing: false,
  },
];

// ─── Suggested Courses ────────────────────────────────────────────────────────

export const SUGGESTED_COURSES: CourseCard[] = [
  {
    id: "c-001",
    title: "Figma: Basics",
    instructor: "Tyler Hooks",
    rating: 4.2,
  },

]