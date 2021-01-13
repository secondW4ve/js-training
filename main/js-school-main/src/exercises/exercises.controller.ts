import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { Exercise, ExerciseInput } from './entities/exercise';
import { SolutionCheckRequest } from './dto/solution-check-request';
import { SolutionCheckResponse } from './dto/solution-check-response';
import { ExerciseSolutionCheckResult } from '../exercises-solution-check/entities/exercise-solution-check-result';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Get()
  async getAll(): Promise<Exercise[]> {
    return this.exercisesService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Exercise> {
    const exercise = await this.exercisesService.getById(id);

    if (exercise == null) {
      throw new HttpException(
        `Exercise ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }

    return exercise;
  }

  @Post()
  async create(@Body() exercise: ExerciseInput): Promise<Exercise> {
    return this.exercisesService.create(exercise);
  }

  @Post(':id/check')
  async check(
    @Param('id') id: string,
    @Body() solutionCheckRequest: SolutionCheckRequest,
  ): Promise<ExerciseSolutionCheckResult> {
    return this.exercisesService.checkExerciseSolution(
      id,
      solutionCheckRequest.userId,
      solutionCheckRequest.solution,
    );
  }
}
