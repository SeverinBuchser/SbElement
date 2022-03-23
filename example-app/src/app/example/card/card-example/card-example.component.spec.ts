import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpansionCardExampleComponent } from './expansion-card-example.component';

describe('ExpansionCardExampleComponent', () => {
  let component: ExpansionCardExampleComponent;
  let fixture: ComponentFixture<ExpansionCardExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpansionCardExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpansionCardExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
