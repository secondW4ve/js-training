import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  @Input() resultsObj;
  @Input() exercise;

  resultsArray = [];

  constructor() { }

  ngOnInit(): void {
    console.log('ResObj', this.resultsObj);
    this.resultsArray = Object.keys(this.resultsObj.taskResults).map((value, index) => {
      return {
        taskId: value,
        taskName: this.exercise.tasks[index].name,
        result: this.resultsObj.taskResults[value]
      }
    });
    console.log(this.resultsArray);
  }

  getClass(correct) {
    return correct ? 'correct-result' : 'wrong-result';
  }

  getRightSolution(taskId){
    const task = this.exercise.tasks.filter(task => task.id === taskId)[0];
    //console.log(task);
    let solutionText = '';
    task.solution.forEach(solutionPartNumber => {
      solutionText += task.solutionParts.filter(part => part.id === solutionPartNumber)[0].content;
    });
    return solutionText;
  }

}
