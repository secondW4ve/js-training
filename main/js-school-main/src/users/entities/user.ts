import { Exclude, Expose, Type } from 'class-transformer';
import { ExerciseResult } from './exercise-result';
import instantiateAndValidate from '../../exercises/entities/instantiate-and-validate';
import { IsMongoId, IsString, ValidateNested } from 'class-validator';

@Exclude()
export class UserCore {
  @Expose()
  @IsString()
  readonly username;

  @Expose()
  @ValidateNested()
  @Type(() => ExerciseResult)
  readonly exerciseResults: ExerciseResult[];

  static fromPlain(plain: UserCore) {
    return instantiateAndValidate(UserCore, plain);
  }
}

@Exclude()
export class User extends UserCore {
  @Expose()
  @IsMongoId()
  readonly id: string;

  static fromPlain(plain: User) {
    return instantiateAndValidate(User, plain);
  }
}

@Exclude()
export class UserInput extends UserCore {}
