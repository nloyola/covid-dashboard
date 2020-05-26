import { Deserializable } from './deserializable.model';

export interface TestResultCount {
  readonly positiveCount: number;
  readonly negativeCount: number;
}

export interface AgeDistribution {
  readonly [key: string]: TestResultCount[];
}

export interface GenderReport {
  readonly male: TestResultCount;
  readonly female: TestResultCount;
  readonly other: TestResultCount;
  readonly unknown: TestResultCount;
}

export interface ComorbidityReport {
  cld: TestResultCount;
  diabetes: TestResultCount;
  cvd: TestResultCount;
  priorMyocardialInfarctio: TestResultCount;
  priorCoronaryArteryBypa: TestResultCount;
  priorPercutaneousCoronar: TestResultCount;
  renaldis: TestResultCount;
  liverdis: TestResultCount;
  immsupp: TestResultCount;
  hyp: TestResultCount;
  hypertension: TestResultCount;
  hiv: TestResultCount;
  cerebrovascularDisease: TestResultCount;
  priorStroke: TestResultCount;
  obesity: TestResultCount;
  dyslipidemia: TestResultCount;
  pregnant: TestResultCount;
  smokeCurr: TestResultCount;
  smokeFormer: TestResultCount;
  hasOtherDisease: TestResultCount;
  hba1c: TestResultCount;
}

export interface AsymptomaticComorbidity {
  readonly comorbidityCount: number;
  readonly noComorbidityCount: number;
}

export interface GenderCounts {
  readonly male: number;
  readonly female: number;
  readonly other: number;
  readonly genderUnknown: number;
}

export interface PositiveGenderByAge {
  readonly categories: GenderCounts[];
}

export interface ResulsByWeeks {
  readonly [key: string]: TestResultCount;
}

export interface ResultsByWeekReport {
  weeks: ResulsByWeeks;
}

export interface TestReport {
  readonly ageDistribution: AgeDistribution;
  readonly gender: GenderReport;
  readonly asymptomatic: TestResultCount;
  readonly symptomatic: TestResultCount;
  readonly comorbidity: ComorbidityReport;
  readonly asymptomaticComorbidity: AsymptomaticComorbidity;
  readonly positiveGenderByAge: PositiveGenderByAge;
  readonly resultsByWeek: ResultsByWeekReport;
}

export interface IReport {
  readonly patientCount: number;
  readonly testResults: TestReport;
}

export class Report implements Deserializable {
  readonly patientCount: number;
  readonly testResults: TestReport;

  deserialize(input: any): this {
    const { patientCount, testResults } = input;
    Object.assign(this, {
      patientCount: patientCount,
      testResults: {
        ageDistribution: testResults.ageDistribution,
        gender: testResults.gender,
        symptomatic: testResults.symptomatic,
        asymptomatic: testResults.asymptomatic,
        comorbidity: testResults.comorbidity,
        asymptomaticComorbidity: testResults.asymptomaticComorbidity,
        positiveGenderByAge: testResults.positiveGenderByAge,
        resultsByWeek: testResults.resultsByWeek
      }
    });

    // Object.keys(testResults.ageDistribution.categories).forEach((c) => {
    //   this.testResults.ageDistribution.categories[c] = {
    //     positive: testResults.ageDistribution.categories[c].positiveCount,
    //     negative: testResults.ageDistribution.categories[c].negativeCount
    //   };
    // });

    return this;
  }
}
