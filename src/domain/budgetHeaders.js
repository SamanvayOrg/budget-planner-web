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
        `${getBudgetYearString(year, 4)} `+t(`Actuals`),
        `${getBudgetYearString(year, 3)} `+t(`Actuals`),
        `${getBudgetYearString(year, 2)} `+t(`Actuals`),
        `${getBudgetYearString(year, 1)} `+t(`Actuals for 8 months`),
        `${getBudgetYearString(year, 1)} `+t(`Probables for remaining 4 months`),
        `${getBudgetYearString(year, 0)} `+t(`Budgeted amount`),
        t(`Actions`)
    ]);
export {headers, getBudgetYearString}