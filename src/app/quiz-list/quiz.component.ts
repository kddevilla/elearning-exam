import { Component, OnInit } from '@angular/core';
import { Utilities } from '../utils/utility.service';
import { environment } from "../../environments/environment";

const quizUrl = environment.apiBaseUrl + environment.quizFunction.path;

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  quizList: Array<any> = [];

  constructor(private utils: Utilities){}

  ngOnInit(): void {
    this.setQuizList();
  }

  setQuizList(): void {
    let getQuizEndpoint: string = quizUrl + environment.quizFunction.actioncd.getquiz;
    
    this.utils.httpPostRequest(getQuizEndpoint).subscribe({
      next: (val: any) => {
        this.quizList = val.response as Array<any>;
      },
      error: (err: Error) => console.error('Observer got an error: ' + err)
    });
  }
}
