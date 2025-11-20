// components/VideoPlayer.tsx
"use client";

import React from "react";
import { isYouTubeUrl, getYouTubeId } from "@/utils/videoHelpers";

interface VideoPlayerProps {
  url: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  controls?: boolean;
  muted?: boolean;
  poster?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  url,
  className = "",
  autoPlay = false,
  loop = false,
  controls = true,
  muted = false,
  poster,
}) => {
  if (!url) return null;

  if (isYouTubeUrl(url)) {
    const videoId = getYouTubeId(url);
    if (!videoId) return null;

    const params = new URLSearchParams({
      rel: "0",
      modestbranding: "1",
    });

    if (autoPlay) params.set("autoplay", "1");
    if (!controls) params.set("controls", "0");
    if (muted) params.set("mute", "1");

    const embedUrl = `https://www.youtube.com/embed/${videoId}?${params.toString()}`;

    return (
      <div className={`relative aspect-video w-full ${className}`}>
        <iframe
          src={embedUrl}
          title="YouTube video"
          className="w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  // Fallback: direct file (mp4, webm, etc.)
  return (
    <video
      src={url}
      className={`w-full h-auto  ${className}`}
      autoPlay={autoPlay}
      loop={loop}
      controls={controls}
      muted={muted}
      poster={poster}
    >
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;
