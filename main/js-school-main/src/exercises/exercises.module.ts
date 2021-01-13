import { Module } from '@nestjs/common';
import { ExercisesDataModule } from '../exercises-data/exercises-data.module';
import { ExercisesController } from './exercises.controller';
import { ExercisesSolutionCheckModule } from '../exercises-solution-check/exercises-solution-check.module';
import { ExercisesService } from './exercises.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [ExercisesDataModule, ExercisesSolutionCheckModule, UsersModule],
  providers: [ExercisesService],
  controllers: [ExercisesController],
})
export class ExercisesModule {}
