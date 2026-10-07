import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DettaglioCocktail } from './dettaglio-cocktail';

describe('DettaglioCocktail', () => {
  let component: DettaglioCocktail;
  let fixture: ComponentFixture<DettaglioCocktail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DettaglioCocktail],
    }).compileComponents();

    fixture = TestBed.createComponent(DettaglioCocktail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
