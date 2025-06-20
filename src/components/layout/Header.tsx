"use client";

import Image from "next/image";
import { FaGithub, FaArrowRight } from "react-icons/fa";
import metaData from "@/data/meta";
import { useDataType } from "@/hooks/useDataType";
import { CompetitionType, DataType } from "@/types";
import { useCompetition } from "@/hooks/useCompetition";

export default function Header() {
  // Get basePath from environment variable
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  const dataType = useDataType();
  const competition = useCompetition();

  const competitionTitle =
    competition === CompetitionType.Interactive
      ? metaData.competitionType.Interactive.titleValue
      : metaData.competitionType.TextGuided.titleValue;
  const dataTypeTitle =
    dataType === DataType.CoreSet
      ? metaData.dataType.core.titleValue
      : metaData.dataType.all.titleValue;
  const titleExtra = `: ${competitionTitle} Segmentation-${dataTypeTitle} Track`;

  // DataTypeLink: current competition param but opposite dataType
  const targetDataTypeTitle =
    dataType === DataType.CoreSet
      ? metaData.dataType.all.titleValue
      : metaData.dataType.core.titleValue;
  const targetDataTypeLink = `?${
    competition === CompetitionType.Interactive
      ? metaData.competitionType.Interactive.link
      : metaData.competitionType.TextGuided.link
  }&${
    dataType === DataType.CoreSet
      ? metaData.dataType.all.link
      : metaData.dataType.core.link
  }`;

  // CompetitionLink: current dataType param but opposite competition
  const targetCompetitionLink = `?${
    competition === CompetitionType.Interactive
      ? metaData.competitionType.TextGuided.link
      : metaData.competitionType.Interactive.link
  }&${
    dataType === DataType.CoreSet
      ? metaData.dataType.core.link
      : metaData.dataType.all.link
  }`;

  const title = metaData.title + titleExtra;
  const description = metaData.description;
  const matchIcon = metaData.icons.match.icon;
  const matchLink = metaData.icons.match.link;
  const match2Icon = metaData.icons.match2.icon;
  const match2Link = metaData.icons.match2.link;
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

  const icons = () => {
    return (
      <div className="flex items-center justify-center gap-2">
        <a
          href={githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`bg-white-50 touch-target group h-12 w-12 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-md`}
          title="View GitHub Repository"
        >
          <FaGithub
            className={`transition-filter h-[100%] w-[100%] text-gray-800 brightness-95 contrast-125 hover:contrast-100`}
          />
        </a>

        <a
          href={
            competition === CompetitionType.Interactive
              ? matchLink
              : targetCompetitionLink
          }
          target={
            competition === CompetitionType.Interactive
              ? "_blank"
              : ""
          }
          rel="noopener noreferrer"
          className={`bg-white-50 touch-target group relative h-12 w-12 items-center justify-center rounded-full transition-all duration-300 hover:scale-105 hover:shadow-md`}
        >
          <Image
            src={getImagePath(matchIcon)}
            alt="competition icon"
            fill
            className="transition-filter rounded-full object-cover brightness-95 contrast-125 group-hover:contrast-125"
          />
        </a>

        <a
          href={
            competition === CompetitionType.TextGuided
              ? match2Link
              : targetCompetitionLink
          }
          target={
            competition === CompetitionType.TextGuided
              ? "_blank"
              : ""
          }
          rel="noopener noreferrer"
          className={`bg-white-50 touch-target group relative h-12 w-12 items-center justify-center rounded-full transition-all duration-300 hover:scale-105 hover:shadow-md`}
        >
          <Image
            src={getImagePath(match2Icon)}
            alt="competition icon"
            fill
            className="transition-filter rounded-full object-cover brightness-95 contrast-125 group-hover:contrast-125"
          />
        </a>

        <a
          href={uoftLink}
          target="_blank"
          rel="noopener noreferrer"
          title="Visit UofT"
          className={`bg-white-50 touch-target group relative h-14 w-[150px] overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-md`}
        >
          <Image
            src={getImagePath(uoftIcon)}
            alt="uoft logo"
            fill
            className="transition-filter object-contain brightness-95 contrast-125 group-hover:contrast-125"
          />
        </a>
      </div>
    );
  };

  const leftPart = () => {
    return (
      <div>
        <h1 className="text-left text-3xl font-semibold tracking-tight">
          {title}
          <a
            href={basePath + targetDataTypeLink}
            className="ml-3 inline-flex items-center gap-1 rounded-md bg-blue-500 px-2 py-0.5 align-middle text-sm font-medium text-white transition-colors hover:bg-blue-400"
          >
            {targetDataTypeTitle}
            <FaArrowRight className="ml-1 h-3 w-3" />
          </a>
        </h1>
        <p className="mt-2 text-left text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    );
  };

  return (
    <header className="mb-4 border-b border-gray-100 pb-4 sm:mb-6 sm:pb-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {leftPart()}
        {icons()}
      </div>
    </header>
  );
}
