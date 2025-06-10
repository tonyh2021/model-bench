import { useSearchParams } from "next/navigation";
import { DataType } from "@/types";

export function useDataType() {
  const searchParams = useSearchParams();
  const data = searchParams.get("data");
  const dataType =
    data === "core" ? DataType.CoreSet : DataType.AllData;

  return dataType;
}
