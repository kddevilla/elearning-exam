import { Component, OnInit, Input } from '@angular/core';
import { Utilities } from '../utils/utility.service';
import { environment } from "../../environments/environment";

const quizUrl = environment.apiBaseUrl + environment.quizFunction.path;

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.scss']
})
export class QuizResultComponent implements OnInit {

  @Input() score: string = '';
  @Input() assessmentDetails: string = '';

  quizRes: number = 0;
  scoreEvaluation: string = '';
  courseRecommendation: string = '';
  questions: Array<string> = [];
  resultModel: Array<any> = [];
  toggleDetails: boolean = false;

  constructor (private utils: Utilities) {}

  ngOnInit(): void {
    this.quizRes = parseFloat(this.score);
    this.evaluateScore();
  }

  switch(): void {
    this.toggleDetails = !this.toggleDetails;
  }

  postQuizResults(): void {
    let quiz: any = JSON.parse(this.assessmentDetails);
    
    quiz.assessmentResults.forEach((qResult: any, index: number) => {
      let replaceTxtInput: string = "<input id=\"q{num}\" type=\"textbox\">";
      replaceTxtInput = replaceTxtInput.replace('{num}', qResult.qnum);
      
      this.resultModel.push({
        question: qResult.qnum + '. ' + qResult.question.replace(replaceTxtInput, '________'),
        answer: qResult.answer,
        cAnswer: qResult.correctAnswer,
        res: qResult.result == 'Correct'
      });
    });
  }

  evaluateScore(): void {
    let getScoreDetailsEndpoint = quizUrl + environment.quizFunction.actioncd.getscoredetails;

    this.utils.httpPostRequest(getScoreDetailsEndpoint, {score: this.quizRes}).subscribe({
      next: (val: any) => {
        let res: any = val.response;
        
        this.scoreEvaluation = res.sEvaluation;
        this.courseRecommendation = res.cRecommendation;
      },
      error: (err: Error) => console.error('Observer got an error: ' + err),
      complete: () => this.postQuizResults()
    });
  }
}
