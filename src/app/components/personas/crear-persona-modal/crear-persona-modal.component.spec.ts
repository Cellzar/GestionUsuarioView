import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPersonaModalComponent } from './crear-persona-modal.component';

describe('CrearPersonaModalComponent', () => {
  let component: CrearPersonaModalComponent;
  let fixture: ComponentFixture<CrearPersonaModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearPersonaModalComponent]
    });
    fixture = TestBed.createComponent(CrearPersonaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
