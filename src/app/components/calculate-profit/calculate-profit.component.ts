import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { ProfitLossService } from '../../service/profitloss.service';
import { ProfitLoss } from '../../models/profitloss.model';

@Component({
  selector: 'app-calculate-profit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule
  ],
  templateUrl: './calculate-profit.component.html',
  styleUrls: ['./calculate-profit.component.scss']
})
export class CalculateProfitComponent implements OnInit {

  private readonly fb = inject(FormBuilder);
  private readonly profitService = inject(ProfitLossService);

  displayedColumns: string[] = [
    'income',
    'cost',
    'calculatedProfitOrLoss'
  ];

  calculatedProfitsOrLosses: ProfitLoss[] = [];
  loading = false;

  form: FormGroup = this.fb.group({
    incomeValue: [
      null,
      [Validators.required, Validators.min(0)]
    ],

    costValue: [
      null,
      [Validators.required, Validators.min(0)]
    ],

    additionalCostValue: [
      0,
      [Validators.required, Validators.min(0)]
    ]
  });

  ngOnInit(): void {
    this.loadProfits();
  }

  loadProfits(): void {
    this.profitService
      .getAllProfits()
      .subscribe({
        next: (profits) => {
          this.calculatedProfitsOrLosses = profits;
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;

    this.profitService
      .calculateProfit(this.form.value)
      .subscribe({
        next: () => {
          this.loadProfits();

          this.form.reset({
            additionalCostValue: 0
          });

          this.loading = false;
        },

        error: (error) => {
          console.error(error);
          this.loading = false;
        }
      });
  }

}