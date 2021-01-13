import { Module } from '@nestjs/common';
import { ExercisesDao } from './exercises.dao';
import { MongooseModule } from '@nestjs/mongoose';
import { ExerciseSchema } from './exercise.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Exercise', schema: ExerciseSchema }]),
  ],
  providers: [ExercisesDao],
  exports: [ExercisesDao],
})
export class ExercisesDataModule {}
