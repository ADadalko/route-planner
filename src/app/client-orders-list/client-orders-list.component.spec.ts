import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientOrdersListComponent } from './client-orders-list.component';

describe('ClientOrdersListComponent', () => {
  let component: ClientOrdersListComponent;
  let fixture: ComponentFixture<ClientOrdersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientOrdersListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientOrdersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
