import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuizComponent } from './quiz-list/quiz.component';
import { QuizAssessmentComponent } from './quiz-assessment/quiz-assessment.component';

const routes: Routes = [
  { path: 'quiz', component: QuizComponent },
  { path: 'quiz-assessment', component: QuizAssessmentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
