import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExerciseComponent } from './exercise/exercise.component';
import { ExercisesListComponent } from './exercises-list/exercises-list.component';
import { StatisticComponent } from './statistic/statistic.component';
import { TaskComponent } from './task/task.component';

const routes: Routes = [
  {
    path: 'statistic',
    component: StatisticComponent
  },
  {
    path: 'exercises',
    component: ExercisesListComponent
  },
  {
    path: 'exercise/:exId',
    component: ExerciseComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
