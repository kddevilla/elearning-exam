import { Component, OnInit, Input } from '@angular/core';

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

  constructor () {}

  ngOnInit(): void {
    this.quizRes = parseFloat(this.score);
    this.evaluateScore();
    this.postQuizResults();
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
    let scoreScale: Array<any> = [
      {
        score: 0,
        scale: 'Low Score',
        mRecomCourse: 'B2 First / C1 Advance'
      },
      {
        score: 70,
        scale: 'Average Score',
        mRecomCourse: 'B2 First for Schools'
      },
      {
        score: 85,
        scale: 'High Score',
        mRecomCourse: 'B1 Preliminary for Schools / A2 Key for Schools'
      }
    ];

    scoreScale.forEach((s: any, index: number) => {
      if (index < (scoreScale.length - 1) && this.quizRes >= s.score && this.quizRes < scoreScale[index + 1].score) {
        this.scoreEvaluation = s.scale;
        this.courseRecommendation = s.mRecomCourse;
      }
      else if (index == (scoreScale.length - 1) && this.quizRes >= s.score) {
        this.scoreEvaluation = s.scale;
        this.courseRecommendation = s.mRecomCourse;
      }
    });
  }
}
