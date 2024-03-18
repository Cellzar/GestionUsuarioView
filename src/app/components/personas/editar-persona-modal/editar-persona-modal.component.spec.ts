import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPersonaModalComponent } from './editar-persona-modal.component';

describe('EditarPersonaModalComponent', () => {
  let component: EditarPersonaModalComponent;
  let fixture: ComponentFixture<EditarPersonaModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarPersonaModalComponent]
    });
    fixture = TestBed.createComponent(EditarPersonaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
