import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { SolutionPart, Task } from '../interfaces/exercise.interfaces';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() task: Task;
  @Output() onClickNextTask = new EventEmitter<any[]>();

  answers: SolutionPart[];
  solutions: SolutionPart[];

  constructor() { }

  ngOnInit(): void {
    this.answers = [];
    this.solutions = [...this.task.solutionParts];
  }

  ngOnChanges(changes: SimpleChanges){
    this.answers = [];
    this.solutions = [...this.task.solutionParts];
  }

  drop(event: CdkDragDrop<string[]>){
    if(event.previousContainer === event.container){
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  onClick(){
    this.onClickNextTask.emit(this.answers);
  }
}
