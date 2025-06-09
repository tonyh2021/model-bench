import { useSearchParams } from "next/navigation";
import { DataType } from "@/types";

export function useDataType() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const dataType =
    type === "core" ? DataType.CoreSet : DataType.AllData;

  return dataType;
}
