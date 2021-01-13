import { Injectable } from '@nestjs/common';
import { Exercise } from '../exercises/entities/exercise';
import { Task } from '../exercises/entities/task';
import { TaskSolutionCheckResult } from './entities/task-solution-check-result';
import { TaskSolution } from './entities/task-solution';
import { ExerciseSolutionCheckResult } from './entities/exercise-solution-check-result';

@Injectable()
export class ExerciseSolutionChecker {
  checkExercise(
    exerciseSolution: Map<string, TaskSolution>,
    exercise: Exercise,
  ): ExerciseSolutionCheckResult {
    const taskSolutionCheckResults = ExerciseSolutionChecker.checkTasks(
      exercise,
      exerciseSolution,
    );

    const exerciseResult = ExerciseSolutionChecker.getExerciseResult(
      taskSolutionCheckResults,
    );

    return ExerciseSolutionCheckResult.fromPlain({
      result: exerciseResult,
      taskResults: taskSolutionCheckResults,
    });
  }

  private static checkTasks(
    exercise: Exercise,
    exerciseSolution: Map<string, TaskSolution>,
  ): Map<string, TaskSolutionCheckResult> {
    return exercise.tasks.reduce((taskCheckResults, task) => {
      const taskSolution = exerciseSolution.get(task.id);
      const taskCheckResult = ExerciseSolutionChecker.checkTask(
        task,
        taskSolution,
      );
      taskCheckResults.set(task.id, taskCheckResult);
      return taskCheckResults;
    }, new Map());
  }

  private static checkTask(
    task: Task,
    taskSolution?: TaskSolution,
  ): TaskSolutionCheckResult {
    const result = ExerciseSolutionChecker.getTaskSolutionResult(
      task.solution,
      taskSolution?.taskSolution,
    );
    const correct = ExerciseSolutionChecker.isCorrect(result);
    const solution = task.solution;
    return TaskSolutionCheckResult.fromPlain({
      correct,
      result,
      solution,
    });
  }

  private static getTaskSolutionResult(
    taskSolution: number[],
    solution?: number[],
  ): number {
    if (!solution) {
      return 0;
    }
    const correctParts = solution.filter(
      (solutionPart, partIndex) => solutionPart === taskSolution[partIndex],
    );

    return Math.floor((correctParts.length / taskSolution.length) * 100);
  }

  private static isCorrect(result: number) {
    return result === 100;
  }

  private static getExerciseResult(
    taskSolutionCheckResults: Map<string, TaskSolutionCheckResult>,
  ) {
    const taskSolutionCheckResultsArray = Array.from(
      taskSolutionCheckResults.values(),
    );
    const taskResultsSum = taskSolutionCheckResultsArray.reduce(
      (sum, taskSolutionCheckResult) => sum + taskSolutionCheckResult.result,
      0,
    );

    return taskResultsSum / taskSolutionCheckResultsArray.length;
  }
}
