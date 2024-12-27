"use client";
import React, { useEffect } from "react";

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
  }
}

const YouTubeBackground = ({ videoId }: { videoId: string }) => {
  useEffect(() => {
    // YouTube IFrame API 스크립트를 동적으로 추가하는 함수
    const loadYouTubeScript = () => {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];

      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        document.head.appendChild(tag); // firstScriptTag가 없거나 부모 노드가 없는 경우 head에 직접 추가
      }
    };

    if (!window.YT) {
      // YT가 이미 로드되었는지 확인
      loadYouTubeScript();
    }

    // YouTube IFrame Player 초기화
    window.onYouTubeIframeAPIReady = () => {
      new window.YT.Player("player", {
        height: "100%",
        width: "100%",
        videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          loop: 1,
          playlist: videoId,
          fs: 0,
          cc_load_policy: 0,
          iv_load_policy: 3,
          autohide: 1,
          modestbranding: 1, // YouTube 로고 최소화
          enablejsapi: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: (event: any) => event.target.playVideo(),
        },
      });
    };
  }, [videoId]);

  return (
    <div
      id="player"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity: 0.7,
        zIndex: -1,
      }}
    />
  );
};

export default YouTubeBackground;
