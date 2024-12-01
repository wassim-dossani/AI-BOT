import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SignalService } from '../services/signal.service';
import { ChartDataService, CandleData } from '../services/chart-data.service';

@Component({
  selector: 'app-home',
  template: `
    <div class="home-container">
      <form [formGroup]="botForm" (ngSubmit)="onSubmit()">
        <mat-form-field>
          <mat-label>Symbol</mat-label>
          <mat-select formControlName="symbol">
            <mat-option *ngFor="let symbol of symbols" [value]="symbol">{{symbol}}</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field>
          <mat-label>Time Frame</mat-label>
          <mat-select formControlName="timeframe">
            <mat-option *ngFor="let tf of timeframes" [value]="tf">{{tf}}</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field>
          <mat-label>Confidence Level (%)</mat-label>
          <input matInput type="number" formControlName="confidence" min="0" max="100">
        </mat-form-field>

        <button mat-raised-button color="primary" type="submit">Generate Signal</button>
      </form>

      <mat-card *ngIf="signal" class="signal-card">
        <mat-card-header>
          <mat-card-title>Signal</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p>{{signal}}</p>
        </mat-card-content>
      </mat-card>

      <app-candlestick-chart [data]="chartData"></app-candlestick-chart>

      <app-ai-bot></app-ai-bot>
    </div>
  `,
  styles: [`
    .home-container {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    form {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
    }
    mat-form-field {
      flex: 1 1 200px;
    }
    button {
      align-self: flex-end;
    }
    .signal-card {
      background-color: #e8eaf6;
    }
  `]
})
export default class HomeComponent implements OnInit {
  botForm: FormGroup;
  symbols: string[] = ['EUR/USD', 'GBP/USD', 'USD/JPY', 'AAPL', 'GOOGL', 'MSFT'];
  timeframes: string[] = ['1m', '5m', '15m', '1h', '4h', '1d'];
  signal: string = '';
  chartData: CandleData[] = [];

  constructor(
    private fb: FormBuilder,
    private signalService: SignalService,
    private chartDataService: ChartDataService
  ) {
    this.botForm = this.fb.group({
      symbol: ['EUR/USD'],
      timeframe: ['15m'],
      confidence: [90]
    });
  }

  ngOnInit() {
    this.onSubmit();
  }

  onSubmit() {
    if (this.botForm.valid) {
      const { symbol, timeframe, confidence } = this.botForm.value;
      this.signalService.getSignal(symbol, timeframe, confidence).subscribe(
        signal => this.signal = signal
      );
      this.chartDataService.getChartData(symbol, timeframe).subscribe(
        data => this.chartData = data
      );
    }
  }
}

