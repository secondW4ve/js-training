import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExerciseService } from '../services/exercise.service';

@Component({
  selector: 'app-exercises-list',
  templateUrl: './exercises-list.component.html',
  styleUrls: ['./exercises-list.component.scss']
})
export class ExercisesListComponent implements OnInit {

  constructor(private exerciseService: ExerciseService, private router: Router) { }

  loading = true;
  exercises = [];

  ngOnInit(): void {
    this.exerciseService.getAllExercises().subscribe(response => {
      this.exercises = response;
      this.loading = false;
    })
  }


  openExercise(exId){
    this.router.navigate(['/exercise', exId]);
  }
}
