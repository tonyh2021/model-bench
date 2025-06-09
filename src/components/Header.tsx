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
  const matchIcon = metaData.icons.match.icon;
  const matchLink = metaData.icons.match.link;
  const githubLink = metaData.github.link;
  const uoftIcon = metaData.icons.uoft.icon;
  const uoftLink = metaData.icons.uoft.link;

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

  function icons() {
    return (
      <div className="flex items-center justify-center gap-2">
        <a
          href={githubLink}
          target="_blank"
          className={`bg-white-50 touch-target group h-14 w-14 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-md`}
          title="View GitHub Repository"
        >
          <FaGithub
            className={`transition-filter h-[100%] w-[100%] text-gray-800 brightness-95 contrast-125 hover:contrast-100`}
          />
        </a>

        <a
          href={matchLink}
          target="_blank"
          className={`bg-white-50 touch-target group relative h-14 w-14 items-center justify-center rounded-full transition-all duration-300 hover:scale-105 hover:shadow-md`}
          title="View GitHub Repository"
        >
          <Image
            src={getImagePath(matchIcon)}
            alt="match icon"
            fill
            className="transition-filter rounded-full object-cover brightness-95 contrast-125 group-hover:contrast-125"
          />
        </a>

        <a
          href={uoftLink}
          target="_blank"
          title="Visit UofT"
          className={`bg-white-50 touch-target group relative h-14 w-[150px] overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-md`}
        >
          <Image
            src={getImagePath("/images/uoft.jpg")}
            alt="uoft logo"
            fill
            className="transition-filter object-contain brightness-95 contrast-125 group-hover:contrast-125"
          />
        </a>
      </div>
    );
  }

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
        {icons()}
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
        {icons()}
      </div>
    </header>
  );
}
