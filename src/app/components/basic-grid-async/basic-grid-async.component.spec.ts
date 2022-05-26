import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicGridAsyncComponent } from './basic-grid-async.component';

describe('BasicGridAsyncComponent', () => {
  let component: BasicGridAsyncComponent;
  let fixture: ComponentFixture<BasicGridAsyncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicGridAsyncComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicGridAsyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
