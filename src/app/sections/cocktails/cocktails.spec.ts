import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Cocktails } from './cocktails';

describe('Cocktails', () => {
  let component: Cocktails;
  let fixture: ComponentFixture<Cocktails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cocktails],
    }).compileComponents();

    fixture = TestBed.createComponent(Cocktails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
