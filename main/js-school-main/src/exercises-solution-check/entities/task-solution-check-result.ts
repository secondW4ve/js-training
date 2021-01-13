import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsNumber, Max, Min } from 'class-validator';
import instantiateAndValidate from '../../exercises/entities/instantiate-and-validate';

@Exclude()
export class TaskSolutionCheckResult {
  @Expose()
  @IsBoolean()
  readonly correct: boolean;

  @Expose()
  @IsNumber()
  @Min(0)
  @Max(100)
  readonly result: number;

  @Expose()
  readonly solution: number[];

  static fromPlain(checkRequest: TaskSolutionCheckResult) {
    return instantiateAndValidate(TaskSolutionCheckResult, checkRequest);
  }
}
