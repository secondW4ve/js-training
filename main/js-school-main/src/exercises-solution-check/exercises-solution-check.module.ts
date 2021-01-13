import { Module } from '@nestjs/common';
import { ExerciseSolutionChecker } from './exercise-solution-checker';

@Module({
  providers: [ExerciseSolutionChecker],
  exports: [ExerciseSolutionChecker],
})
export class ExercisesSolutionCheckModule {}
