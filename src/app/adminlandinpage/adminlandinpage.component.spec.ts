import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminlandinpageComponent } from './adminlandinpage.component';

describe('AdminlandinpageComponent', () => {
  let component: AdminlandinpageComponent;
  let fixture: ComponentFixture<AdminlandinpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminlandinpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminlandinpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
