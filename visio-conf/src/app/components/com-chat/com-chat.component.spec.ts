import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComChatComponent } from './com-chat.component';

describe('ComChatComponent', () => {
  let component: ComChatComponent;
  let fixture: ComponentFixture<ComChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComChatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
