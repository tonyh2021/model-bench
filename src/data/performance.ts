"use client";

import { Performance } from "@/types";
import performanceAllData from "./performance_all.json";
import performanceCoreSetData from "./performance_core.json";

export let dataType: "AllData" | "CoreSet" = "AllData";

const performanceData =
  dataType === "AllData"
    ? performanceAllData
    : performanceCoreSetData;

export const performances: Performance[] =
  performanceData.map((item) => ({
    id: item.id,
    modelId: item.model_id,
    organ: item.organ,
    taskName: item.task_name,
    dataType: item.data_type,
    taskId: item.id.toString().slice(0, -2),
    metrics: item.metrics,
    rankMean: item.rank_mean,
    rank: item.rank,
  }));
