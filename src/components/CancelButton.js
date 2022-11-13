import Button from "@mui/material/Button";
import {t} from 'i18next';


const CancelButton = ({onClick, style = {}, label="Cancel"}) => {
	return (
		<Button onClick={onClick} color={"warning"} style={style}>{t(label)}</Button>
	)
}
export default CancelButton;
