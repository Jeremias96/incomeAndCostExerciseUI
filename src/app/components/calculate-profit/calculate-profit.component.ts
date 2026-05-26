import { Component, inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
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
    MatTableModule,
    MatSortModule
  ],
  templateUrl: './calculate-profit.component.html',
  styleUrls: ['./calculate-profit.component.scss']
})
export class CalculateProfitComponent implements OnInit, AfterViewInit {

  private readonly fb = inject(FormBuilder);
  private readonly profitService = inject(ProfitLossService);

  displayedColumns: string[] = [
    'income',
    'totalCosts',
    'profit'
  ];

  dataSource = new MatTableDataSource<ProfitLoss>([]);
  loading = false;

  @ViewChild(MatSort)
  sort!: MatSort;

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
      null,
      [Validators.required, Validators.min(0)]
    ]
  });

  ngOnInit(): void {
    this.loadProfits();
  }

  ngAfterViewInit(): void {

  this.dataSource.sort = this.sort;

  this.dataSource.sortingDataAccessor = (
    item: ProfitLoss,
    property: string
  ): string | number => {

    switch (property) {

      case 'income':
        return item.income.incomeValue;

      case 'totalCosts':
        return (
          item.cost.costValue
          +
          item.cost.additionalCostValue
        );

      case 'profit':
        return item.calculatedProfitOrLoss;

      default:
        return item[property as keyof ProfitLoss] as number;
    }
  };
}

  loadProfits(): void {
    this.profitService
      .getAllProfits()
      .subscribe({
        next: (profits) => {
          this.dataSource.data = profits;
          this.dataSource.sort = this.sort;
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
          this.form.reset();
          this.loading = false;
        },

        error: (error) => {
          console.error(error);
          this.loading = false;
        }
      });
  }

}