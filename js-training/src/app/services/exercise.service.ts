import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Exercise } from '../interfaces/exercise.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  
	private ROOT_API = 'http://18.196.102.250:80';
	private EXERCISE_ID = '5ffb192a98015046aea6c864';
	private USER_ID = '5ffeaed810490928236d1bb5';


  constructor(private http: HttpClient) {}

  getExercise(exerciseId: string): Observable<Exercise> {
    return this.http.get<Exercise>(`${this.ROOT_API}/exercises/${exerciseId}`, {

		});
	};

	getAllExercises(): Observable<any> {
		return this.http.get(`${this.ROOT_API}/exercises`);
	}
	
	checkAnswers(exerciseId, answers) {
		return this.http.post(`${this.ROOT_API}/exercises/${exerciseId}/check`, {
			userId: this.USER_ID,
			...answers
		});
	}

	getUserStatistic() {
		return this.http.get(`${this.ROOT_API}/users/${this.USER_ID}`)
	}
}
