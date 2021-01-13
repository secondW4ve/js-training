import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef, AfterContentInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Exercise, Task } from '../interfaces/exercise.interfaces';
import { ExerciseService } from '../services/exercise.service';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})
export class ExerciseComponent implements OnInit {

  exercise: Exercise;
  loading: boolean = true;
  currentTask: number;
  task: Task;
  exerciseOriginal: Exercise = {
    id: '',
    name: '',
    complexity: 0,
    tasks: []
  };

  private answers = {
    solution: {}
  };

  resultsObj = undefined;

  private subscription: any;

  constructor(private exerciseService: ExerciseService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(params => {
      console.log(params['exId'])
      this.exerciseService.getExercise(params['exId']).subscribe((response: Exercise) => {
        this.exercise = {...response};
        Object.assign(this.exerciseOriginal, response);
        this.currentTask = 0;
        this.task = this.exercise.tasks[this.currentTask];
        this.loading = false;
      });
    })
  };

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onClickNextTask(taskAnswers) {
    const solution = [];
    for (let i = 0; i < taskAnswers.length; i++) {
      solution.push(taskAnswers[i].id)
    }
    this.answers.solution[this.exercise.tasks[this.currentTask].id] = {
      taskSolution: taskAnswers.map(answer => answer.id)
    }
    if (this.currentTask + 1 < this.exercise.tasks.length) {
      this.currentTask++;
      this.task = this.exercise.tasks[this.currentTask];
    } else {
      this.exerciseService.checkAnswers(this.exercise.id, this.answers).subscribe(response => {
        this.resultsObj = response;
      })
    }
  }
}
