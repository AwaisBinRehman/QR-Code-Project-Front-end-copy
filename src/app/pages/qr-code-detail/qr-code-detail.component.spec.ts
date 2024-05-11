import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrCodeDetailComponent } from './qr-code-detail.component';

describe('QrCodeDetailComponent', () => {
  let component: QrCodeDetailComponent;
  let fixture: ComponentFixture<QrCodeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrCodeDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QrCodeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
