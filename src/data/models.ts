"use client";

import { DataType, Model } from "@/types";
import allModelsData from "./model_all.json";
import coreSetModelsData from "./model_core.json";

const modelsAll: Model[] = allModelsData;
const modelsCoreSet: Model[] = coreSetModelsData;

export const fetchModels = (
  dataType: DataType,
): Model[] => {
  return dataType === DataType.AllData
    ? modelsAll
    : modelsCoreSet;
};
