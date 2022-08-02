import {t} from "i18next";


const getBudgetYearString = (yearString, minus = 0) => {
    const year = Number.parseInt(yearString.substring(0, 4));
    const actual = year - minus;
    const nextYear = actual + 1;
    return `${actual}-${nextYear}`
};

const headers = (year) => (
    [
        'Sr',
        t('Particulars'),
        t('Code Number'),
        `${getBudgetYearString(year, 4)} Actuals`,
        `${getBudgetYearString(year, 3)} Actuals`,
        `${getBudgetYearString(year, 2)} Actuals`,
        `${getBudgetYearString(year, 1)} Actuals for 8 months`,
        `${getBudgetYearString(year, 1)} Probables for remaining 4 months`,
        `${getBudgetYearString(year, 0)} Budgeted amount`,
    ]);
export {headers, getBudgetYearString}