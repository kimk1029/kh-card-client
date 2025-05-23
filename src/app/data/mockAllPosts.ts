import { Post } from "@/type";


const mockAllPosts: Post[] = [
  // Technology posts
  {
    id: 1,
    title: "The Future of AI in Healthcare",
    content: "Exploring how artificial intelligence is revolutionizing medical diagnoses and treatment plans.",
    created_at: "June 15, 2025",
    author: { id: 1, username: "Dr. Sarah Chen" },
    views: 102,
    likeCount: 432,
    commentCount: 58,
    liked: false,
  },
  {
    id: 6,
    title: "Quantum Computing Breakthroughs",
    content: "Recent advancements in quantum computing and what they mean for data processing capabilities.",
    created_at: "June 3, 2025",
    author: { id: 2, username: "Dr. Robert Klein" },
    views: 87,
    likeCount: 254,
    commentCount: 41,
    liked: false,
  },
  {
    id: 7,
    title: "New Programming Language Gaining Traction",
    content: "Developers are excited about this new language designed for efficiency.",
    created_at: "June 1, 2025",
    author: { id: 3, username: "Alex Johnson" },
    views: 34,
    likeCount: 24,
    commentCount: 7,
    liked: false,
  },

  // Science posts
  {
    id: 2,
    title: "Space Tourism: The Next Frontier",
    content: "Commercial space travel is becoming a reality. What does this mean for the future of tourism?",
    created_at: "June 12, 2025",
    author: { id: 4, username: "Mike Reynolds" },
    views: 98,
    likeCount: 385,
    commentCount: 43,
    liked: false,
  },
  {
    id: 8,
    title: "Breakthrough in Renewable Energy Storage",
    content: "Scientists have developed a new battery technology with remarkable capacity.",
    created_at: "June 10, 2025",
    author: { id: 5, username: "Dr. Elena Rodriguez" },
    views: 45,
    likeCount: 42,
    commentCount: 13,
    liked: false,
  },
  {
    id: 12,
    title: "Mars Rover Discovers New Evidence",
    content: "Latest findings from the Mars exploration mission suggest possibilities of ancient water.",
    created_at: "May 28, 2025",
    author: { id: 6, username: "Dr. James Wilson" },
    views: 76,
    likeCount: 210,
    commentCount: 45,
    liked: false,
  },

  // Health posts
  {
    id: 3,
    title: "Nutrition Myths Debunked",
    content: "Leading nutritionists address common misconceptions about diets and healthy eating.",
    created_at: "June 10, 2025",
    author: { id: 7, username: "Emma Watson" },
    views: 110,
    likeCount: 327,
    commentCount: 92,
    liked: false,
  },
  {
    id: 9,
    title: "Mental Health Awareness Campaign Launches",
    content: "Global initiative aims to reduce stigma around mental health issues.",
    created_at: "June 8, 2025",
    author: { id: 8, username: "Thomas Lee" },
    views: 52,
    likeCount: 67,
    commentCount: 22,
    liked: false,
  },
  {
    id: 13,
    title: "New Study on Sleep Patterns",
    content: "Research reveals important connections between sleep quality and cognitive function.",
    created_at: "May 25, 2025",
    author: { id: 9, username: "Dr. Lisa Zhang" },
    views: 69,
    likeCount: 182,
    commentCount: 34,
    liked: false,
  },

  // Business posts
  {
    id: 4,
    title: "The Rise of Sustainable Businesses",
    content: "How eco-friendly practices are reshaping corporate strategies and consumer preferences.",
    created_at: "June 8, 2025",
    author: { id: 10, username: "James Wilson" },
    views: 88,
    likeCount: 298,
    commentCount: 37,
    liked: false,
  },
  {
    id: 10,
    title: "Stock Market Responds to Economic Policy",
    content: "Investors react to the latest announcements from the Federal Reserve.",
    created_at: "June 5, 2025",
    author: { id: 11, username: "Michelle Park" },
    views: 41,
    likeCount: 31,
    commentCount: 15,
    liked: false,
  },
  {
    id: 14,
    title: "Startup Funding Reaches New Heights",
    content: "Venture capital investments hit record numbers in the tech sector.",
    created_at: "May 22, 2025",
    author: { id: 12, username: "Robert Chang" },
    views: 57,
    likeCount: 156,
    commentCount: 28,
    liked: false,
  },

  // Entertainment posts
  {
    id: 5,
    title: "Virtual Reality in Film Production",
    content: "Filmmakers are embracing VR technology to create immersive cinematic experiences.",
    created_at: "June 5, 2025",
    author: { id: 13, username: "Lisa Zhang" },
    views: 73,
    likeCount: 275,
    commentCount: 29,
    liked: false,
  },
  {
    id: 11,
    title: "Streaming Platform Announces New Original Series",
    content: "The highly anticipated show will premiere next month to global audiences.",
    created_at: "June 2, 2025",
    author: { id: 14, username: "Kevin Smith" },
    views: 36,
    likeCount: 58,
    commentCount: 27,
    liked: false,
  },
  {
    id: 15,
    title: "Music Festival Returns After Hiatus",
    content: "The popular annual event will feature an impressive lineup of international artists.",
    created_at: "May 20, 2025",
    author: { id: 15, username: "Emily Johnson" },
    views: 65,
    likeCount: 143,
    commentCount: 32,
    liked: false,
  },
];

export default mockAllPosts;
