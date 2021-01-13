import { Exclude, Expose, plainToClass, Transform } from 'class-transformer';
import { TaskSolutionCheckResult } from '../../exercises-solution-check/entities/task-solution-check-result';
import { ValidateNested } from 'class-validator';
import instantiateAndValidate from '../entities/instantiate-and-validate';

@Exclude()
export class SolutionCheckResponse {
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
  readonly result: Map<string, TaskSolutionCheckResult>;

  static fromPlain(checkResponse: SolutionCheckResponse) {
    return instantiateAndValidate(SolutionCheckResponse, checkResponse);
  }
}
