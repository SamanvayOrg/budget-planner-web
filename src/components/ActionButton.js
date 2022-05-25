import Button from "@mui/material/Button";


const ActionButton = ({onClick, label, id}) => {
	return (
		<Button id={id} onClick={onClick}>
			{label}
		</Button>

	);
};
export default ActionButton;