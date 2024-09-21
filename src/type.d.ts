// types.d.ts
export {};

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
