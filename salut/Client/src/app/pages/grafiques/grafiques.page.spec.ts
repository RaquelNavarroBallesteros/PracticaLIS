import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GrafiquesPage } from './grafiques.page';

describe('GrafiquesPage', () => {
  let component: GrafiquesPage;
  let fixture: ComponentFixture<GrafiquesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrafiquesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GrafiquesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
