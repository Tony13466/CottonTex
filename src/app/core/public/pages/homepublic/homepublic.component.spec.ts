import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepublicComponent } from './homepublic.component';

describe('HomepublicComponent', () => {
  let component: HomepublicComponent;
  let fixture: ComponentFixture<HomepublicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomepublicComponent]
    });
    fixture = TestBed.createComponent(HomepublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
