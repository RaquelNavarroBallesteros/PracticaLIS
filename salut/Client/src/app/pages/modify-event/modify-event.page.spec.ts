import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModifyEventPage } from './modify-event.page';

describe('ModifyEventPage', () => {
  let component: ModifyEventPage;
  let fixture: ComponentFixture<ModifyEventPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyEventPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModifyEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
