import { Component, Renderer2, Pipe, PipeTransform, OnInit } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import { FormControl, FormGroup } from '@angular/forms';

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
    private renderInput: Renderer2
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
    let qlist = {
      subject: 'English',
      qItems: [
        {
          type: 'multiple',
          question: 'The order of a basic positive sentence is?',
          answers: [
            'Object-Verb-Subject',
            'Verb-Object-Subject',
            'Subject-Verb-Object',
            'Subject-Object-Verb'
          ],
          cAnswer: 'Subject-Verb-Object'
        },
        {
          type: 'fill',
          question: 'The <input id="{id}" type="textbox"> is always included in a predicate of a sentence.',
          cAnswer: 'verb'
        },
        {
          type: 'multiple',
          question: 'An independent clause contains?',
          answers: [
            'a verb and an object',
            'a subject and a verb',
            'a subject and an object',
            'a noun and an object'
          ],
          cAnswer: 'a subject and a verb'
        },
        {
          type: 'fill',
          question: 'The <input id="{id}" type="textbox"> performs the verb\'s action.',
          cAnswer: 'subject'
        },
        {
          type: 'fill',
          question: 'The <input id="{id}" type="textbox"> recieves the verb\'s action.',
          cAnswer: 'object'
        },
        {
          type: 'fill',
          question: '"David writes the best songs." The direct object is <input id="{id}" type="textbox">.',
          cAnswer: 'David'
        },
        {
          type: 'fill',
          question: 'It is a/an <input id="{id}" type="textbox"> verb if a verb\'s action is directed at a direct object.',
          cAnswer: 'transitive'
        },
        {
          type: 'fill',
          question: 'Possessive is a value of the grammatical category called <input id="{id}" type="textbox">.',
          cAnswer: 'case'
        },
        {
          type: 'multiple',
          question: 'We started ________ dinner without you.',
          answers: [
            'eating',
            'to eat',
            'to ate',
            'eating/to eat'
          ],
          cAnswer: 'eating/to eat'
        },
        {
          type: 'multiple',
          question: 'My grandmother prefers ________ science fiction books.',
          answers: [
            'read',
            'reading',
            'to read',
            'reading/to read'
          ],
          cAnswer: 'reading/to read'
        },
        {
          type: 'multiple',
          question: 'I can\'t imagine ________ my own house.',
          answers: [
            'buying',
            'to buy',
            'bought',
            'buying/to buy'
          ],
          cAnswer: 'buying'
        },
        {
          type: 'multiple',
          question: 'I used ________ that television show all the time.',
          answers: [
            'watch',
            'watching',
            'to watch',
            'watching/to watch'
          ],
          cAnswer: 'to watch'
        },
        {
          type: 'multiple',
          question: 'An adverb is a word that can modify',
          answers: [
            'verbs',
            'adjective',
            'adverb',
            'verbs/adjective/adverb'
          ],
          cAnswer: 'verbs/adjective/adverb'
        },
        {
          type: 'multiple',
          question: 'An auxiliary verb is used with',
          answers: [
            'a proper noun',
            'a main verb',
            'an adjective',
            'a pronoun'
          ],
          cAnswer: 'a main verb'
        },
        {
          type: 'multiple',
          question: 'A compound-complex sentence consists of',
          answers: [
            'one or more independent thoughts and one or more dependent clauses.',
            'two or more independent clauses and one or more dependent clauses.',
            'one or more independent clauses and two or more dependent clauses.',
            'two or more independent thoughts and two or more dependent clauses.'
          ],
          cAnswer: 'two or more independent clauses and one or more dependent clauses.'
        }
      ]
    };
    
    this.quizItems = this.randomizeQuestions(qlist.qItems);
    
    this.initFormHandler = true;
    this.processQuizItems();
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
    this.setFormVal = true;
    this.processQuizItems();

    this.checkAnswer = true;
    this.processQuizItems();

    this.evaluateScore = true;
    this.assessmentResultDetails = JSON.stringify(this.answerLog);
  }
}
