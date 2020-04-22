import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LlistaTractamentsPage } from './llista-tractaments.page';

describe('LlistaTractamentsPage', () => {
  let component: LlistaTractamentsPage;
  let fixture: ComponentFixture<LlistaTractamentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LlistaTractamentsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LlistaTractamentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
