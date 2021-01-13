import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import Complexity from '../exercises/entities/complexity';
import { TaskCore } from '../exercises/entities/task';
import { ExerciseCore } from '../exercises/entities/exercise';

const SolutionPartSchema = new Schema({
  id: { type: Number, required: true },
  content: { type: String, required: true },
});

const TaskSchema = new Schema({
  name: { type: String, required: true },
  solutionParts: { _id: false, type: [SolutionPartSchema], required: true },
  solution: { type: [Number], required: true },
});

export const ExerciseSchema = new Schema({
  name: { type: String, required: true },
  complexity: { type: String, enum: Object.values(Complexity), required: true },
  tasks: { type: [TaskSchema], required: true },
});

export type TaskDocument = TaskCore & mongoose.Types.Subdocument;

export type ExerciseDocument = ExerciseCore &
  mongoose.Document & { tasks: mongoose.Types.Array<TaskDocument> };
