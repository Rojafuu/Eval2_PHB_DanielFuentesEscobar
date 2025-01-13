import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AleatoriaComponent } from './aleatoria.component';

describe('AleatoriaComponent', () => {
  let component: AleatoriaComponent;
  let fixture: ComponentFixture<AleatoriaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AleatoriaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AleatoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
