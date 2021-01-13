import SolutionPart from './solution-part';
import { Exclude, Expose, Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsMongoId,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import instantiateAndValidate from './instantiate-and-validate';

@Exclude()
export class TaskCore {
  @Expose()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @Expose()
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => SolutionPart)
  readonly solutionParts: SolutionPart[];

  @Expose()
  @ArrayNotEmpty()
  readonly solution: number[];

  static fromPlain(task: TaskCore) {
    return instantiateAndValidate(TaskCore, task);
  }
}

@Exclude()
export class Task extends TaskCore {
  @Expose()
  @IsMongoId()
  readonly id: string;

  static fromPlain(task: Task) {
    return instantiateAndValidate(Task, task);
  }
}

@Exclude()
export class TaskInput extends TaskCore {
  static fromPlain(task: TaskInput) {
    return instantiateAndValidate(TaskInput, task);
  }
}
