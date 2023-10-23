import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';

import { QuizComponent } from './quiz-list/quiz.component';
import { QuizAssessmentComponent, SafeHtmlPipe } from './quiz-assessment/quiz-assessment.component';
import { QuizResultComponent } from './quiz-result/quiz-result.component';
import { Utilities } from './utils/utility.service';

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    QuizAssessmentComponent,
    SafeHtmlPipe,
    QuizResultComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ Utilities ],
  bootstrap: [AppComponent]
})
export class AppModule { }
