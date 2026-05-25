import { Component } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CalculateProfitComponent } from '../components/calculate-profit/calculate-profit.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    SidebarComponent,
    CalculateProfitComponent
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {}