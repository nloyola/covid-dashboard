import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BarChartData, Report } from '@app/models';
import { DEFAULT_THEME as baseTheme } from '@nebular/theme';

@Component({
  selector: 'app-patient-gender-card',
  template: '<app-bar-chart-card [heading]="heading" [data]="data"></app-bar-chart-card>'
})
export class PatientGenderCardComponent implements OnInit, OnChanges {
  @Input() report: Report;

  heading = 'Gender';
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

    const gender = this.report.testResults.gender;

    this.data = {
      barData: [
        {
          label: 'Positive',
          colors: [baseTheme.variables.primaryLight, baseTheme.variables.primary],
          values: [
            {
              label: 'Unknown',
              value: gender.unknown.positiveCount,
              percent: Math.round((100 * gender.unknown.positiveCount) / this.report.patientCount)
            },
            {
              label: 'Other',
              value: gender.other.positiveCount,
              percent: Math.round((100 * gender.other.positiveCount) / this.report.patientCount)
            },
            {
              label: 'Male',
              value: gender.male.positiveCount,
              percent: Math.round((100 * gender.male.positiveCount) / this.report.patientCount)
            },
            {
              label: 'Female',
              value: gender.female.positiveCount,
              percent: Math.round((100 * gender.female.positiveCount) / this.report.patientCount)
            }
          ]
        },
        {
          label: 'Negative',
          colors: [baseTheme.variables.dangerLight, baseTheme.variables.danger],
          values: [
            {
              label: 'Unknown',
              value: gender.unknown.negativeCount,
              percent: Math.round((100 * gender.unknown.negativeCount) / this.report.patientCount)
            },
            {
              label: 'Other',
              value: gender.other.negativeCount,
              percent: Math.round((100 * gender.other.negativeCount) / this.report.patientCount)
            },
            {
              label: 'Male',
              value: gender.male.negativeCount,
              percent: Math.round((100 * gender.male.negativeCount) / this.report.patientCount)
            },
            {
              label: 'Female',
              value: gender.female.negativeCount,
              percent: Math.round((100 * gender.female.negativeCount) / this.report.patientCount)
            }
          ]
        }
      ]
    };
  }
}
