import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocEntryComponent } from './doc-entry.component';

describe('DocEntryComponent', () => {
  let component: DocEntryComponent;
  let fixture: ComponentFixture<DocEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
