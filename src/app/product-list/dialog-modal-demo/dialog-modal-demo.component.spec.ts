import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogModalDemo } from './dialog-modal-demo.component';

describe('DialogModalDemoComponent', () => {
  let component: DialogModalDemo;
  let fixture: ComponentFixture<DialogModalDemo>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogModalDemo]
    });
    fixture = TestBed.createComponent(DialogModalDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
