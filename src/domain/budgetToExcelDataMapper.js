import {fromContract, getBudgetView} from "./index";
import _ from "lodash"
import {downloadInExcel} from "./functions";

const budgetToExcelDataMapper = (budget, headers) => {
    const budgetView = getBudgetView(fromContract(budget));
    let excelData = [];
    _.forEach(budgetView, budgetLine => {
        let singleExcelLine = [];
        if (!_.isEqual(budgetLine[1].className, 'Spreadsheet-addNewLineBox')) {
            _.forEach(budgetLine, singleItem => {
                singleExcelLine.push(singleItem.value);
            });
            excelData.push({...singleExcelLine});
        }
    });
    downloadInExcel('Budget', excelData, [headers])
}
export default budgetToExcelDataMapper;