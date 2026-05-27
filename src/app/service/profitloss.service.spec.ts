import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { TestBed } from '@angular/core/testing';
import { ProfitLossService } from './profitloss.service';
import { environment } from '../environments/environments';

describe('ProfitService', () => {

  let service: ProfitLossService;
  let httpMock: HttpTestingController;

  const apiUrl = `${environment.apiUrl}/profit`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(ProfitLossService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve all profit/loss calculations', () => {
    const mockResponse = [
      {
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
      }
    ];

    service
      .getAllProfits()
      .subscribe((response) => {
        expect(response.length).toBe(1);
        expect(
          response[0].calculatedProfitOrLoss
        ).toBe(500);
      });

    const request = httpMock.expectOne(apiUrl);
    expect(request.request.method).toBe('GET');

    request.flush(mockResponse);
  });

  it('should create a new profit calculation', () => {
    const requestBody = {
      incomeValue: 1000,
      costValue: 300,
      additionalCostValue: 200
    };
    const mockResponse = {
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
    };

    service
      .calculateProfit(requestBody)
      .subscribe((response) => {
        expect(
          response.calculatedProfitOrLoss
        ).toBe(500);
      });

    const request = httpMock.expectOne(apiUrl);

    expect(request.request.method).toBe('POST');
    expect(request.request.body)
      .toEqual(requestBody);

    request.flush(mockResponse);
  });
});