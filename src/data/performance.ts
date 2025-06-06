import { Performance } from "@/types";
import performanceData from "./performance.json";

export const performances: Performance[] = performanceData
  .filter((item) => !item.model_id.includes("coreset"))
  .map((item) => ({
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

export const coreset_performances: Performance[] = performanceData
  .filter((item) => item.model_id.includes("coreset"))
  .map((item) => ({
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
