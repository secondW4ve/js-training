import { Exclude, Expose } from 'class-transformer';
import instantiateAndValidate from '../../exercises/entities/instantiate-and-validate';
import { IsMongoId, IsNumber, Max, Min } from 'class-validator';

@Exclude()
export class TaskResult {
  @Expose()
  @IsMongoId()
  readonly id: string;

  @Expose()
  @IsNumber()
  @Min(0)
  @Max(100)
  readonly result: number;

  static fromPlain(plain: TaskResult) {
    return instantiateAndValidate(TaskResult, plain);
  }
}
