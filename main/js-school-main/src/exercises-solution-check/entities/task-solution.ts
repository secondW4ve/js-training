import { Exclude, Expose } from 'class-transformer';
import { IsNumber } from 'class-validator';
import instantiateAndValidate from '../../exercises/entities/instantiate-and-validate';

@Exclude()
export class TaskSolution {
  @Expose()
  @IsNumber({}, { each: true })
  readonly taskSolution: number[];

  static fromPlain(solution: TaskSolution) {
    return instantiateAndValidate(TaskSolution, solution);
  }
}
