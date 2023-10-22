import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  quizList: Array<any> = [];

  constructor(){}

  ngOnInit(): void {
    this.setQuizList();
  }

  setQuizList(): void {
    this.quizList = [
      {
        subject: 'English',
        instructions: [
          'This quiz will determine how good you are at English Grammar.',
          'The quiz is composed of random (fill-in-the-blanks / multiple-choice) questions about English Grammar.'
        ]
      }
    ];
  }
}
