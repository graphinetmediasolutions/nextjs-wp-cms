// src/components/layout/Footer.tsx
import Image from "next/image";
import React from "react";
import type { SocialLink } from "@/types/global";
import { getFooterWidgets } from "@/lib/getFooterWidgets";
import { WidgetArea } from "@/components/widgets/WidgetArea";

import { SocialIcon } from "../SocialIcon";

type FooterProps = {
  footerLogo?: string;
  socials: SocialLink[];
};

export default async function Footer({ footerLogo, socials }: FooterProps) {
  const { topFooter, footer1, footer2, footer3, footer4, footerInfo } = await getFooterWidgets();

  return (
    <footer className="bg-white">
      <div className="container space-y-8 py-16 lg:space-y-16">
        {/* Top bar: logo + socials */}
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="text-teal-600">
            {footerLogo && (
              <Image
                src={footerLogo}
                alt="Footer Logo"
                width={300}
                height={120}
                className="h-20 w-auto"
              />
            )}
          </div>

          <ul className="mt-8 flex justify-start gap-6 sm:mt-0 sm:justify-end">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.url}
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-700 hover:text-black transition hover:scale-110"
                  aria-label={s.label}
                  title={s.label}
                >
                  <span className="sr-only">{s.label}</span>
                  <SocialIcon platform={s.label} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Optional top footer strip (full-width) */}
        <WidgetArea widgets={topFooter ?? []} />

        {/* Four dynamic columns */}
        <div className="grid grid-cols-1 gap-8 border-t border-gray-100 pt-8 sm:grid-cols-2 lg:grid-cols-4 lg:pt-16">
          <WidgetArea widgets={footer1 ?? []} />
          <WidgetArea widgets={footer2 ?? []} />
          <WidgetArea widgets={footer3 ?? []} />
          <WidgetArea widgets={footer4 ?? []} />
        </div>

        {/* Optional bottom info strip */}
        <WidgetArea widgets={footerInfo ?? []} />

        <p className="text-xs text-gray-500">© {new Date().getFullYear()}. Company Name. All rights reserved.</p>
      </div>
    </footer>
  );
}
