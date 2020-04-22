import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SeguimentPage } from './seguiment.page';

describe('SeguimentPage', () => {
  let component: SeguimentPage;
  let fixture: ComponentFixture<SeguimentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeguimentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SeguimentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
