// components/VideoPlayer.tsx
"use client";

import React, { useRef, useState } from "react";
import { isYouTubeUrl, getYouTubeId } from "@/utils/videoHelpers";

interface VideoPlayerProps {
  url: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  controls?: boolean;
  muted?: boolean;
  poster?: string;
  videoParentClass?: string
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  url,
  className = "",
  autoPlay = false,
  loop = false,
  controls = true,
  muted = false,
  poster,
  videoParentClass,
}) => {

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

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

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };
  return (
    <div className={`relative ${videoParentClass} `}>
      <video
        ref={videoRef}
        src={url}
        className={`w-full h-full  ${className}`}
        autoPlay={autoPlay}
        loop={loop}
        controls={controls}
        muted={muted}
        poster={poster}
         onClick={togglePlay}
      >
        Your browser does not support the video tag.
      </video>
      {/* Play button overlay (only if not autoplay) */}
      {!isPlaying && !autoPlay && (
        <button
          type="button"
           onClick={togglePlay}
          className="
            absolute w-full h-full top-0 left-0 flex items-center justify-center
            bg-black/30 hover:bg-black/50
            transition-colors
          "
        >
          <div
            className="
              w-16 h-16 rounded-full bg-white
              flex items-center justify-center
              shadow-lg
            "
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="black"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </button>
      )}
    </div>

  );
};

export default VideoPlayer;
