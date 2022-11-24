import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailprojectComponent } from './detailproject.component';

describe('DetailprojectComponent', () => {
  let component: DetailprojectComponent;
  let fixture: ComponentFixture<DetailprojectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailprojectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
