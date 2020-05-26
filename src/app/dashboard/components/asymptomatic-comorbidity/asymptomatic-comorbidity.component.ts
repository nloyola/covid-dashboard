import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { Report, PieChartData } from '@app/models';

@Component({
  selector: 'app-asymptomatic-comorbidity',
  template: '<app-patients-pie-card [header]="header" [data]="data"></app-patients-pie-card>'
})
export class AsymptomaticComorbidityComponent implements OnInit, OnChanges {
  @Input() report: Report;
  header = 'Asymptomatic Comorbidity';
  data: PieChartData;

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

    const data = this.report.testResults.asymptomaticComorbidity;
    const sum = data.comorbidityCount + data.noComorbidityCount;
    this.data = [
      {
        label: 'Comorbidity',
        value: data.comorbidityCount,
        percent: Math.round((100 * data.comorbidityCount) / sum)
      },
      {
        label: 'No Comorbidity',
        value: data.noComorbidityCount,
        percent: Math.round((100 * data.noComorbidityCount) / sum)
      }
    ];
  }
}
