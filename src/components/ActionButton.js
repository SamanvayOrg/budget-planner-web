import Button from "@mui/material/Button";


const ActionButton = ({onClick, label, id,keys}) => {
	return (
		<Button key={keys} id={id} onClick={onClick}>
			{label}
		</Button>

	);
};
export default ActionButton;