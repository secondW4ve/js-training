import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../services/exercise.service';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {

  constructor(private exerciseService: ExerciseService) { }

  userStatistics;
  exercises = [];
  loading = true;

  ngOnInit(): void {
    this.exerciseService.getUserStatistic().subscribe(response => {
      this.userStatistics = response;
      this.exerciseService.getAllExercises().subscribe(response => {
        this.exercises = response.map(exercise => {
          return {
            id: exercise.id,
            name: exercise.name,
          }
        });
        console.log(this.exercises);
        this.loading = false;
      })
      
    })
  }

  getClassByResult(result){
    if (result < 35) {
      return 'low-result';
    };
    if (result > 35 && result < 70) {
      return 'medium-result';
    }
    return 'good-result'
  };

  getExName(id) {
    console.log(id);
    return this.exercises.filter(ex => ex.id === id)[0].name;
  }
}
