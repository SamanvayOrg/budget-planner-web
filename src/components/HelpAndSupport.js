import Typography from "@mui/material/Typography";
import {style} from "./EmptyBudgetBox";
import CustomModal from "./CustomModal";
import {useTranslation} from "react-i18next";

const HelpAndSupport = () => {
    const {t} = useTranslation();

    return (
        <Typography id="helpSupport">
            <CustomModal
                isButton={false}
                buttonLabel={t("Help & support")}
                modalText={t("Please drop a mail at: citybudgets.support@cept.ac.in")}
                style={style}
            />
        </Typography>
    )
}
export default HelpAndSupport;