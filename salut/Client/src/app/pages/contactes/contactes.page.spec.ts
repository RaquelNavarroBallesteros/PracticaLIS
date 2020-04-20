import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContactesPage } from './contactes.page';

describe('ContactesPage', () => {
  let component: ContactesPage;
  let fixture: ComponentFixture<ContactesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
