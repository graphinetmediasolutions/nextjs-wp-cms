"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";

import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import { MenuNode } from "./types";

type Props = {
  data: MenuNode[];
  headerLogo?: string;
  socials?: any[];
};

export default function HeaderClient({ data, headerLogo }: Props) {
  return (
    <header className="sticky top-0 z-50 py-3 border-b bg-white ">
      <div className="container">
        <div className="flex h-16 items-center justify-between gap-3">
          <Link href="/" className="font-semibold">
            {headerLogo && (
              <Image
                src={headerLogo}
                alt="Header Logo"
                width={300}
                height={120}
                className="h-20 w-auto"
              />
            )}
          </Link>

          <div className="hidden xl:block">
            <DesktopNav items={data} />
          </div>

          <div className="xl:hidden">
            <MobileNav items={data} />
          </div>
        </div>
      </div>
    </header>
  );
}
