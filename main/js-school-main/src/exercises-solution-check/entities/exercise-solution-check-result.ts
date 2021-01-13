import { Expose, plainToClass, Transform } from 'class-transformer';
import { TaskSolutionCheckResult } from './task-solution-check-result';
import { IsNumber, Max, Min, ValidateNested } from 'class-validator';
import instantiateAndValidate from '../../exercises/entities/instantiate-and-validate';

@Expose()
export class ExerciseSolutionCheckResult {
  @Expose()
  @IsNumber()
  @Min(0)
  @Max(100)
  readonly result: number;

  @Expose()
  @ValidateNested()
  @Transform(
    (value) => {
      const map = new Map<string, TaskSolutionCheckResult>();
      for (const entry of value.entries
        ? value.entries()
        : Object.entries(value))
        map.set(entry[0], plainToClass(TaskSolutionCheckResult, entry[1]));
      return map;
    },
    { toClassOnly: true },
  )
  readonly taskResults: Map<string, TaskSolutionCheckResult>;

  static fromPlain(plain: ExerciseSolutionCheckResult) {
    return instantiateAndValidate(ExerciseSolutionCheckResult, plain);
  }
}
