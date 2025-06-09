"use client";

import { Model } from "@/types";
import allModelsData from "./model_all.json";
import coreSetModelsData from "./model_core.json";
import { dataType } from "./performance";

export const models: Model[] =
  dataType === "AllData"
    ? allModelsData
    : coreSetModelsData;
