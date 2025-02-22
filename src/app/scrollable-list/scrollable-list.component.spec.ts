import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollableListComponent } from './scrollable-list.component';

describe('ScrollableListComponent', () => {
  let component: ScrollableListComponent;
  let fixture: ComponentFixture<ScrollableListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollableListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrollableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
