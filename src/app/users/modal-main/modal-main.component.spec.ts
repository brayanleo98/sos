import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMainComponent } from './modal-main.component';

describe('ModalMainComponent', () => {
  let component: ModalMainComponent;
  let fixture: ComponentFixture<ModalMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalMainComponent]
    });
    fixture = TestBed.createComponent(ModalMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
