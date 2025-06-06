import { Task, TaskInfo } from "@/types";
import { performances } from "./performance";

// Extract unique tasks from performance data
const extractTasksFromPerformance = (): Task[] => {
  const taskMap = new Map<string, Task>();

  performances.forEach((perf) => {
    taskMap.set(perf.taskId, {
      id: perf.taskId,
      name: perf.taskName,
      organ: perf.organ,
      taskType: perf.taskName,
      cohort: "perf.cohort",
      evaluationMetrics: [perf.metrics],
      description: `${perf.taskName} task for ${perf.organ}`,
      info: {
        description: `${perf.taskName} task for ${perf.organ}`,
        referenceUrl: "",
        referenceTitle: "",
      },
    });
  });

  return Array.from(taskMap.values());
};

export const tasks: Task[] = extractTasksFromPerformance();
