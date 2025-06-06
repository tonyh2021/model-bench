import { Model } from "@/types";
// import modelsData from "./model.json";
import modelsData from "./model.json";

export const models: Model[] = modelsData.filter(
  (model) => !model.name.includes("coreset")
);

export const coreset_models: Model[] = modelsData.filter((model) =>
  model.name.includes("coreset")
);
