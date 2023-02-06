import Typography from "@mui/material/Typography";
import {style} from "./EmptyBudgetBox";
import CustomModal from "./CustomModal";

const HelpAndSupport = () => {
    return (
        <Typography id="helpSupport">
            <CustomModal
                isButton={false}
                buttonLabel={"Help & support"}
                modalText={"Please drop a mail at: citybudgets.support@cept.ac.in"}
                style={style}
            />
        </Typography>
    )
}
export default HelpAndSupport;