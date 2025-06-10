"use client";

import { CompetitionType, DataType, Model } from "@/types";
import allModelsData from "./model_all.json";
import coreSetModelsData from "./model_core.json";
import allModelsData2 from "./model_all_2.json";
import coreSetModelsData2 from "./model_core_2.json";

const modelsAll: Model[] = allModelsData;
const modelsCoreSet: Model[] = coreSetModelsData;
const modelsAll2: Model[] = allModelsData2;
const modelsCoreSet2: Model[] = coreSetModelsData2;

export const fetchModels = (
  dataType: DataType,
  competition: CompetitionType,
): Model[] => {
  if (dataType === DataType.AllData) {
    return competition === CompetitionType.Interactive
      ? modelsAll
      : modelsAll2;
  } else {
    return competition === CompetitionType.Interactive
      ? modelsCoreSet
      : modelsCoreSet2;
  }
};
