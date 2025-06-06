"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import metaData from "@/data/meta";

export default function Header() {
  // Get basePath from environment variable
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  const title = metaData.title;
  const description = metaData.description;
  const githubLink =
    "https://github.com/JunMa11/CVPR-MedSegFMCompetition";
  const uoftLink = "https://www.utoronto.ca/";

  // Helper function to construct image paths correctly
  const getImagePath = (imagePath: string) => {
    if (basePath) {
      return `${basePath}${imagePath}`;
    }
    return imagePath;
  };

  // Responsive state management for partner icons
  const [isNarrowDesktop, setIsNarrowDesktop] =
    useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsNarrowDesktop(width >= 1200 && width < 1600); // 1200-1600px范围
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () =>
      window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <header className="mb-4 border-b border-gray-100 pb-4 sm:mb-6 sm:pb-6">
      {/* Mobile layout - stacked vertically */}
      <div className="flex flex-col gap-3 sm:hidden">
        <div className="text-center">
          <div className="mb-2">
            <h1 className="text-left text-3xl font-semibold tracking-tight">
              {title}
            </h1>
          </div>
          <p className="text-left text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-center">
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white-50 touch-target group relative rounded-lg p-2 transition-all duration-300 hover:scale-105 hover:shadow-md"
            title="View GitHub Repository"
          >
            <div className="absolute inset-0 rounded-lg bg-white/50 opacity-0 transition-opacity group-hover:opacity-100" />
            <FaGithub className="transition-filter h-10 w-10 text-gray-800 brightness-95 contrast-125 hover:contrast-100" />
            <div className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-br from-white/30 to-transparent opacity-30 mix-blend-overlay transition-opacity group-hover:opacity-50" />
          </a>

          <a
            href={uoftLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white-50 touch-target group relative h-14 w-[160px] rounded-lg p-2 transition-all duration-300 hover:scale-105 hover:shadow-md"
            title="Visit UofT"
          >
            <Image
              src={getImagePath("/images/uoft.jpg")}
              alt="uoft logo"
              fill
              className="transition-filter object-contain brightness-95 contrast-125 group-hover:contrast-125"
            />
          </a>
        </div>
      </div>

      {/* Desktop layout - side by side */}
      <div className="hidden items-center justify-between gap-4 sm:flex">
        <div>
          <div className="mb-2">
            <h1 className="text-left text-3xl font-semibold tracking-tight">
              {title}
            </h1>
          </div>
          <p className="text-sm leading-tight text-muted-foreground">
            {description}
          </p>
        </div>

        <div className={`flex items-center`}>
          {/* Desktop logo layout */}
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative ${
              isNarrowDesktop ? "p-2" : "p-3"
            } bg-white-50 touch-target rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-md`}
            title="View GitHub Repository"
          >
            <div className="absolute inset-0 rounded-lg bg-white/50 opacity-0 transition-opacity group-hover:opacity-100" />
            <FaGithub
              className={`transition-filter h-14 w-14 text-gray-800 brightness-95 contrast-125 hover:contrast-100`}
            />
            <div className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-br from-white/30 to-transparent opacity-30 mix-blend-overlay transition-opacity group-hover:opacity-50" />
          </a>

          <a
            href={uoftLink}
            target="_blank"
            rel="noopener noreferrer"
            title="Visit UofT"
            className={`bg-white-50 touch-target group relative h-14 w-[160px] overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-md`}
          >
            <Image
              src={getImagePath("/images/uoft.jpg")}
              alt="uoft logo"
              fill
              className="transition-filter object-contain brightness-95 contrast-125 group-hover:contrast-125"
            />
          </a>
        </div>
      </div>
    </header>
  );
}
