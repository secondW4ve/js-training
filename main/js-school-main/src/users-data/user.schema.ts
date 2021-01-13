import { Schema } from 'mongoose';
import { UserCore } from '../users/entities/user';
import * as mongoose from 'mongoose';

const ResultField = {
  type: Number,
  min: 0,
  max: 100,
  validate: Number.isInteger,
  required: true,
};

const TaskResultSchema = new Schema({
  id: { type: String, required: true },
  result: ResultField,
});

const ExerciseResultSchema = new Schema({
  id: { type: String, required: true },
  result: ResultField,
  taskResults: { _id: false, type: [TaskResultSchema], required: true },
});

export const UserSchema = new Schema({
  username: { type: String, required: true },
  exerciseResults: { _id: false, type: [ExerciseResultSchema], required: true },
});

export type UserDocument = UserCore & mongoose.Document;
