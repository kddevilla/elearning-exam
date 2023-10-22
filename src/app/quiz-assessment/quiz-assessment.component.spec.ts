import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizAssessmentComponent } from './quiz-assessment.component';

describe('QuizAssessmentComponent', () => {
  let component: QuizAssessmentComponent;
  let fixture: ComponentFixture<QuizAssessmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizAssessmentComponent]
    });
    fixture = TestBed.createComponent(QuizAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
