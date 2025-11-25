"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ContentModal from "./ContentModal";

type ContentDialogProps = {
  content: string;
  buttonLabel?: string;
  title?: string;
  className?: string;
};

const ContentDialog: React.FC<ContentDialogProps> = ({
  content,
  buttonLabel = "View details",
  title = "Details",
  className=""
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className={className}>
          {buttonLabel}
        </button>
      </DialogTrigger>

      <DialogContent className="lg:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <ContentModal content={content} />
      </DialogContent>
    </Dialog>
  );
};

export default ContentDialog;
