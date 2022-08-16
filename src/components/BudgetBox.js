import Box from "@mui/material/Box";
import {makeStyles} from "@mui/styles";
import ActionButton from "./ActionButton";
import {useTranslation} from "react-i18next";
import React from "react";

const styleSheets = makeStyles(theme => ({
    box: {
        display: "flex",
        flexDirection: "row",
        boxSizing: "border-box",
        width: "100%",
        background: " #FFFFFF",
        border: "1px solid #DEDEDE",
        borderRadius: "3px",
        justifyContent: "space-between",
        marginTop: "2%",
        gap: "2vw",
        paddingTop: "1%",
        paddingBottom: "1%",
        fontSize: "15px",
        fontWeight: "400",
        fontFamily: "Lato",


    }, insideBox: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        gap: "0.5vw",
        color: "#212121",
        fontSize: "19px",
        marginLeft: "1%",
    }, lastUpdateText: {
        display: "flex",

        fontSize: "11px",
        textTransform: "uppercase",
        color: "#616161",
    }, actionButtons: {
        display: "flex",
        justifyContent: "flex-end",
        fontSize: "11px",
        textTransform: "uppercase",
        color: "#616161",
        marginRight: "1%",
    }

}))
const BudgetBox = ({versionName, lastUpdated, index, firstButtonAction, secondButtonAction}) => {
    const {t} = useTranslation();
    const classes = styleSheets();

    
    return (
        <Box className={classes.box} key={index}>
			<span className={classes.insideBox}>
				<div className={classes.lastUpdateText}>
					{lastUpdated}
				</div>

				{versionName}
			</span>
            <span className={classes.actionButtons}>
				<ActionButton style={{marginLeft: '10px'}} key={index.key} onClick={firstButtonAction}  label={t("DOWNLOAD")}
                              id={"smallActionButton"}/>

				<ActionButton style={{marginLeft: '10px'}} key={index} onClick={secondButtonAction} label={t("EDIT BUDGET")}
                              id={"smallActionButton"}/>
			</span>
        </Box>

    )
}
export default BudgetBox;