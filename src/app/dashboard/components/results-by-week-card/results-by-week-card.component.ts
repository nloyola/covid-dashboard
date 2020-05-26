import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { Report, BarChartData } from '@app/models';
import { DEFAULT_THEME as baseTheme } from '@nebular/theme';

@Component({
  selector: 'app-results-by-week-card',
  template: '<app-bar-chart-card [heading]="heading" [data]="data"></app-bar-chart-card>'
})
export class ResultsByWeekCardComponent implements OnInit, OnChanges {
  @Input() report: Report;
  heading = 'Test Results By Week';
  data: BarChartData;

  constructor() {}

  ngOnInit(): void {
    this.initData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.report && !changes.report.isFirstChange()) {
      this.report = changes.report.currentValue;
      this.initData();
    }
  }

  private initData() {
    if (this.report === undefined) {
      return;
    }

    const resultsByWeek = this.report.testResults.resultsByWeek.weeks;
    const sortedWeeks = Object.keys(resultsByWeek).sort();
    const barData = [
      {
        label: 'Positive',
        colors: [baseTheme.variables.primaryLight, baseTheme.variables.primary],
        values: sortedWeeks.map((week) => ({
          label: week,
          value: resultsByWeek[week].positiveCount,
          percent: Math.round((100 * resultsByWeek[week].positiveCount) / this.report.patientCount)
        }))
      },
      {
        label: 'Negative',
        colors: [baseTheme.variables.dangerLight, baseTheme.variables.danger],
        values: sortedWeeks.map((week) => ({
          label: week,
          value: resultsByWeek[week].negativeCount,
          percent: Math.round((100 * resultsByWeek[week].negativeCount) / this.report.patientCount)
        }))
      }
    ];
    this.data = { barData };
  }
}
