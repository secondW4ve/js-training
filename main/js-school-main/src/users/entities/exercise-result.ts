import { Exclude, Expose, plainToClass, Type } from 'class-transformer';
import { TaskResult } from './task-result';
import instantiateAndValidate from '../../exercises/entities/instantiate-and-validate';
import { ExerciseSolutionCheckResult } from '../../exercises-solution-check/entities/exercise-solution-check-result';
import { IsMongoId, IsNumber, Max, Min, ValidateNested } from 'class-validator';

@Exclude()
export class ExerciseResult {
  @Expose()
  @IsMongoId()
  readonly id: string;

  @Expose()
  @IsNumber()
  @Min(0)
  @Max(100)
  readonly result: number;

  @Expose()
  @ValidateNested()
  @Type(() => TaskResult)
  readonly taskResults: TaskResult[];

  static fromPlain(plain: ExerciseResult) {
    return instantiateAndValidate(ExerciseResult, plain);
  }

  static fromSolutionCheckResult(
    id: string,
    solutionCheckResult: ExerciseSolutionCheckResult,
  ) {
    const taskResults = Array.from(solutionCheckResult.taskResults.entries())
      .map(([taskId, taskSolutionCheckResult]) => ({
        ...taskSolutionCheckResult,
        id: taskId,
      }))
      .map(TaskResult.fromPlain);
    return ExerciseResult.fromPlain({
      id,
      result: solutionCheckResult.result,
      taskResults,
    });
  }
}
