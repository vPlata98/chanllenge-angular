import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmeDetalleComponent } from './filme-detalle.component';

describe('FilmeDetalleComponent', () => {
  let component: FilmeDetalleComponent;
  let fixture: ComponentFixture<FilmeDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilmeDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmeDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
