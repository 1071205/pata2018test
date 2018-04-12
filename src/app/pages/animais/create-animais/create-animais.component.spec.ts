import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAnimaisComponent } from './create-animais.component';

describe('CreateAnimaisComponent', () => {
  let component: CreateAnimaisComponent;
  let fixture: ComponentFixture<CreateAnimaisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAnimaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAnimaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
