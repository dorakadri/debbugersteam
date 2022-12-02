import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocstestComponent } from './docstest.component';

describe('DocstestComponent', () => {
  let component: DocstestComponent;
  let fixture: ComponentFixture<DocstestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocstestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocstestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
