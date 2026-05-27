import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  HttpClientTestingModule
} from '@angular/common/http/testing';

import { of } from 'rxjs';

import { CalculateProfitComponent }
from './calculate-profit.component';

import { ProfitLossService }
from '../../service/profitloss.service';

import { NoopAnimationsModule }
from '@angular/platform-browser/animations';

describe('CalculateProfitComponent', () => {

  let component: CalculateProfitComponent;

  let fixture: ComponentFixture<CalculateProfitComponent>;

  let profitService: jasmine.SpyObj<ProfitLossService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj(
      'ProfitService',
      [
        'getAllProfits',
        'calculateProfit'
      ]
    );

    await TestBed.configureTestingModule({
      imports: [
        CalculateProfitComponent,
        HttpClientTestingModule,
        NoopAnimationsModule
      ],
      providers: [
        {
          provide: ProfitLossService,
          useValue: spy
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(
      CalculateProfitComponent
    );

    component = fixture.componentInstance;

    profitService = TestBed.inject(
      ProfitLossService
    ) as jasmine.SpyObj<ProfitLossService>;

    profitService.getAllProfits.and.returnValue(
      of([])
    );

    fixture.detectChanges();
  });

  it('should create', () => {

    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {

    expect(component.form).toBeTruthy();

    expect(
      component.form.get('incomeValue')?.value
    ).toBeNull();

    expect(
      component.form.get('additionalCostValue')?.value
    ).toBeNull();
  });

  it('should mark form invalid when empty', () => {

    component.form.patchValue({
      incomeValue: null,
      costValue: null
    });

    expect(component.form.invalid).toBeTrue();
  });

  it('should submit valid form', () => {

    profitService.calculateProfit.and.returnValue(
      of({
        id: 1,
        calculatedProfitOrLoss: 500,
        income: {
          id: 1,
          incomeValue: 1000
        },
        cost: {
          id: 1,
          costValue: 300,
          additionalCostValue: 200
        }
      })
    );

    component.form.patchValue({
      incomeValue: 1000,
      costValue: 300,
      additionalCostValue: 200
    });

    component.onSubmit();

    expect(
      profitService.calculateProfit
    ).toHaveBeenCalled();
  });

  it('should load profits on init', () => {

    component.ngOnInit();

    expect(
      profitService.getAllProfits
    ).toHaveBeenCalled();
  });
});