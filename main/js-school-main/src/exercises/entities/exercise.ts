import Complexity from './complexity';
import { Task, TaskInput } from './task';
import { Exclude, Expose, Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import instantiateAndValidate from './instantiate-and-validate';

@Exclude()
export class ExerciseCore {
  @Expose()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @Expose()
  @IsEnum(Complexity)
  readonly complexity: Complexity;

  static fromPlain(exercise: ExerciseCore) {
    return instantiateAndValidate(ExerciseCore, exercise);
  }
}

@Exclude()
export class Exercise extends ExerciseCore {
  @Expose()
  @IsMongoId()
  readonly id: string;

  @Expose()
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => Task)
  readonly tasks: Task[];

  static fromPlain(exercise: Exercise) {
    return instantiateAndValidate(Exercise, exercise);
  }
}

@Exclude()
export class ExerciseInput extends ExerciseCore {
  @Expose()
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => TaskInput)
  readonly tasks: TaskInput[];

  static fromPlain(exercise: ExerciseInput) {
    return instantiateAndValidate(ExerciseInput, exercise);
  }
}
