import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ProfitLoss } from '../models/profitloss.model';
import { ProfitLossCalculationRequest } from '../models/profitloss-calc-request.model';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProfitLossService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/profit`;

  calculateProfit(
    request: ProfitLossCalculationRequest
  ): Observable<ProfitLoss> {
    return this.http.post<ProfitLoss>(
      this.apiUrl,
      request
    );
  }

  getAllProfits(): Observable<ProfitLoss[]> {
    return this.http.get<ProfitLoss[]>(this.apiUrl);
  }

  //constructor(private readonly http: HttpClient) {}
}