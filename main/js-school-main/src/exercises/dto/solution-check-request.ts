import { Exclude, Expose, plainToClass, Transform } from 'class-transformer';
import instantiateAndValidate from '../entities/instantiate-and-validate';
import { TaskSolution } from '../../exercises-solution-check/entities/task-solution';
import { IsMongoId, ValidateNested } from 'class-validator';

@Exclude()
export class SolutionCheckRequest {
  @Expose()
  @IsMongoId()
  readonly userId: string;

  @Expose()
  @ValidateNested()
  @Transform(
    (value) => {
      const map = new Map<string, TaskSolution>();
      for (const entry of Object.entries(value))
        map.set(entry[0], plainToClass(TaskSolution, entry[1]));
      return map;
    },
    { toClassOnly: true },
  )
  readonly solution: Map<string, TaskSolution>;

  static fromPlain(checkRequest: SolutionCheckRequest) {
    return instantiateAndValidate(SolutionCheckRequest, checkRequest);
  }
}
