import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { HeaderComponent }
from './header.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

describe('HeaderComponent', () => {

  let component: HeaderComponent;

  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [
            HeaderComponent,
            NoopAnimationsModule
        ],
        providers: [
            provideRouter([])
        ]
    }).compileComponents();

    fixture = TestBed.createComponent(
      HeaderComponent
    );

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain logo link', () => {
    const compiled =
      fixture.nativeElement as HTMLElement;

    const link =
      compiled.querySelector('a');

    expect(link).toBeTruthy();
  });
});