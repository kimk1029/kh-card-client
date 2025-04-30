// types.d.ts
export {};
import NextAuth from "next-auth";
declare global {
  interface Window {
    YT: typeof YT;
    onYouTubeIframeAPIReady: () => void;
  }

  namespace YT {
    class Player {
      constructor(id: string, options: PlayerOptions);
      playVideo(): void;
      stopVideo(): void;
    }

    interface PlayerOptions {
      height: string;
      width: string;
      videoId: string;
      playerVars: PlayerVars;
      events: {
        onReady: (event: { target: Player }) => void;
      };
    }

    interface PlayerVars {
      autoplay: number;
      controls: number;
      modestbranding: number;
      loop: number;
      playlist: string;
      fs: number;
      cc_load_policy: number;
      iv_load_policy: number;
      autohide: number;
      disablekb: number;
      enablejsapi: number;
      origin: string;
    }
  }
}
export type Topic = 
  | 'technology'
  | 'science'
  | 'health'
  | 'business'
  | 'entertainment';
  interface Author {
    id: number;
    username: string;
  }
  
  export interface Post {
    id: number;
    title: string;
    content: string;
    created_at: string;
    author?: Author;
    anonymousId?: string;
    views: number;
    commentCount: number;
    likeCount: number;
    liked: boolean;
  }
  
  export interface PostContentProps {
    post: Post;
    isAnonymous?: boolean;
    backUrl: string;
  }
export interface Comment {
  parent: {
    id: number;
  } | null;
  parentId?: number; // 대댓글 작성 시 부모 댓글의 ID
  id: number;
  content: string;
  created_at: string;
  author: {
    id: number;
    username: string;
  };
  replies: Comment[];
}
declare module "next-auth" {
  interface Session {
    needsSignUp?: boolean;
    googleData?: {
      email: string;
      name: string;
      image?: string;
    };
    accessToken?: string;
  }

  interface User {
    id: string;
    username: string;
    email: string;
    accessToken?: string;
  }
}
