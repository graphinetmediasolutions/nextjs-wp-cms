"use client";

import Link from "next/link";
import * as React from "react";

type Props = {
  href: string;
  external?: boolean;
  target?: string | null;
  className?: string;
  children: React.ReactNode;
};

export default function LinkOrA({ href, external, target, className, children }: Props) {
  if (external) {
    return (
      <a href={href} target={target || "_blank"} rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
