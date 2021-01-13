import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@Exclude()
export default class SolutionPart {
  @Expose()
  @IsNumber()
  readonly id: number;

  @Expose()
  @IsString()
  @IsNotEmpty()
  readonly content: string;

  static fromPlain(solutionPart: SolutionPart) {
    return plainToClass(SolutionPart, solutionPart);
  }
}
