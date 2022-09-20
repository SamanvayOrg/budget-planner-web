import {useEffect} from 'react';
import {allMunicipalityDetailsSelector, fetchMunicipalityDetails} from '../slices/municipalityReducer';
import {useDispatch, useSelector} from 'react-redux';
import * as xlsx from 'xlsx/xlsx.mjs';
import _ from "lodash";


export const MunicipalityName = () => {
    const dispatch = useDispatch();
    const {currentMunicipality} = useSelector(allMunicipalityDetailsSelector)
    useEffect(() => {
        dispatch(fetchMunicipalityDetails());
    }, [dispatch]);
    return currentMunicipality ? currentMunicipality.name + ' ' + currentMunicipality.cityClass + ' ' : ''
}


export const downloadInExcel = (fileName, data, headers) => {
    //set dynamic column width
    function fitToColumn(headers) {
        // get maximum character of each column
        return headers[0].map((a, i) => ({wch: Math.max(...headers.map(a2 => a2[i] ? a2[i].toString().length : 0))}));
    }

    let wb = xlsx.utils.book_new(),
        ws = xlsx.utils.json_to_sheet(data);
    ws['!cols'] = fitToColumn(headers);
    xlsx.utils.sheet_add_aoa(ws, headers);
    xlsx.utils.book_append_sheet(wb, ws, fileName);
    xlsx.writeFile(wb, `${fileName}.xlsx`);
}


export const currentYearBudget = (budgets, year) => {
    return _.chain(budgets)
        .filter((e) => e.budgetYear === year)
        .first()
        .value();
}
export const prevYearBudget = (budgets, year) => {
    return _.chain(budgets)
        .filter((e) => e.budgetYear === `${year.substring(0, 4) - 1}-${year.substring(7, 5) - 1}`)
        .first()
        .value();
}
