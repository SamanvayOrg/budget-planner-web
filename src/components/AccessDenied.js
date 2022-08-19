import ResponsiveAppBar from "./ResponsiveAppBar";
import React from "react";
import {makeStyles} from "@mui/styles";
import Text from "./Text";

const useStyles = makeStyles(theme => ({
    mainContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "start",
        paddingTop: "64px",
        fontFamily: "Lato",
        fontStyle: "normal",
        color: "#616161",
        fontWeight: "700",
        marginTop: "25px",

    }
}));

const AccessDenied = () => {
    const classes = useStyles();
    return (
        <div>
            <ResponsiveAppBar/>
            <div className={classes.mainContainer}>
                <center><Text style={{fontSize: "25px"}} value={'Access denied'}/></center>
            </div>
        </div>
    )
}
export default AccessDenied;