// components/VideoDialog.tsx
"use client";

import React from "react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import VideoPlayer from "@/components/VideoPlayer";

interface VideoDialogProps {
  open: boolean;
  url: string | null;
  onClose: () => void;
}

const VideoDialog: React.FC<VideoDialogProps> = ({ open, url, onClose }) => {
  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) onClose(); // close on ESC / overlay / close button
      }}
    >
      <DialogContent className=" w-full max-w-[90vw] sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[75vw] xl:max-w-[70vw] bg-black border-0 rounded-none p-0">
        {/* CLOSE BUTTON */}
        <DialogClose asChild>
          <button
            className="absolute -top-12 right-0 text-white p-3 rounded-full z-50"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              stroke="currentColor"
              fill="none"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </DialogClose>

        {/* VIDEO AREA */}
        <div className="w-full flex items-center justify-center">
          {url ? (
            // This wrapper gives the player REAL height
            <div className="w-full max-w-full max-h-[80vh]">
              <VideoPlayer
                url={url}
                className="w-full h-full"
                autoPlay
                controls
              />
            </div>
          ) : (
            // fallback so you can SEE something even if url is null
            <div className="w-full max-w-full max-h-[80vh] flex items-center justify-center text-white">
              No video URL
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoDialog;
