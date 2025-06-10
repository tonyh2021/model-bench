import { useSearchParams } from "next/navigation";
import { CompetitionType } from "@/types";

export function useCompetition() {
  const searchParams = useSearchParams();
  const competition = searchParams.get("competition");
  const competitionType =
    competition === "5651"
      ? CompetitionType.TextGuided
      : CompetitionType.Interactive;

  return competitionType;
}
