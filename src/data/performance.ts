"use client";

import { DataType, Performance } from "@/types";
import performanceAllData from "./performance_all.json";
import performanceCoreSetData from "./performance_core.json";

const performanceAll: Performance[] =
  performanceAllData.map((item) => ({
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

const performanceCoreSet: Performance[] =
  performanceCoreSetData.map((item) => ({
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

export const fetchPerformance = (
  dataType: DataType,
): Performance[] => {
  return dataType === DataType.AllData
    ? performanceAll
    : performanceCoreSet;
};
