import { Component, Renderer2, Pipe, PipeTransform, OnInit } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import { FormControl, FormGroup } from '@angular/forms';
import { Utilities } from '../utils/utility.service';
import { environment } from "../../environments/environment";

const quizUrl = environment.apiBaseUrl + environment.quizFunction.path;

@Pipe({ name: "safeHtml" })
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: any) {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}

@Component({
  selector: 'app-quiz-assessment',
  templateUrl: './quiz-assessment.component.html',
  styleUrls: ['./quiz-assessment.component.scss']
})
export class QuizAssessmentComponent implements OnInit {

  constructor(
    private renderInput: Renderer2,
    private utils: Utilities
  ) {}

  quizItems: any = [];
  quizForm: FormGroup = new FormGroup({});
  setFormVal: boolean = false;
  initFormHandler: boolean = false;
  checkAnswer: boolean = false;
  quizResults: number = 0;
  evaluateScore: boolean = false;
  answerLog: any = {};
  assessmentResultDetails: string = '';

  ngOnInit(): void{
    this.setQuizItems();
  }

  setQuizItems(): void {
    let getQuizItemsEndpoint = quizUrl + environment.quizFunction.actioncd.getquizitems;

    this.utils.httpPostRequest(getQuizItemsEndpoint, {subject: 'English'}).subscribe({
      next: (val: any) => {
        this.quizItems = val.response as Array<any>;
        this.initFormHandler = true;
        this.processQuizItems();
      },
      error: (err: Error) => console.error('Observer got an error: ' + err)
    });
  }

  processQuizItems(): void {
    if (this.checkAnswer) {
      this.answerLog['assessmentResults'] = [];
    }

    this.quizItems.forEach((q: any, index: number) => {
      let qnum: string = 'q' + (index + 1);

      //initializes form control of each question
      if (this.initFormHandler) this.quizForm.addControl(qnum, new FormControl(''));

      if (q.type == 'fill') {
        //sets the value of each fill in the blank questions, else it just replaces id's of blank inputs to make it dynamic
        if (this.setFormVal) this.quizForm.controls[qnum].setValue((<HTMLInputElement>this.renderInput.selectRootElement('#' + qnum)).value);
        else this.quizItems[index].question = q.question.replace('{id}', qnum);
      }

      //checks the answer for each question
      if (this.checkAnswer) {
        let check:boolean = q.cAnswer === this.quizForm.controls[qnum].value;

        //add results for viewing
        this.answerLog.assessmentResults.push(
          {
            qnum: index + 1,
            question: q.question,
            answer: this.quizForm.controls[qnum].value,
            correctAnswer: q.cAnswer,
            result: check ? 'Correct': 'Incorrect'
          }
        );
        
        if (check) this.quizResults++;
      }
    });

    //computes score by percentage
    if(this.checkAnswer) {
      //add results for viewing
      this.answerLog['totalScore'] = { correctAnswers: this.quizResults };

      //update to percentage
      this.quizResults = parseFloat(((this.quizResults / this.quizItems.length) * 100).toFixed(2));

      //add results for viewing
      this.answerLog.totalScore['totalQuestions'] =  this.quizItems.length;
      this.answerLog.totalScore['percentage'] = this.quizResults + '%';
    }
    
    this.reset();
  }

  randomizeQuestions(questionList: Array<any>): Array<any>{
    questionList = this.randomizeItems(questionList)
    questionList.forEach((q: any, index: number) => {
      if (q.type == "multiple") {
        questionList[index].answers = this.randomizeItems(q.answers);
      }
    });
    
    return questionList;
  }

  randomizeItems(itemList: Array<any>): Array<any> {
    let currentIndex = itemList.length,  randomIndex;

    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [itemList[currentIndex], itemList[randomIndex]] = [itemList[randomIndex], itemList[currentIndex]];
    }

    return itemList;
  }

  reset(): void {
    this.initFormHandler = false;
    this.setFormVal = false;
    this.checkAnswer = false;
  }

  onSubmit(): void {
    console.log(this.quizForm.controls);
    this.setFormVal = true;
    this.processQuizItems();

    this.checkAnswer = true;
    this.processQuizItems();

    this.evaluateScore = true;
    this.assessmentResultDetails = JSON.stringify(this.answerLog);
  }
}
