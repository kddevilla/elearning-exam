import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Utilities } from '../utils/utility.service';
import { FormControl, FormGroup } from '@angular/forms';
import { QuizAssessmentComponent } from './quiz-assessment.component';

describe('QuizAssessmentComponent', () => {
  let component: QuizAssessmentComponent;
  let fixture: ComponentFixture<QuizAssessmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizAssessmentComponent],
      providers: [
        Utilities,
        HttpClient,
        HttpHandler,
        FormControl,
        FormGroup
      ]
    });
    fixture = TestBed.createComponent(QuizAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
