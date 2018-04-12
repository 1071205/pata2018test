import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAnimaisComponent } from './edit-animais.component';

describe('CreateAnimaisComponent', () => {
  let component: EditAnimaisComponent;
  let fixture: ComponentFixture<EditAnimaisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAnimaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAnimaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
