import {Typography} from "@mui/material";
import {useTranslation} from "react-i18next";

const DistributionItem = ({amount, name, percent, logo, subName}) => {
    const {t} = useTranslation();
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: 100,
            paddingLeft: "2px"
        }}>
            <Typography style={{color: "black", fontWeight: "bold", fontFamily: "Lato"}}>{t(amount)} </Typography>
            <Typography style={{color: "black", fontWeight: "bold", fontFamily: "Lato"}}>{t('Lakhs')}</Typography>
            <br/>
            <div style={{
                height: 80,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Typography style={{color: "#089CA9", fontFamily: "Lato"}}>{t(name)}</Typography>
                <Typography style={{color: "#089CA9", fontSize: "12px", fontFamily: "Lato"}}>{t(subName)}</Typography>
            </div>
            {logo}
            <Typography style={{color: "black", fontWeight: "bold", fontFamily: "Lato"}}>{t(percent)}%</Typography>

        </div>
    )

}
export default DistributionItem;
