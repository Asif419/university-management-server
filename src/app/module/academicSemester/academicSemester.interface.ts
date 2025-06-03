export type TMonths = 
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type TAcademicSemesterName = 'Autumn' | 'Summer' | 'Fall';

export type TAcademisSemesterCode = '01' | '02' | '03';

export type TAcademicSemester = {
    name: TAcademicSemesterName;
    code: TAcademisSemesterCode;
    year: string;
    startMonth: TMonths;
    endMonth: TMonths;
};

export type TAcademicSemesterNameCodeMapper = {
    [key: string]: string;
};