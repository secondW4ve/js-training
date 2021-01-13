import { Module } from '@nestjs/common';
import { ExercisesModule } from './exercises/exercises.module';
import { ExercisesDataModule } from './exercises-data/exercises-data.module';
import { ExercisesSolutionCheckModule } from './exercises-solution-check/exercises-solution-check.module';
import { UsersDataModule } from './users-data/users-data.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING || ''),
    ExercisesModule,
    ExercisesDataModule,
    ExercisesSolutionCheckModule,
    UsersDataModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
