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
        t(`${getBudgetYearString(year, 4)} Actuals`),
        t(`${getBudgetYearString(year, 3)} Actuals`),
        t(`${getBudgetYearString(year, 2)} Actuals`),
        t(`${getBudgetYearString(year, 1)} Actuals for 8 months`),
        t(`${getBudgetYearString(year, 1)} Probables for remaining 4 months`),
        t(`${getBudgetYearString(year, 0)} Budgeted amount`),
        t(`Actions`)
    ]);
export {headers, getBudgetYearString}