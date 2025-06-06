"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import { ModelFilter } from "@/components/filters/ModelFilter";
import { TaskTypeFilter } from "@/components/filters/TaskTypeFilter";
import { OrganFilter } from "@/components/filters/OrganFilter";
import Image from "next/image";
import { useEvaluation } from "@/context/EvaluationContext";

import { TaskDistributionChart } from "@/components/charts/TaskDistributionChart";
import { OverallRankBarChart } from "@/components/charts/OverallRankBarChart";

import { PieDataDistributionChart } from "@/components/charts/PieDataDistributionChart";
import PerformanceContent from "@/components/tables/PerformanceContent";

import { MetricSelector } from "@/components/selectors/MetricSelector";
import { Footer } from "@/components/layout/Footer";
import { LeaderboardTable } from "@/components/tables/LeaderboardTable";
import { FaGithub } from "react-icons/fa";
import metaData from "@/data/meta";

export function Dashboard() {
  const { getTaskById } = useEvaluation();
  // Get basePath from environment variable
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  // Helper function to construct image paths correctly
  const getImagePath = (imagePath: string) => {
    if (basePath) {
      return `${basePath}${imagePath}`;
    }
    return imagePath;
  };

  const [selectedMetrics, setSelectedMetrics] = useState<
    string[]
  >([]);
  const [selectedTaskId, setSelectedTaskId] = useState<
    string | undefined
  >();

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

  const title = metaData.title;
  const description = metaData.description;
  const githubLink =
    "https://github.com/JunMa11/CVPR-MedSegFMCompetition";
  const uoftLink = "https://www.utoronto.ca/";

  return (
    <div className="container mx-auto max-w-[1600px] py-3 sm:py-6">
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

      <Tabs defaultValue="overview">
        <div className="w-full overflow-x-auto pb-2">
          <TabsList className="flex w-auto min-w-max space-x-0.5 rounded-xl border border-gray-100 bg-gray-50 p-1 sm:space-x-1 sm:p-1.5">
            <TabsTrigger
              value="overview"
              className="whitespace-nowrap rounded-lg px-2 py-1.5 text-gray-600 transition-all hover:bg-gray-100/70 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm sm:px-6 sm:py-2"
            >
              <span className="text-xs font-medium sm:text-sm">
                Overview
              </span>
            </TabsTrigger>
            {/* <TabsTrigger
              value="leaderboard"
              className="whitespace-nowrap rounded-lg px-2 py-1.5 text-gray-600 transition-all hover:bg-gray-100/70 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm sm:px-6 sm:py-2"
            >
              <span className="text-xs font-medium sm:text-sm">
                Leaderboard
              </span>
            </TabsTrigger> */}
            {/* <TabsTrigger
              value="performance"
              className="whitespace-nowrap rounded-lg px-2 py-1.5 text-gray-600 transition-all hover:bg-gray-100/70 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm sm:px-6 sm:py-2"
            >
              <span className="text-xs font-medium sm:text-sm">
                Performance
              </span>
            </TabsTrigger> */}
          </TabsList>
        </div>

        <TabsContent
          value="overview"
          className="space-y-4 sm:space-y-6"
        >
          <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
            <TaskDistributionChart chartType="taskType" />
            <PieDataDistributionChart
              selectedMetrics={selectedMetrics}
            />
          </div>

          <div className="mb-4 grid grid-cols-1 gap-3 sm:mb-6 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            <ModelFilter />
            <TaskTypeFilter />
            <OrganFilter />
            <MetricSelector
              value={selectedMetrics}
              onChange={setSelectedMetrics}
            />
          </div>
          <div className="grid w-full">
            <OverallRankBarChart
              selectedMetrics={selectedMetrics}
            />
          </div>
        </TabsContent>

        <TabsContent value="leaderboard">
          <div className="my-4 sm:my-6">
            <LeaderboardTable />
          </div>
        </TabsContent>

        <TabsContent
          value="performance"
          className="space-y-4 sm:space-y-6"
        >
          <PerformanceContent />
        </TabsContent>
      </Tabs>

      <Footer />
    </div>
  );
}
